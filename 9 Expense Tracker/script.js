const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const dummyTransactions = [
  { id: 1, text: "Flower", amount: -20 },
  { id: 2, text: "Salary", amount: 300 },
  { id: 3, text: "Book", amount: -10 },
  { id: 4, text: "Camera", amount: 150 },
];

let transactions = dummyTransactions;

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

// init
function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
}

init();
