
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let score = 0;
        
    let cards = document.querySelectorAll('.cardContainer');
        
    const resetButton = document.getElementById("reset");
        
    let wonMessage = document.getElementById("wonMessage");

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;
        
        this.classList.add("flip")
        
        // if its the first card, have another go
        if(!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
        } else {
            hasFlippedCard = false;
            secondCard = this;
        // check for a match
            checkMatch()
        }
         //if match then       
        function checkMatch() {
            if(firstCard.dataset.name === secondCard.dataset.name){
            // leave the cards turned over
                matchedCards()
//             update the score
                score++
            } else {
        // if no match turn back over
                unflipCards();
            }

        }
        
        function matchedCards() {
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
            
        }
        
        function unflipCards() {
            lockBoard = true;
            
            setTimeout(() => {
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");
                
            newTurn()
            }, 1600);
         }
        
        if(score === 8){
            wonMessage.innerHTML = `YOU WON!!!`;
            }
        
    };
        
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
            wonMessage.innerHTML = ``;
        };        
            
    cards.forEach(card => card.addEventListener('click', flipCard));
        
    resetButton.addEventListener("click", newGame);
        