const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

const addUserCount = 3;
let data = [];

// get 3 random users
getFirstUsers();
async function getFirstUsers() {
  for (let index = 0; index < addUserCount; index++) {
    getRandomUser(addUserCount);
  }
}

// fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const tempData = await res.json();
  const user = tempData.results[0];
  data.push({
    name: `${user.name?.first} ${user.name?.last}`,
    money: Math.floor(Math.random() * 1000000),
  });

  showUser(data);
}

// show user in web
function showUser(data) {
  updateDOM(data);
}

// update DOM
function updateDOM(provideedData = data) {
  // clear main div
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  // add data into main
  (provideedData || []).forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> $${formatMoney(item.money)}`;
    main.appendChild(element);
  });
}

// format number as money
function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// add user
addUserBtn.addEventListener("click", getRandomUser);
