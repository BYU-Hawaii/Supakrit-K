const words = ["CAT", "DOG", "FUN", "TOY", "SUN"]; // List of words (change as needed)
let answer, attemptsLeft;
let rows = document.querySelectorAll(".row");
let guessInput = document.getElementById("guess-input");
let submitButton = document.getElementById("submit-guess");
let attemptsLeftDisplay = document.getElementById("attempts-left");
let gameContainer = document.getElementById("game-container");

const startGame = () => {
  answer = words[Math.floor(Math.random() * words.length)];
  attemptsLeft = 5;
  attemptsLeftDisplay.textContent = `Attempts Left: ${attemptsLeft}`;
  guessInput.value = "";
  rows.forEach(row => row.innerHTML = "");
  gameContainer.style.display = "block";
};

const checkGuess = (guess) => {
  let feedback = new Array(4).fill("");
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answer[i]) {
      feedback[i] = "green";
      rows[attemptsLeft - 1].children[i].textContent = guess[i];
    } else if (answer.includes(guess[i])) {
      feedback.push(guess[i]); // Track used letters not in the right spot
    }
  }

  // Check if any letters used not in the word
  const usedLetters = new Set(feedback);
  usedLetters.forEach(letter => {
    if (!answer.includes(letter) && !feedback.includes("green" + letter)) {
      feedback.push("wrong-" + letter);
    }
  });

  // Update remaining attempts and display feedback
  attemptsLeft--;
  attemptsLeftDisplay.textContent = `Attempts Left: ${attemptsLeft}`;
  rows[attemptsLeft - 1].classList.add(...feedback);

  // Check win or lose
  if (guess === answer) {
    submitButton.disabled = true;
    alert("Congratulations! You guessed the word!");
    if (confirm("Play again?")) {
      startGame();
    }
  } else if (attemptsLeft === 0) {
    submitButton.disabled = true;
    alert(`Oops! The word was ${answer}`);
    if (confirm("Play again?")) {
      startGame();
    }
  }
};

// This part was missing:
submitButton.addEventListener("click", () => {
  const guess = guessInput.value.toUpperCase();
  // Check if the guess is 4 characters long
  if (guess.length !== 4) {
    alert("Please enter a 4-letter word!");
    return; // Exit the function if guess is not valid
  }
  checkGuess(guess);
});

// Start the game on button click
document.getElementById("start-button").addEventListener("click", startGame);
