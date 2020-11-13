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

  if (data) showData(data);
}

// show song and artist in DOM
function showData(dataValue) {
  result.innerHTML = `
        <ul class='songs'>
            ${dataValue.data
              .map(
                (song) =>
                  `
                  <li>
                    <span><strong>${song.artist.name}</strong> - ${song.title}</span>
                    <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
                  </li>
                `
              )
              .join("")}
        </ul>
    `;

  // check if have prev or next
  if (dataValue.prev || dataValue.next) {
    more.innerHTML = `
      ${dataValue.prev ? `<button class='btn' onclick="getMoreSongs('${dataValue.prev}')">Prev</button>` : ""}
      ${dataValue.next ? `<button class='btn' onclick="getMoreSongs('${dataValue.next}')">Next</button>` : ""}
        `;
  } else {
    more.innerHTML = "";
  }
}

// get next or prev songs
async function getMoreSongs(url) {
  // resolve cross problem https://cors-anywhere.herokuapp.com
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  if (data) showData(data);
}

// get lyrics button click
result.addEventListener("click", (e) => {
  const cliclEle = e.target;

  if (cliclEle.tagName === "BUTTON") {
    const artist = cliclEle.getAttribute("data-artist");
    const songTitle = cliclEle.getAttribute("data-songtitle");

    getLyrics(artist, songTitle);
  }
});

// get detail lyrics
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  const lyrics = data.lyrics.replace(/\r\n|\r|\n/g, "<br>");
  result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
  <span class='lyrics'>${lyrics}</span>`;

  more.innerHTML = "";
}

// search songs
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchValue = search.value.trim();
  searchSongs(searchValue);
});
