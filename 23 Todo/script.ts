const form: HTMLElement = document.getElementById("form");
const input: HTMLInputElement = <HTMLInputElement>document.getElementById("input");
const todos: HTMLElement = document.getElementById("todos");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const todoText = input.value;

  if (todoText) {
    const todoEle: HTMLElement = document.createElement("li");
    todoEle.innerHTML = todoText;

    todoEle.addEventListener("click", () => todoEle.classList.toggle("completed"));

    // click mouse right to dele todo
    todoEle.addEventListener("contextmenu", () => {
      e.preventDefault();
      todoEle.remove();
    });

    todos.appendChild(todoEle);

    input.value = "";
  }
});
