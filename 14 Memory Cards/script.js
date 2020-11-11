// button
const btnClear = document.getElementById("clear");
const btnShow = document.getElementById("show");
const btnPrev = document.getElementById("prev");
const btnNext = document.getElementById("next");
const btnHide = document.getElementById("hide");
const btnAddCard = document.getElementById("add-card");

const questionEle = document.getElementById("question");
const answerEle = document.getElementById("answer");

const navEle = document.getElementById("nav");
const currentEle = document.getElementById("nav__current");

const cardsContainer = document.getElementById("cards-container");
const navCurrent = document.getElementById("nav__current");
const addContainer = document.getElementById("add-container");

// keep track of current card
let currentActiveCard = 0;

// store DIM cards
const cardsEles = [];

// store card data
const cardsData = getCardsData();
// const cardsData = [
//   {
//     question: "What must a variable begin with?",
//     answer: "A letter, $ or _",
//   },
//   {
//     question: "What is a variable?",
//     answer: "Container for a piece of data",
//   },
//   {
//     question: "Example of Case Sensitive Variable",
//     answer: "thisIsAVariable",
//   },
// ];

// get data from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

// add card to localStorage
function serCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

// check if prec and next button can click
btnPrev.disabled = cardsData.length > 1 ? false : true;
btnNext.disabled = cardsData.length > 1 ? false : true;

function checkNextAndPrevButton() {
  btnPrev.disabled = cardsData.length > 1 ? false : true;
  btnNext.disabled = cardsData.length > 1 ? false : true;

  btnNext.disabled = currentActiveCard >= cardsEles.length - 1 ? true : false;
  btnPrev.disabled = currentActiveCard <= 0 ? true : false;
}

function showNav() {
  cardsData.length <= 0 ? navEle.classList.add("hide") : navEle.classList.remove("hihe");
}

showNav();

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

// update next or preventDefault();
btnNext.addEventListener("click", () => {
  cardsEles[currentActiveCard].className = "card left";

  currentActiveCard++;

  checkNextAndPrevButton();

  if (currentActiveCard > cardsEles.length - 1) {
    currentActiveCard = cardsEles.length - 1;
  }

  cardsEles[currentActiveCard].className = "card active";

  // show current card
  updateCurrentText();
});

btnPrev.addEventListener("click", () => {
  cardsEles[currentActiveCard].className = "card right";

  currentActiveCard--;

  checkNextAndPrevButton();

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEles[currentActiveCard].className = "card active";

  // show current card
  updateCurrentText();
});

// show add container
btnShow.addEventListener("click", () => addContainer.classList.add("show"));

// hide add container
btnHide.addEventListener("click", () => addContainer.classList.remove("show"));

// add new card

//check if can click add button

function checkSubmitCardButton() {
  btnAddCard.disabled = questionEle.value.trim() && answerEle.value.trim() ? false : true;
}

checkSubmitCardButton();
questionEle.addEventListener("input", checkSubmitCardButton);
answerEle.addEventListener("input", checkSubmitCardButton);

btnAddCard.addEventListener("click", () => {
  const question = questionEle.value.trim();
  const answer = answerEle.value.trim();

  cardsData.push({ question, answer });
  createCard({ question, answer });

  questionEle.value = "";
  answerEle.value = "";

  addContainer.classList.remove("show");

  serCardsData(cardsData);
});

// clear all card
btnClear.disabled = cardsData.length === 0 ? true : false;

btnClear.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload();
});
