const APIURL = "https://api.github.com/users/";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
// get user
async function getUser(user) {
    const res = await fetch(APIURL + user);
    const data = await res.json();
    addUserToDOM(data);
    getUserRepos(user);
}
getUser("7070587");
// add user to DOM
function addUserToDOM(userData) {
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
async function getUserRepos(user) {
    const res = await fetch(APIURL + user + "/repos");
    const data = await res.json();
    addUserReposToDOM(data);
}
function addUserReposToDOM(reposData) {
    const reposEle = document.getElementById("repos");
    (reposData || [])
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 9)
        .forEach((repo) => {
        const repoEle = document.createElement("a");
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
    const searchValue = search.value.trim();
    if (searchValue) {
        getUser(searchValue);
    }
});
//# sourceMappingURL=script.js.map