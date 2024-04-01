const containerEl = document.querySelector(".container");
const seatsEl = document.querySelectorAll(".row .seat:not(.occupied)");
const countEl = document.getElementById("count");
const totalEl = document.getElementById("total");
const movieSelectEl = document.getElementById("movie");

let ticketPrice = +movieSelectEl.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

//  Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) =>
    [...seatsEl].indexOf(seat)
  );

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  countEl.innerText = selectedSeatsCount;
  totalEl.innerText = selectedSeatsCount * ticketPrice;
}

// Movie select event
movieSelectEl.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
containerEl.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
  }

  updateSelectedCount();
});
