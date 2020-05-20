
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard, locationX, locationY;
    let score = 0;
    let inc = -145;

    let firstCardX;
    let firstCardY;
    let secondCardX;
    let secondCardY;

    let firstCardmoveX;
    let firstCardmoveY;
    let secondCardmoveX;
    let secondCardmoveY;


    let cards = document.querySelectorAll('.cardContainer');
    const matchedCardArea1 = document.querySelector('.matchedCardArea1');
    const matchedCardArea2 = document.querySelector('.matchedCardArea2');

    const cardArea1X = matchedCardArea1.offsetLeft;
    const cardArea1Y = matchedCardArea1.offsetTop ;

    const cardArea2X = matchedCardArea2.offsetLeft;
    const cardArea2Y = matchedCardArea2.offsetTop ;

    const resetButton = document.getElementById("reset");
        
    let wonMessage = document.getElementById("wonMessage");

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;
        
        this.classList.add("flip");

        if(!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            console.log(this);
            firstCardX = firstCard.offsetLeft;
            firstCardY = firstCard.offsetTop;
        } else {
            hasFlippedCard = false;
            secondCard = this;
            secondCardX = secondCard.offsetLeft;
            secondCardY = secondCard.offsetTop;
            checkMatch();
        }
     
        function checkMatch() {
            if(firstCard.dataset.name === secondCard.dataset.name){
                matchedCards();
            } else {
                unflipCards();
            }
        }

        function matchedCards() {
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
            score++;
            inc = inc + 145;
            console.log(score);

            if (score < 5) {
                firstCardmoveX = cardArea1X - firstCardX;
                firstCardmoveY = (cardArea1Y + inc) - firstCardY;
                secondCardmoveX = cardArea1X - secondCardX;
                secondCardmoveY = (cardArea1Y + inc) - secondCardY; 
            } else if (score === 5 ) {
                inc = 0;
                firstCardmoveX = cardArea2X - firstCardX;
                firstCardmoveY = (cardArea2Y + inc) - firstCardY;
                secondCardmoveX = cardArea2X - secondCardX;
                secondCardmoveY = (cardArea2Y + inc) - secondCardY; 
            } else {
                firstCardmoveX = cardArea2X - firstCardX;
                firstCardmoveY = (cardArea2Y + inc) - firstCardY;
                secondCardmoveX = cardArea2X - secondCardX;
                secondCardmoveY = (cardArea2Y + inc) - secondCardY; 
            }

            setTimeout(() => {
                    firstCard.style.transform = 
                        `translate(${firstCardmoveX}px, ${firstCardmoveY}px) rotateY(360deg)` ;
                    secondCard.style.transform = 
                        `translate(${secondCardmoveX}px, ${secondCardmoveY}px) rotateY(360deg)`;
            }, 1000);
        }

        function unflipCards() {
            lockBoard = true;
            setTimeout(() => {
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");
            newTurn();
            }, 1600);
         }
        
        if(score === 8) {
            setTimeout(() => {
            wonMessage.innerHTML = 'YOU WON!!!';
            }, 1500);
        }
    }
        
        function newTurn() {
            hasFlippedCard = false;
            lockBoard = false;
            firstCard = null;
            secondCard = null;
        }
          
        function newGame() {
            wonMessage.innerHTML = '';
            cards.forEach(card => {
                card.removeAttribute('style');
            });
            cards.forEach(card => {
                let mixedCards = Math.floor(Math.random() * 12);
                card.style.order = mixedCards;
                });
            cards.forEach(x => {
               x.classList.remove("flip"); 
            });
            hasFlippedCard = false;
            lockBoard = false;
            firstCard = null;
            secondCard = null;
            inc = -145;
            score = 0;
            cards.forEach(card => card.addEventListener('click', flipCard));
        }      

  
    cards.forEach(card => card.addEventListener('click', flipCard));
        
    resetButton.addEventListener("click", newGame);
        