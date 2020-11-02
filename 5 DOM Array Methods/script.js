const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

// get 3 random users
getRandomUser();

// fetch random user and add money
async function getRandomUser() {
  for (let index = 0; index < 3; index++) {
    const res = await fetch("https://randomuser.me/api");
    const tempData = await res.json();
    const user = tempData.results[0];
    data.push({
      name: `${user.name?.first} ${user.name?.last}`,
      money: Math.floor(Math.random() * 1000000),
    });
  }
}
