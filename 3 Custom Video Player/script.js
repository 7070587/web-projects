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
  return true;
}

// set video tome to progress
function setVideoProgress() {
  return true;
}

// stop video
function stopVideo() {
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
