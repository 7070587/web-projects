const year = document.getElementById("year");
const countdown = document.getElementById("countdown");

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const currentYear = new Date().getFullYear();
const newYearTime = new Date(`Jan 01 ${currentYear + 1} 00:00:00`);

function updateCountdown() {
  const currentTime = new Date();
  const diff = newYearTime - currentTime;

  const day = Math.floor(diff / 1000 / 60 / 60 / 24);
  const hour = Math.floor(diff / 1000 / 60 / 60) % 24;
  const minute = Math.floor(diff / 1000 / 60) % 60;
  const second = Math.floor(diff / 1000) % 60;

  days.innerHTML = day;
  hours.innerHTML = hour.toString().padStart(2, "0");
  minutes.innerHTML = minute.toString().padStart(2, "0");
  seconds.innerHTML = second.toString().padStart(2, "0");
}

setInterval(updateCountdown, 1000);
