const container = document.querySelector(".container");
// select seat not occupied
const seats = document.querySelectorAll(".row .seat:not(.seat__occupied)");

const count = document.getElementById("count");
const total = document.getElementById("total");

const movieSelected = document.getElementById("movie");
let tickitPrice = +movieSelected.value;

// updtae total and count
function updatSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.seat__selected");

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * tickitPrice;
}

// movie click event
movieSelected.addEventListener("change", (e) => {
  tickitPrice = +e.target.value;
  updatSelectedCount();
});

// seat click event
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("seat") && !e.target.classList.contains("seat__occupied")) {
    e.target.classList.toggle("seat__selected");

    updatSelectedCount();
  }
});
