const btnEdit: HTMLElement = document.getElementById("btn-edit");
const btnDelete: HTMLElement = document.getElementById("btn-delete");

const notesEle: HTMLElement = document.getElementById("notes");

const main: HTMLElement = document.querySelector(".notes__main");
const textarea: HTMLElement = document.querySelector(".notes__main-textarea");

btnEdit.addEventListener("click", () => {
  main.classList.toggle("hidden");
  textarea.classList.toggle("hidden");
});

textarea.addEventListener("input", (e: any) => {
  const { value } = e.target;
  main.innerHTML = marked(value);
});
