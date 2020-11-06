const musicContainer = document.getElementById("music__container");

const title = document.getElementById("title");
const progressContainer = document.getElementById("progress__container");
const progress = document.getElementById("progress");
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");

const btnPrev = document.getElementById("btn-prev");
const btnPlay = document.getElementById("btn-play");
const btnNext = document.getElementById("btn-next");

// song title
const songs = ["hey", "summer", "ukulele"];

// keep track of song
let songIndex = 2;

// init load song details into DOM
loadSong(songs[songIndex]);

// update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

//  play  song
function playSong() {
  musicContainer.classList.add("play");
  btnPlay.querySelector("i.fas").classList.remove("fa-play");
  btnPlay.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

//pause  song
function pauseSong() {
  musicContainer.classList.remove("play");
  btnPlay.querySelector("i.fas").classList.remove("fa-pause");
  btnPlay.querySelector("i.fas").classList.add("fa-play");

  audio.pause();
}

// play song;
btnPlay.addEventListener("click", () => {
  // check music is play or not
  const isPlaying = musicContainer.classList.contains("play");

  isPlaying ? pauseSong() : playSong();
});
