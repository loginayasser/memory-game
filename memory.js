var images = [
    'https://res.cloudinary.com/beumsk/image/upload/v1547980981/memory/starwars/anakin%20skywalker.jpg',
    'https://res.cloudinary.com/beumsk/image/upload/v1547981022/memory/starwars/Obi%20wann.jpg',
    'https://res.cloudinary.com/beumsk/image/upload/v1547981054/memory/starwars/Han%20solo.jpg',
    'https://res.cloudinary.com/beumsk/image/upload/v1547981074/memory/starwars/chewbacca.jpg',
    'https://res.cloudinary.com/beumsk/image/upload/v1547981141/memory/starwars/dark%20vador.jpg',
    'https://res.cloudinary.com/beumsk/image/upload/v1547981022/memory/starwars/Obi%20wann.jpg',
    'https://res.cloudinary.com/beumsk/image/upload/v1547981095/memory/starwars/yoda.jpg',
    'https://res.cloudinary.com/beumsk/image/upload/v1547981117/memory/starwars/dark%20sidious.jpg'
  ]


var i = 0;
var score = 0;
var timer = 0;
var firstCard, secondCard;
var canClick=true;
var secondsElapsed = 0;
var timerInterval;
var imageMatched =  0;
var cards = document.querySelectorAll('.card')

// place the images in the cards div
function setCards(){
    cards.forEach((card)=>{
        card.querySelector('img').src = images[i]
        card.querySelector('img').classList.add('hidden')
        i++
        if(i==images.length){
            i=0;
            shuffle();
        }
        
    })
}

// Shuffle the images array
function shuffle(){
    images.sort(() => Math.random() *(10 - (-10)) + (-10));
    }

   
    function startTimer() {
        timerInterval = setInterval(() => {
          secondsElapsed++;
          // Display time somewhere on the page (e.g., in a separate element)
          document.getElementById('timer').textContent = `Time : ${secondsElapsed} seconds`;
        }, 1000); // Update time every second
      }
// set logic for matching cards
function setLogic(){
    cards.forEach((card)=>{
        card.addEventListener("click",(event)=>{
            if(canClick && card.querySelector('img').classList.contains('hidden')){
                if (!firstCard) {
                    firstCard = card;
                    firstCard.querySelector('img').classList.remove('hidden')
            }
            else {
                secondCard = card;
                secondCard.querySelector('img').classList.remove('hidden')
                canClick = false;
                checkMatch()
            }
            }
        })
            
    })
}

// check if the two cards match
function checkMatch(){
    if (firstCard.querySelector('img').src == secondCard.querySelector('img').src) {
        score += 8;
        firstCard = null;
        secondCard = null;
        canClick = true;
        imageMatched++;
        if (imageMatched == images.length) {
            clearInterval(timerInterval);
            document.querySelector(".game-container").classList.add("hidden");
            document.querySelector(".result-card").classList.remove("hidden");
            document.getElementById("result").textContent = "You won " + score + " points in " + secondsElapsed + " seconds"; ;  
        }
    } else {
        setTimeout(() => {
            firstCard.querySelector('img').classList.add('hidden')
            secondCard.querySelector('img').classList.add('hidden')
            firstCard = null;
            secondCard = null;
            canClick = true;
            // decrease score only if score > 0
            if (score > 0){
                score -= 2
                document.getElementById('score').textContent = "Score : " + score;

            }
        }, 500);
    }
    document.getElementById('score').textContent = "Score : " + score;
}

// restart game and reset all variables
function restartGame(){
    document.getElementById('restart').addEventListener('click',()=>{
                score = 0;
        timer = 0;
        firstCard, secondCard;
        canClick=true;
        secondsElapsed = 0;
        imageMatched =  0;
        document.querySelector(".result-card").classList.add("hidden");
        document.querySelector(".game-container").classList.remove("hidden");
        document.getElementById('score').textContent = "Score : " + score;
        document.getElementById('timer').textContent = "Time : " + secondsElapsed + " seconds";


        setGame()
    })

}

// set the game
function setGame(){
    shuffle()
    setCards()
    setLogic()
    startTimer()
    restartGame()
}
setGame()

