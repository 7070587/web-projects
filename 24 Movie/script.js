const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const PAGEURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const pageSearch = document.getElementById("page-search");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
let page = 1;
// get movies
async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    page = data.page;
    if (data.page === 1 && data.total_pages > 1) {
        prev.disabled = true;
        next.disabled = false;
    }
    else if (data.page === data.total_pages) {
        prev.disabled = false;
        next.disabled = true;
    }
    else if (data.page === 1 && data.total_pages === 1) {
        prev.disabled = true;
        next.disabled = true;
    }
    else {
        prev.disabled = false;
        next.disabled = false;
    }
    //   console.log(" => ", data);
    showMovieToDOM(data.results);
    return data;
}
function showMovieToDOM(movie) {
    // clear main movie data
    main.innerHTML = "";
    (movie || []).forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;
        const movieEle = document.createElement("div");
        movieEle.classList.add("movie");
        movieEle.innerHTML = `
        <img class="movie__img" src="${IMGPATH + poster_path}" alt="${movie.title}">
        <div class="movie__info">
            <h3 class="movie__title">${title}</h3>
            <span class="movie__score ${getClassByScore(vote_average)}">${vote_average}</span>
        </div>
        <div class='movie__overview'><h3>Overview:</h3>${overview}</div>
      `;
        main.appendChild(movieEle);
    });
}
function getClassByScore(vote_average) {
    if (vote_average >= 8) {
        return "movie__score-green";
    }
    else if (vote_average < 8 && vote_average >= 5) {
        return "movie__score-orange";
    }
    else {
        return "movie__score-red";
    }
}
getMovies(APIURL);
// search
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchValue = search.value.trim();
    const url = searchValue ? SEARCHAPI + searchValue : APIURL;
    getMovies(url);
});
// next / prev button
prev.addEventListener("click", (e) => {
    const pagePrev = page - 1;
    pageSearch.value = pagePrev.toString();
    const url = `${PAGEURL}${pagePrev}`;
    getMovies(url);
});
next.addEventListener("click", (e) => {
    const pageNext = page + 1;
    pageSearch.value = pageNext.toString();
    const url = `${PAGEURL}${pageNext}`;
    getMovies(url);
});
// input page number
pageSearch.addEventListener("input", () => {
    const searchValue = pageSearch.value.trim();
    const url = `${PAGEURL}${searchValue}`;
    getMovies(url);
});
pageSearch.addEventListener("ckick", () => {
    const searchValue = pageSearch.value.trim();
    const url = `${PAGEURL}${searchValue}`;
    getMovies(url);
});
//# sourceMappingURL=script.js.map