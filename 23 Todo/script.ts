interface ITodo {
  text: string;
  completed: boolean;
}

const form: HTMLElement = document.getElementById("form");
const input: HTMLInputElement = <HTMLInputElement>document.getElementById("input");
const todos: HTMLElement = document.getElementById("todos");

const todoData: ITodo[] = JSON.parse(localStorage.getItem("todos"));

// add localStorage to DOM
function addLocalStorageToDOM() {
  (todoData || []).forEach((todo) => addTodo(todo));
}

addLocalStorageToDOM();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

// input to add todo
function addTodo(todo: ITodo = undefined) {
  const todoText = todo && todo.text ? todo.text : input.value;

  if (todoText) {
    const todoEle: HTMLElement = document.createElement("li");

    if (todo && todo.completed) {
      todoEle.classList.add("completed");
    }

    todoEle.innerHTML = todoText;

    todoEle.addEventListener("click", () => {
      todoEle.classList.toggle("completed");
      updateTodos();
    });

    // click mouse right to dele todo
    todoEle.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      todoEle.remove();
      updateTodos();
    });

    todos.appendChild(todoEle);

    input.value = "";

    updateTodos();
  }
}

// save todo localStorage
function updateTodos() {
  const todosEle: NodeList = document.querySelectorAll("li");
  const todos: ITodo[] = [];
  todosEle.forEach((todo: HTMLElement) => todos.push({ text: todo.innerText, completed: todo.classList.contains("completed") }));
  localStorage.setItem("todos", JSON.stringify(todos));
}
