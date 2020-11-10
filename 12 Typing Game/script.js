const word = document.getElementById("word");
const text = document.getElementById("text");

const scoreEle = document.getElementById("score");
const timeEle = document.getElementById("time");
const endgameEle = document.getElementById("end-game__container");

const settingsBtn = document.getElementById("btn-settings");
const settings = document.getElementById("settings");

const settingsForm = document.getElementById("settings__form");
const difficultySelect = document.getElementById("settings__difficulty");

// list of words for game
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
  "already",
  "previously",
  "beforehand",
  "purposeful",
  "advanced",
  "furtherance",
  "improvement",
];

// init word
let randomWord;

// init score
let score = 0;

// init time
let time = 10;

// set difficulty to local storage value or medium
let difficulty = localStorage.getItem("difficulty") !== null ? localStorage.getItem("difficulty") : "medium";

// set difficulty select value
difficultySelect.value = difficulty;

// generate rabdom word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

addWordToDOM();

// focus on text start
text.focus();

// start count down, every call updateTime()
const timeInterval = setInterval(updateTime, 1000);

// update time
function updateTime() {
  time--;
  timeEle.innerText = `${time}s`;

  if (time === 0) {
    clearInterval(timeInterval);
    // end game
    gameOver();
  }
}

// game over and show wnd screen
function gameOver() {
  endgameEle.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
  `;

  endgameEle.style.display = "flex";
}

// get input data
text.addEventListener("input", (e) => {
  const insertText = e.target.value;

  if (insertText === randomWord) {
    // update score
    score++;
    scoreEle.innerText = score;

    // clear input value
    e.target.value = "";

    // add new random word to DOM
    addWordToDOM();

    // if word correct depend on difficulty to add time

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

// set button
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

// select difficulty
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
