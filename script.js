// Get the modal
var modal = document.getElementById("howToPlayModal");

// Get the button that opens the modal
var btn = document.getElementById("howToPlayBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


const images = [
  {src: 'images/image1.jpg'},
  {src: 'images/image2.jpg'},
  {src: 'images/image3.jpg'},
  {src: 'images/image4.jpg'},
  {src: 'images/image5.jpg'},
  {src: 'images/image6.jpg'},
  {src: 'images/image7.jpg'},
  {src: 'images/image8.jpg'},
  {src: 'images/image9.jpg'},
];

let currentImageIndex = 0;
let chances = 10;
let correctGuesses = 0;
let showUsed = false;

// DOM references
const chancesDisplay = document.getElementById('chances');
const correctDisplay = document.getElementById('correct');
const imageElement = document.getElementById('gameImage');
const optionsContainer = document.getElementById('options');
const messageDisplay = document.getElementById('message');
const showBtn = document.getElementById('showBtn');
const overlay = document.getElementById('overlay');

// Load new round
const loadNewRound = () => {
  // pick random hidden image
  currentImageIndex = Math.floor(Math.random() * images.length);

  imageElement.src = images[currentImageIndex].src; 
  overlay.style.display = "flex";
  messageDisplay.textContent = "";

  // clear image options
  optionsContainer.innerHTML = "";
  images.forEach((imgObj, index) => {
    const option = document.createElement("img");
    option.src = imgObj.src; 
    option.style.width = "120px"; 
    option.style.margin = "0px";
    option.addEventListener('click', () => handleGuess(index));

    optionsContainer.appendChild(option);
  });
}

// Handle guess
const handleGuess = (index) => {
  // Reveal the image
  overlay.style.display = "none";

  if(index === currentImageIndex){
    correctGuesses++;
    messageDisplay.textContent = "Correct!";
  }else{
    chances--;
    messageDisplay.textContent = "Wrong! That was the correct image.";
  }

  updateStats();

  // check game over condition
  if(correctGuesses >= 3){
    messageDisplay.textContent = "You win! Congratulations!";
    gameOver();
    return;
  }

  if(chances <= 0){
    messageDisplay.textContent = "Game Over! You Lose!";
    gameOver();
    return;
  }

  // Load next round after short delay
  setTimeout(loadNewRound, 1500);
}

// End game by disabling options
const gameOver = () => {
  optionsContainer.innerHTML = "";
}

// Update stats
const updateStats = () => {
  chancesDisplay.textContent = chances;
  correctDisplay.textContent = correctGuesses;
}

// show button logic
showBtn.addEventListener('click', () => {
  if(!showUsed){
    // Reveal the image
    overlay.style.display = "none";
    showUsed = true;
    showBtn.disabled = true;
  }
});

// start game
loadNewRound(); 
updateStats();
