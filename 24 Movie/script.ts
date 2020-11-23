const APIURL: string = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH: string = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI: string = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main: HTMLElement = document.getElementById("main");

// get movies
async function getMovies(): Promise<any> {
  const res = await fetch(APIURL);
  const data = await res.json();

  console.log(" => ", data);

  // get movie image
  (data.results || []).forEach((movie) => {
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
  HTMLElement;
  return data;
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

getMovies();
