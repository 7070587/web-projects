const wrongLettersEle = document.getElementById("wrong-letters");
const wordEle = document.getElementById("word");
const popupContainerEle = document.getElementById("popup-container");
const playAgainBtn = document.getElementById("play-btn");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

// can change any word
const words = ["application", "programming", "interface", "wizard", "procrss", "morning", "juice", "solition"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = ["j", "u", "i", "c", "e"];
const wrongLetters = [];

// show hidden word
function displayWord() {
  wordEle.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
          <span class="word-letter">
            ${correctLetters.includes(letter) ? letter : ""}
          </span>
        `
      )
      .join("")}
  `;

  // word display column to row
  const innerWord = wordEle.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won! 😃";
    popupContainerEle.style.display = "flex";
  }
}

displayWord();
