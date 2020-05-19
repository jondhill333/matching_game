
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard, firstCardLocation, secondCardLocation;
    let score = 0;

    let firstCardX;
    let firstCardY;
    let secondCardX;
    let secondCardY;
    let plusOrMinus1;
    let plusOrMinus2;
    let plusOrMinus3;
    let plusOrMinus4;

    let cards = document.querySelectorAll('.cardContainer');
    const matchedCardsArea1 = document.querySelector('.matchedCardArea1');
        
    const resetButton = document.getElementById("reset");
        
    let wonMessage = document.getElementById("wonMessage");

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;
        
        this.classList.add("flip");
        
        // if its the first card, have another go
        if(!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            firstCardX = firstCard.offsetLeft;
            firstCardY = firstCard.offsetTop;

        } else {
            hasFlippedCard = false;
            secondCard = this;
            secondCardX = secondCard.offsetLeft;
            secondCardY = secondCard.offsetTop;

        // check for a match
            checkMatch();
        }
         //if match then       
        function checkMatch() {
            if(firstCard.dataset.name === secondCard.dataset.name){
            // leave the cards turned over
                matchedCards();
//             update the score
                score++;
            } else {
        // if no match turn back over
                unflipCards();
            }

        }
        
        function matchedCards() {
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);

            let locationX = matchedCardsArea1.offsetLeft;
            let locationY = matchedCardsArea1.offsetTop;

            let firstCardmoveX = firstCardX - locationX;
            let firstCardmoveY = firstCardY - locationY ;

            let secondCardmoveX = secondCardX - locationX;
            let secondCardmoveY = secondCardY - locationY;


            if(firstCardmoveX <= 0) {
                plusOrMinus1 = '';
            } else {
                plusOrMinus1 = '-';
            }

            if(firstCardmoveY <= 0) {
                plusOrMinus2 = '';
            } else {
                plusOrMinus2 = '-';
            }

            if(secondCardmoveX <= 0) {
                plusOrMinus3 = '';
            } else {
                plusOrMinus3 = '-';
            }  
            
            if(secondCardmoveY <= 0) {
                plusOrMinus4 = '';
            } else {
                plusOrMinus4 = '-';
            }

            setTimeout(() => {

                firstCard.style.transform = `translate(${plusOrMinus1}${firstCardmoveX.toString()}px, ${plusOrMinus2}${firstCardmoveY.toString()}px)` ;
                secondCard.style.transform = `translate(${plusOrMinus3}${secondCardmoveX.toString()}px, ${plusOrMinus4}${secondCardmoveY.toString()}px)` ;

                console.log({ plusOrMinus1, firstCardmoveX, plusOrMinus2, firstCardmoveY, plusOrMinus3, secondCardmoveX, plusOrMinus4, secondCardmoveY })
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
        
        if(score === 8){
            wonMessage.innerHTML = 'YOU WON!!!';
            }
        
    }
        
        function newTurn() {
            hasFlippedCard = false;
            lockBoard = false;
            firstCard = null;
            secondCard = null;
        }
          
        function newGame() {
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
        }      

            
    cards.forEach(card => card.addEventListener('click', flipCard));
        
    resetButton.addEventListener("click", newGame);
        