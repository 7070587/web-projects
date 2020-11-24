const lengthEl: HTMLInputElement = <HTMLInputElement>document.getElementById("length");
const upperEl: HTMLInputElement = <HTMLInputElement>document.getElementById("upper");
const lowerEl: HTMLInputElement = <HTMLInputElement>document.getElementById("lower");
const numberEl: HTMLInputElement = <HTMLInputElement>document.getElementById("number");
const symbolEl: HTMLInputElement = <HTMLInputElement>document.getElementById("symbol");

const pw: HTMLElement = document.getElementById("pw");

const btnCopy: HTMLElement = document.getElementById("copy");
const btnGenerate: HTMLElement = document.getElementById("generate");

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=.";

function getLowercase(): string {
  return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getUppercase(): string {
  return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function getNumber(): string {
  return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbol(): string {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword() {
  const length: number = +lengthEl.value;
  let password: string = "";

  for (let index = 0; index < length; index++) {
    const char: string = generateChar();
    password += char;
  }

  pw.innerHTML = password;
}

function generateChar(): string {
  const chars: string[] = [];

  if (upperEl.checked) chars.push(getUppercase());
  if (lowerEl.checked) chars.push(getLowercase());
  if (numberEl.checked) chars.push(getNumber());
  if (symbolEl.checked) chars.push(getSymbol());

  if (!upperEl.checked || lowerEl.checked! || !numberEl.checked || !symbolEl.checked) {
    chars.push(getUppercase());
    chars.push(getLowercase());
    chars.push(getNumber());
    chars.push(getSymbol());
  }

  if (chars.length === 0) return "";

  return chars[Math.floor(Math.random() * chars.length)];
}

btnGenerate.addEventListener("click", generatePassword);
