const currencyOne_Ele = document.getElementById("currency__one");
const amountOne_Ele = document.getElementById("amount__one");

const currencyTwo_Ele = document.getElementById("currency__two");
const amountTwo_Ele = document.getElementById("amount__two");

const rate_Ele = document.getElementById("rate");
const swap_Ele = document.getElementById("swap");

// fetch exchange rates and update the DOM
function caclulate() {
  // get select option value
  const currency_one = currencyOne_Ele.value;
  const currency_two = currencyTwo_Ele.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(" => ", data);
      const rate = data.rates[currency_two];
      rate_Ele.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountTwo_Ele.value = (amountOne_Ele.value * rate).toFixed(2);
    });
}

// update swap
function updtaeSwap() {
  const temp = currencyOne_Ele.value;
  currencyOne_Ele.value = currencyTwo_Ele.value;
  currencyTwo_Ele.value = temp;
  caclulate();
}

currencyOne_Ele.addEventListener("change", caclulate);
currencyTwo_Ele.addEventListener("change", caclulate);

amountOne_Ele.addEventListener("input", caclulate);
amountTwo_Ele.addEventListener("input", caclulate);

swap_Ele.addEventListener("click", updtaeSwap);

caclulate();
