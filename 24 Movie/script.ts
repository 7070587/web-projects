const APIURL: string = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH: string = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI: string = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const PAGEURL: string = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";

const main: HTMLElement = document.getElementById("main");
const form: HTMLElement = document.getElementById("form");
const search: HTMLInputElement = <HTMLInputElement>document.getElementById("search");
const pageSearch: HTMLInputElement = <HTMLInputElement>document.getElementById("page-search");

const prev: HTMLButtonElement = <HTMLButtonElement>document.getElementById("prev");
const next: HTMLButtonElement = <HTMLButtonElement>document.getElementById("next");

let page: number = 1;

// get movies
async function getMovies(url: string): Promise<any> {
  const res = await fetch(url);
  const data = await res.json();

  page = data.page;

  if (data.page === 1 && data.total_pages > 1) {
    prev.disabled = true;
    next.disabled = false;
  } else if (data.page === data.total_pages) {
    prev.disabled = false;
    next.disabled = true;
  } else if (data.page === 1 && data.total_pages === 1) {
    prev.disabled = true;
    next.disabled = true;
  } else {
    prev.disabled = false;
    next.disabled = false;
  }

  //   console.log(" => ", data);
  showMovieToDOM(data.results);
  return data;
}

function showMovieToDOM(movie: any[]) {
  // clear main movie data
  main.innerHTML = "";
  (movie || []).forEach((movie) => {
    const { poster_path, title, vote_average } = movie;
    const movieEle: HTMLElement = document.createElement("div");
    movieEle.classList.add("movie");

    movieEle.innerHTML = `
        <img class="movie__img" src="${IMGPATH + poster_path}" alt="${movie.title}">
        <div class="movie__info">
            <h3 class="movie__title">${title}</h3>
            <span class="movie__score ${getClassByScore(vote_average)}">${vote_average}</span>
        </div>
      `;
    main.appendChild(movieEle);
  });
}

function getClassByScore(vote_average: number): string {
  if (vote_average >= 8) {
    return "movie__score-green";
  } else if (vote_average < 8 && vote_average >= 5) {
    return "movie__score-orange";
  } else {
    return "movie__score-red";
  }
}

getMovies(APIURL);

// search
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue: string = search.value.trim();

  const url: string = searchValue ? SEARCHAPI + searchValue : APIURL;

  getMovies(url);
});

// next / prev button
prev.addEventListener("click", (e) => {
  const pagePrev = page - 1;
  pageSearch.value = pagePrev.toString();
  const url: string = `${PAGEURL}${pagePrev}`;
  getMovies(url);
});

next.addEventListener("click", (e) => {
  const pageNext = page + 1;
  pageSearch.value = pageNext.toString();
  const url: string = `${PAGEURL}${pageNext}`;
  getMovies(url);
});

pageSearch.addEventListener("input", () => {
  const searchValue: string = pageSearch.value.trim();
  const url: string = `${PAGEURL}${searchValue}`;
  getMovies(url);
});

pageSearch.addEventListener("ckick", () => {
  const searchValue: string = pageSearch.value.trim();
  const url: string = `${PAGEURL}${searchValue}`;
  getMovies(url);
});
