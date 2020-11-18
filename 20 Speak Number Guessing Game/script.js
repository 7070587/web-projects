const msgEle = document.getElementById("msg");
const randomNumber = getRandomNumber();

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// start recognition and game
recognition.start();

// capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;
}

recognition.addEventListener("result", onSpeak);
