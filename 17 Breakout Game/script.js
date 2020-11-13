const btnRules = document.getElementById("btn-rules");
const btnClose = document.getElementById("btn-close");

const rules = document.getElementById("rules");

// rules and close

btnRules.addEventListener("click", () => rules.classList.add("show"));

btnClose.addEventListener("click", () => rules.classList.remove("show"));
