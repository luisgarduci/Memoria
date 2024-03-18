const game_time = document.getElementById("game-time");
        const start_game = document.getElementById("start-game");
        const btn_start = document.getElementById("btn-start");
        const cards = document.querySelectorAll(".cards");
        const cardsFlip = document.querySelectorAll(".cardsFlip");
        const frontcard = document.querySelectorAll(".front");
        const img = document.querySelectorAll(".front");
        const backcard = document.querySelectorAll(".back");
        const containers = document.querySelectorAll(".containers");
        const score = document.querySelector("#score");
        const result = document.querySelector("#result");
        const restart = document.querySelector("#restart");
        let url = "https://api.dicebear.com/7.x/avataaars/svg?seed=";
        let arraycards = [];
        let arrayCountdownCards = [];
        let arrayTurnedCards = [];
        let arrayCardsOutofPlay = [];
        let hours = 0;
        let minutes = 0;
        let seconds = 0;
        let ready = false;

        cards.forEach(function(card, index){
            card.addEventListener("click" , (event) => {
            if (arrayCountdownCards.length < 2 && ready === true) {
            card.style.transform = "rotateY(180deg)";
            arrayCountdownCards.push(index);
            arrayTurnedCards.push(img[index].src);
            console.log(arrayCardsOutofPlay.length)
                if (arrayTurnedCards[0] === arrayTurnedCards[1] && arrayCountdownCards[0] !== arrayCountdownCards[1]) {
                cards[arrayCountdownCards[0]].style.visibility = "hidden";
                cards[arrayCountdownCards[1]].style.visibility = "hidden";
                arrayCardsOutofPlay.push(arrayTurnedCards[0]);
                arrayCardsOutofPlay.push(arrayTurnedCards[1]);
            }
            setTimeout(() => {
            if (arrayCountdownCards.length === 2 ) {
            for(let i = 0; i < cards.length; i++) {
               cards[i].style.transform = "rotateY(0deg)"
            }
            arrayCountdownCards = [];
            arrayTurnedCards = [];
        }
            
            }, 2000)
            
            }
            })
 
        })

        btn_start.addEventListener("click", () => {
        start_game.style.display = "none";
        ready = true;
        for (let i = 0; i < containers.length; i++) {
            containers[i].style.filter = "blur(0px)";
        }
    
        let timer = setInterval (() => {
        let time = "0" + hours + ":0" + minutes + ":0" + seconds;
        seconds++;

        if (seconds >= 10) {
            time = "0" + hours + ":0" + minutes + ":" + seconds;
        }

        if (minutes >= 10) {
            time = "0" + hours + ":" + minutes + ":0" + seconds;
        }

        if (seconds >= 10 && minutes >= 10) {
            time = "0" + hours + ":" + minutes + ":" + seconds;
        }


        if (seconds >= 59) {
            seconds = 0;
            minutes++;
        }

        if (minutes >= 59) {
            minutes = 0;
            hours++;
        }
        

        game_time.innerHTML = time;

       
        if (arrayCardsOutofPlay.length === 16) {
            
            //alert(`Fim de jogo, Time: ${time}`);
            //time;
            result.style.display = "block";
            score.innerHTML = `Seu tempo foi de: ${time}`;
            start_game.style.display = "none";
            game_time.innerHTML = "";
            clearInterval(timer);
        }}, 1000)
        })
            
        for (let i = 0; i < backcard.length; i++) {
            backcard[i].src = "https://i.pinimg.com/564x/5c/b0/fe/5cb0fe4743f31bd3b18ef167a9b0254a.jpg"
        }

        for (let i = 0; i < 8; i++) {
        let random = Math.floor(Math.random () * 1000);
        arraycards[i] = url + random;
        }
        
        let j = 0
        for (let i = 9; i <= 16; i++) {
             arraycards[i] = arraycards[j];
             j++;
        }

        function MisturarValores() {
            return Math.random () - 0.5;
        }

        arraycards.sort(MisturarValores);
        
        //Adicionando as imagens aos cards
        for (let i = 0; i < frontcard.length; i++) {
            frontcard[i].src = arraycards[i];
        }
        
        //restartando o jogo
        restart.addEventListener("click", () => window.location.reload());
        