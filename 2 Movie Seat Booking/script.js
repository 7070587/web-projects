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

  // when refresh page, all selected data should show again
  // 1. copy selected seats into an array
  // 2. map through array
  // 3. return a new array indexes
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  // 4. savt to localStorage
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * tickitPrice;
}

// save selected movie index and price
function setMoviedata(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// movie click event
movieSelected.addEventListener("change", (e) => {
  tickitPrice = +e.target.value;
  // e.target.selectedIndex --> can get select option's index
  // e.target.value --> can get select option's value
  setMoviedata(e.target.selectedIndex, e.target.value);

  updatSelectedCount();
});

// seat click event
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("seat") && !e.target.classList.contains("seat__occupied")) {
    e.target.classList.toggle("seat__selected");

    updatSelectedCount();
  }
});
