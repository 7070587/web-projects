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

// click add user
addUserBtn.addEventListener("click", getRandomUser);

// click double money
function doubleMoney() {
  data = data.map((user) => {
    // ...user --> copy original user to data
    // money: user.money * 2 --> double money
    return { ...user, money: user.money * 2 };
  });
  updateDOM(data);
}

doubleBtn.addEventListener("click", doubleMoney);

// click Sort by Richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM(data);
}

sortBtn.addEventListener("click", sortByRichest);

// click Show Millionaires
function filterbyMillionaires() {
  data = data.filter((item) => item.money > 1000000);
  updateDOM(data);
}

showMillionairesBtn.addEventListener("click", filterbyMillionaires);

// click Calculate Wealth
function calculateWealth() {
  // calculate wealth
  const wealth = data.reduce((acc, item) => (acc += item.money), 0);

  // show in web
  console.log("wealth => ", wealth);
  const wealthEle = document.createElement("div");
  wealthEle.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
  main.appendChild(wealthEle);
}

calculateWealthBtn.addEventListener("click", calculateWealth);