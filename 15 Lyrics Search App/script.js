const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");
const btnSearch = document.getElementById("btn-search");

const apiURL = "https://api.lyrics.ovh";

// check search search
search.addEventListener("input", checkSearchBtn);

function checkSearchBtn() {
  btnSearch.disabled = !search.value.trim();
}

checkSearchBtn();

// search by song or artist
async function searchSongs(searchValue) {
  const res = await fetch(`${apiURL}/suggest/${searchValue}`);
  const data = await res.json();

  showData(data);
}

// show song and artist in DOM
function showData(data) {}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchValue = search.value.trim();
  searchSongs(searchValue);
});
