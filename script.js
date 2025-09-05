/* ===========================
   HOW TO PLAY MODAL LOGIC
=========================== */

// Get the modal


// Get the button that opens the modal


// Get the <span> element that closes the modal


// Open modal when "How to Play" button is clicked


// Close modal when (×) is clicked


// Close modal if user clicks outside the modal content



/* ===========================
   GAME LOGIC
=========================== */

// List of available images
const images = [
  { src: 'images/image1.jpg' },
  { src: 'images/image2.jpg' },
  { src: 'images/image3.jpg' },
  { src: 'images/image4.jpg' },
  { src: 'images/image5.jpg' },
  { src: 'images/image6.jpg' },
  { src: 'images/image7.jpg' },
  { src: 'images/image8.jpg' },
  { src: 'images/image9.jpg' },
];

// Game state variables
let currentImageIndex = 0;   // Which image is hidden under the black box
let chances = 10;            // Remaining guesses
let correctGuesses = 0;      // Number of correct guesses
let showUsed = false;        // Track if "show" button has been used

// DOM element references
const chancesDisplay = document.getElementById('chances');
const correctDisplay = document.getElementById('correct');
const imageElement = document.getElementById('gameImage');
const optionsContainer = document.getElementById('options');
const messageDisplay = document.getElementById('message');
const showBtn = document.getElementById('showBtn');
const overlay = document.getElementById('overlay');


/* ===========================
   GAME FUNCTIONS
=========================== */

/**
 * Load a new round
 * - Picks a random hidden image
 * - Displays it under the black box
 * - Renders clickable options for all images
 */
const loadNewRound = () => {
  // Random hidden image
  currentImageIndex = Math.floor(Math.random() * images.length);

  // Show it under the black box (but keep overlay on)
  imageElement.src = images[currentImageIndex].src;
  overlay.style.display = "flex";
  messageDisplay.textContent = "";

  // Clear old options
  optionsContainer.innerHTML = "";

  // Create clickable image options
  images.forEach((imgObj, index) => {
    const option = document.createElement("img");
    option.src = imgObj.src;
    option.style.width = "120px";
    option.style.margin = "0px";

    // Add click event
    option.addEventListener('click', () => handleGuess(index));

    optionsContainer.appendChild(option);
  });
};

/**
 * Handle player’s guess
 * - Reveal hidden image
 * - Check if guess is correct
 * - Update game state
 * - End game if win/lose conditions met
 */
const handleGuess = (index) => {
  // Reveal image
  overlay.style.display = "none";

  // Correct guess
  if (index === currentImageIndex) {
    correctGuesses++;
    messageDisplay.textContent = "Correct!";
  } 
  // Wrong guess
  else {
    chances--;
    messageDisplay.textContent = "Wrong!";
  }

  updateStates();

  // Win condition
  if (correctGuesses >= 3) {
    messageDisplay.textContent = "You win!  Congratulations!";
    gameOver();
    return;
  }

  // Lose condition
  if (chances <= 0) {
    messageDisplay.textContent = "Game Over! You Lose!";
    gameOver();
    return;
  }

  // Load next round after 1.5s delay
  setTimeout(loadNewRound, 1500);
};

/**
 * End game
 * - Clears the options so no further guesses can be made
 */
const gameOver = () => {
  optionsContainer.innerHTML = "";
};

/**
 * Update UI states
 * - Updates chances and correct guesses display
 */
const updateStates = () => {
  chancesDisplay.textContent = chances;
  correctDisplay.textContent = correctGuesses;
};


/* ===========================
   SHOW BUTTON LOGIC
=========================== */

// Allow player to uncover hidden image once per game
showBtn.addEventListener('click', () => {
  if (!showUsed) {
    overlay.style.display = "none"; // Reveal hidden image
    showUsed = true;
    showBtn.disabled = true;        // Disable button after one use
  }
});


/* ===========================
   START GAME
=========================== */
loadNewRound();
updateStates();
