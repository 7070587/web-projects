const word = document.getElementById("word");
const text = document.getElementById("text");

const scoreEle = document.getElementById("score");
const timeEle = document.getElementById("time");
const endgameEle = document.getElementById("end-game__container");

const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");

const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

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

// get input data
text.addEventListener("input", (e) => {
  const insertText = e.target.value;

  if (insertText === randomWord) {
    // update score
    +scoreEle.innerText++;

    // clear input value
    e.target.value = "";

    // add new random word to DOM
    addWordToDOM();
  }
});
