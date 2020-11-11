// button
const btnClear = document.getElementById("clear");
const btnShow = document.getElementById("show");
const btnPrev = document.getElementById("prev");
const btnNext = document.getElementById("next");
const btnHide = document.getElementById("hide");
const btnAddCard = document.getElementById("add-card");

const questionEle = document.getElementById("question");
const answerEle = document.getElementById("answer");

const currentEle = document.getElementById("nav__current");

const cardsContainer = document.getElementById("cards-container");
const navCurrent = document.getElementById("nav__current");
const addContainer = document.getElementById("add-container");

// keep track of current card
let currentActiveCard = 0;

// store DIM cards
const cardsEles = [];

// store card data
const cardsData = [
  {
    question: "What must a variable begin with?",
    answer: "A letter, $ or _",
  },
  {
    question: "What is a variable?",
    answer: "Container for a piece of data",
  },
  {
    question: "Example of Case Sensitive Variable",
    answer: "thisIsAVariable",
  },
];

// create all cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

// create single card in DOM
function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  if (index === 0) {
    card.classList.add("active");
  }

  card.innerHTML = `
    <div class="inner-card">
        <div class="inner-card-front">
        <p>${data.question}</p>
        </div>

        <div class="inner-card-back">
        <p>${data.answer}</p>
        </div>
    </div>
    `;

  card.addEventListener("click", () => card.classList.toggle("show-answer"));

  // add to DOM cards
  cardsEles.push(card);

  cardsContainer.appendChild(card);

  // show current card
  updateCurrentText();
}

// show number of card
function updateCurrentText() {
  currentEle.innerText = `${currentActiveCard + 1}/${cardsEles.length}`;
}

createCards();
