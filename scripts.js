
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let score = 0;

    let firstCardX;
    let firstCardY;
    let secondCardX;
    let secondCardY;

    let cards = document.querySelectorAll('.cardContainer');
    const matchedCardsArea1 = document.querySelector('.matchedCardArea1');
        
    const resetButton = document.getElementById("reset");
        
    let wonMessage = document.getElementById("wonMessage");

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;
        
        this.classList.add("flip");
        // console.log(this);
        
        // if its the first card, have another go
        if(!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            firstCardX  = firstCard.offsetTop;
            firstCardY  = firstCard.offsetLeft;
            // console.log({firstCardX, firstCardY});
        } else {
            hasFlippedCard = false;
            secondCard = this;
            secondCardX  = secondCard.offsetTop;
            secondCardY  = secondCard.offsetLeft;
        // check for a match
            checkMatch();
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
            let locationX = matchedCardsArea1.offsetTop;
            let locationY = matchedCardsArea1.offsetLeft;
            console.log({locationX, locationY});
            let firstCardmoveX = firstCardX - locationX;
            let firstCardmoveY = firstCardY - locationY;
            let secondCardmoveX = secondCardX - locationX;
            let secondCardmoveY = secondCardY - locationY;
            setTimeout(() => {



                firstCard.style.transform = `translate(-${firstCardmoveY}px, -${firstCardmoveX}px)` ;
                secondCard.style.transform = `translate(-${secondCardmoveY}px, -${secondCardmoveX}px)` ;
                // firstCard.style.transform = `translate(-100px, 50px)` ;
                // secondCard.style.transform = `translate(-100px, 50px)` ;
                console.log({firstCardmoveX, firstCardmoveY});




            }, 1000);



            // move cards to side section
                // define where are the side sections
                // how to esnure the card knows where the new location is
                // work out where in the side section the cards need to go relative to how many other pairs are there
                    // need to increment the where it moves
                    // need to know when enough space and go to next section
                // offset the cards slightly so there is a little bit of overlap

                // set a timeout for the move

                    //side one, get a little movement when is correct

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
        
        // function handleClick(e) {
        //     console.log(e);
        // }

            
    cards.forEach(card => card.addEventListener('click', flipCard));

    // document.addEventListener('click', handleClick);
        
    resetButton.addEventListener("click", newGame);
        