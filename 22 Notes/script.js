const btnAdd = document.getElementById("btn-add");
const notesEle = document.getElementById("notes");
const notes = JSON.parse(localStorage.getItem("notes"));
// add localStorage to DOM
function addLocalStorageToDOM() {
    (notes || []).forEach((note) => addNewNote(note));
}
addLocalStorageToDOM();
btnAdd.addEventListener("click", () => addNewNote());
function addNewNote(noteData = "") {
    const note = document.createElement("div");
    note.classList.add("notes");
    note.innerHTML = `
        <div class="notes__tools">
            <button class="fas fa-edit btn" id='btn-edit'></button>
            <button class="fas fa-trash-alt btn" id='btn-delete'></button>
        </div>

        <div class="notes__main hidden"> </div>
        <textarea class="notes__main-textarea"></textarea>

    `;
    const btnEdit = note.querySelector(".fa-edit");
    const btnDelete = note.querySelector(".fa-trash-alt");
    const main = note.querySelector(".notes__main");
    const textarea = note.querySelector(".notes__main-textarea");
    main.innerHTML = marked(noteData);
    textarea.value = noteData;
    btnEdit.addEventListener("click", () => {
        main.classList.toggle("hidden");
        textarea.classList.toggle("hidden");
    });
    btnDelete.addEventListener("click", () => {
        note.remove();
        updateLocalStorage();
    });
    textarea.addEventListener("input", (e) => {
        const { value } = e.target;
        main.innerHTML = marked(value);
        updateLocalStorage();
    });
    document.body.appendChild(note);
}
// save data in localStorage
function updateLocalStorage() {
    const allTextareas = document.querySelectorAll(".notes__main-textarea");
    const notes = [];
    allTextareas.forEach((allTextarea) => notes.push(allTextarea.value));
    localStorage.setItem("notes", JSON.stringify(notes));
}
//# sourceMappingURL=script.js.map