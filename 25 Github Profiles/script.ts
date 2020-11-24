const APIURL = "https://api.github.com/users/";

const main: HTMLElement = document.getElementById("main");
const form: HTMLElement = document.getElementById("form");
const search: HTMLInputElement = <HTMLInputElement>document.getElementById("search");

// get user
async function getUser(user: string): Promise<void> {
  const res: any = await fetch(APIURL + user);
  const data = await res.json();

  addUserToDOM(data);

  getUserRepos(user);
}

getUser("7070587");

// add user to DOM
function addUserToDOM(userData: any) {
  const { name, avatar_url, bio, followers, following, public_repos } = userData;

  const cardHTML = `
        <div class="card">
            <div>
                <img class="user__avatar" src="${avatar_url}" alt="${name}" />
            </div>
            <div class="user__info">
                <h2 class="user__title">${name}</h2>
                <p>${bio ? bio : ""}</p>

                <ul class="user__detail">
                    <li><strong>${followers} Followers</strong></li>
                    <li><strong>${following} Following</strong></li>
                    <li><strong>${public_repos} Repos</strong></li>
                </ul>

                <div id="repos" class='repos'></div>
            </div>
        </div>
    `;

  main.innerHTML = cardHTML;
}

// get user repos
async function getUserRepos(user: string): Promise<void> {
  const res: any = await fetch(APIURL + user + "/repos");
  const data = await res.json();

  addUserReposToDOM(data);
}

function addUserReposToDOM(reposData: any) {
  const reposEle: HTMLElement = document.getElementById("repos");
  (reposData || [])
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 9)
    .forEach((repo) => {
      const repoEle: HTMLBaseElement = document.createElement("a");
      repoEle.classList.add("repo");
      const { html_url, name } = repo;

      repoEle.href = html_url;
      repoEle.target = "_blank";
      repoEle.innerText = name;

      reposEle.appendChild(repoEle);
    });
}

// search
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue: string = search.value.trim();

  if (searchValue) {
    getUser(searchValue);
  }
});
