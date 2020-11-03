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

const correctLetters = [];
const wrongLetters = [];

// show hidden word
function displayWord() {
  // array.includes(value): check this value weather in array or not
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

// show notification
function showNotification() {
  notification.classList.add("show");
  setTimeout(() => notification.classList.remove("show"), 2000);
}

// update wrong letters elememt
function updateWrongLettersElememt() {
  // show wrong letters
  wrongLettersEle.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;

  // drow svg - show people part
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  // check if lose, after lose game, show popup
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost. 😕";
    popupContainerEle.style.display = "flex";
  }
}

// keydown letter press
window.addEventListener("keydown", (e) => {
  //   console.log(" => ", e.key);
  const regex = /[a-z]/i;
  if (regex.test(e.key)) {
    const letter = e.key;
    // check is letter or letters
    if (letter.length === 1) {
      if (selectedWord.includes(letter)) {
        // push correct letter in correctLetters, if this letter is not in correctLetters
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);
          displayWord();
        } else {
          // this correct letter is already in correctLetters, then show this letter
          showNotification();
        }
      } else {
        // this not correct push to wrongLetters
        // push not correct letter in wrongLetters, if this letter is not in wrongLetters
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);
          updateWrongLettersElememt();
        } else {
          // this correct letter is already in correctLetters, then show this letter
          showNotification();
        }
      }
    }
  }
});

// play again game
playAgainBtn.addEventListener("click", () => {
  // empty arrays, use splice(0)
  correctLetters.splice(0);
  wrongLetters.splice(0);

  // update selectedWord
  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  // clear wrong letters
  updateWrongLettersElememt();

  // hide people figure part
  popupContainerEle.style.display = "none";
});
