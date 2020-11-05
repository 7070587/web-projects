const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const submitBtn = document.getElementById("submit");

// const dummyTransactions = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Camera", amount: 150 },
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));

let transactions = localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// add transactions to DOM list
function addTransactionDOM(transaction) {
  // get minus or plugins
  const sign = transaction.amount < 0 ? "-" : "+";

  // add value to li
  const item = document.createElement("li");

  // all class bases on value
  item.classList.add("list__item");
  item.classList.add(transaction.amount < 0 ? "list__item--minus" : "list__item--plus");

  // Math.abs(): 回傳一個數字的絕對值
  item.innerHTML = `
    ${transaction.text} 
    <span>${sign}${Math.abs(transaction.amount)}</span> 
    <button class="btn-delete" onclick="removeTransaction(${transaction.id})">x</button>
  `;

  list.appendChild(item);
}

// update balance, income and expense
function updateTransactionValues() {
  // get every amount
  const amounts = transactions.map((transaction) => transaction.amount);

  // get total amount
  const totalAmount = amounts.reduce((acc, item) => (acc += item), 0);

  // get total income
  const income = amounts.filter((item) => item > 0).reduce((acc, itemIncome) => (acc += itemIncome), 0);
  // get total expense
  const expense = amounts.filter((item) => item < 0).reduce((acc, itemExpense) => (acc += itemExpense), 0);

  // count balance
  balance.innerText = `$${totalAmount.toFixed(2)}`;
  moneyPlus.innerText = `$${income.toFixed(2)}`;
  moneyMinus.innerText = `$${(expense * -1).toFixed(2)}`;
}

// add new transactions
function addTransaction(e) {
  e.preventDefault();

  // get transaction data
  const transaction = {
    id: generateID(),
    text: text.value,
    amount: +amount.value,
  };

  transactions.push(transaction);

  addTransactionDOM(transaction);

  updateTransactionValues();

  updateLocalStorageTransactions();

  // clear transaction vlaue
  text.value = "";
  amount.value = "";
}

form.addEventListener("submit", addTransaction);

// remove transaction by Id
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorageTransactions();

  init();
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// check button disabled or not
function checkButtonDisabled() {
  submitBtn.disabled = text.value.trim() && amount.value.trim() ? false : true;
}

// update localStorage transactions
function updateLocalStorageTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

text.addEventListener("input", checkButtonDisabled);
amount.addEventListener("input", checkButtonDisabled);

// init
function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateTransactionValues();
}

init();
