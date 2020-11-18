const msgEle = document.getElementById("msg");
const randomNumber = getRandomNumber();

console.log("Number:", randomNumber);

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

  writeMessage(msg);
  checkNumber(msg);
}

// write user speak
function writeMessage(msg) {
  msgEle.innerHTML = `
    <div>You said:</div>
    <span class="box">${msg}</span>
    `;
}

// check msg against number
function checkNumber(msg) {
  const num = +msg;

  // check if vaild number
  if (Number.isNaN(num)) {
    msgEle.innerHTML += "<div>That is not a valid number</div>";
    return;
  }

  // check number in range
  if (num > 100 || num < 1) {
    msgEle.innerHTML += `<div>Number must between 1-100</div>`;
    return false;
  }

  // check number
  if (num === randomNumber) {
    document.body.innerHTML = `
        <h2>Congrats! You have guessed the number! <br><br>
        It was ${num}</h2>
        <button class="play-again" id="play-again">Play Again</button>
    `;
  } else if (num > randomNumber) {
    msgEle.innerHTML += "<div>GO LOWER</div>";
  } else {
    msgEle.innerHTML += "<div>GO HIGHER</div>";
  }
}

recognition.addEventListener("result", onSpeak);

// end sr service
recognition.addEventListener("end", () => recognition.start());

// play again
document.body.addEventListener("click", (e) => {
  if (e.target.id === "play-again") {
    window.location.reload();
  }
});
