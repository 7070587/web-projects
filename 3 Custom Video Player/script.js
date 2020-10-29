const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

// play and pause video
function toggleVideoStatus() {
  video.paused ? video.play() : video.pause();
}

// update play icon
function updatePlayIcon() {
  const playIcon = `<i class="fa fa-play fa-2x"></i>`;
  const pauseIcon = `<i class="fa fa-pause fa-2x"></i>`;
  play.innerHTML = video.paused ? playIcon : pauseIcon;
}

// update progress and timestamp
function updateProgress() {
  // progress
  // video length: video.duration
  // video current time: video.currentTime
  // input range thumb can move with play time
  progress.value = (video.currentTime / video.duration) * 100;

  // timestamp
  // 1.get minutes
  let minutes = Math.floor(video.currentTime / 60);
  minutes = minutes < 10 ? minutes.toString().padStart(2, 0) : minutes;

  // 2.get seconds
  let seconds = Math.floor(video.currentTime % 60);
  seconds = seconds < 10 ? seconds.toString().padStart(2, 0) : seconds;

  // put into
  timestamp.innerHTML = `${minutes}:${seconds}`;
}

// set video tome to progress
function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

// stop video
function stopVideo() {
  // video current time
  video.currentTime = 0;
  video.pause();
}

video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);
stop.addEventListener("click", stopVideo);

progress.addEventListener("change", setVideoProgress);
