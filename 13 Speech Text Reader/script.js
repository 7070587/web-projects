const main = document.querySelector("main");

const textBox = document.getElementById("text__box");
const selectVoices = document.getElementById("text__box-voices");
const textarea = document.getElementById("text__box-textarea");

const btnToggle = document.getElementById("btn-toggle");
const btnRead = document.getElementById("btn-read");
const btnClose = document.getElementById("text__box-close");

// init box image data
const data = [
  {
    image: "./images/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "./images/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./images/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./images/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./images/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./images/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./images/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./images/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./images/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./images/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./images/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./images/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];

data.forEach(createBox);

// init speech synth
const message = new SpeechSynthesisUtterance();

//store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    selectVoices.appendChild(option);
  });
}
getVoices();

// create speech box
function createBox(item) {
  const box = document.createElement("div");
  const { image, text } = item;
  box.classList.add("box");
  box.innerHTML = `
    <img src="${image}" alt="${text}" class="box__image"/>
    <p class="box__info">${text}</p>
  `;

  box.addEventListener("click", () => {
    setTextMessage(text);
    speakMessage();

    // add active class
    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 800);
  });

  main.appendChild(box);
}

// set text
function setTextMessage(text) {
  message.text = text;
}

// speak message
function speakMessage() {
  speechSynthesis.speak(message);
}

// set voice
function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

// voice change
speechSynthesis.addEventListener("voiceschanged", getVoices);

// toggle text box
btnToggle.addEventListener("click", () => textBox.classList.toggle("show"));

// close button
btnClose.addEventListener("click", () => textBox.classList.remove("show"));

// change voice
selectVoices.addEventListener("change", setVoice);

// read texx button
btnRead.addEventListener("click", () => {
  setTextMessage(textarea.value);
  speakMessage();
});
