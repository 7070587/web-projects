const form = document.getElementById("form");
const input = document.getElementById("input");
const todos = document.getElementById("todos");
const todoData = JSON.parse(localStorage.getItem("todos"));
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
function addTodo(todo = undefined) {
    const todoText = todo && todo.text ? todo.text : input.value;
    if (todoText) {
        const todoEle = document.createElement("li");
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
    const todosEle = document.querySelectorAll("li");
    const todos = [];
    todosEle.forEach((todo) => todos.push({ text: todo.innerText, completed: todo.classList.contains("completed") }));
    localStorage.setItem("todos", JSON.stringify(todos));
}
//# sourceMappingURL=script.js.map