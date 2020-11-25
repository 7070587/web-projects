const lengthEl = document.getElementById("length");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const pw = document.getElementById("pw");
const btnCopy = document.getElementById("copy");
const btnGenerate = document.getElementById("generate");
const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=.";
function getLowercase() {
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}
function getUppercase() {
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}
function getNumber() {
    return numbers[Math.floor(Math.random() * numbers.length)];
}
function getSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}
function generatePassword() {
    const length = +lengthEl.value;
    let password = "";
    //   if (upperEl.checked) password += getUppercase();
    //   if (lowerEl.checked) password += getLowercase();
    //   if (numberEl.checked) password += getNumber();
    //   if (symbolEl.checked) password += getSymbol();
    for (let index = 0; index < length; index++) {
        const char = generateChar();
        password += char;
    }
    pw.innerHTML = password;
}
function generateChar() {
    const chars = [];
    if (upperEl.checked)
        chars.push(getUppercase());
    if (lowerEl.checked)
        chars.push(getLowercase());
    if (numberEl.checked)
        chars.push(getNumber());
    if (symbolEl.checked)
        chars.push(getSymbol());
    if (!upperEl.checked && !lowerEl.checked && !numberEl.checked && !symbolEl.checked) {
        chars.push(getUppercase());
        chars.push(getLowercase());
        chars.push(getNumber());
        chars.push(getSymbol());
    }
    if (+lengthEl.value === 0)
        return "";
    return chars[Math.floor(Math.random() * chars.length)];
}
btnGenerate.addEventListener("click", generatePassword);
// copy password
btnCopy.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const password = pw.innerText;
    if (!password)
        return false;
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password copied to clipboard");
});
//# sourceMappingURL=script.js.map