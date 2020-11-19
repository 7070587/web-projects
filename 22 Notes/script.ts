const btnAdd: HTMLElement = document.getElementById("btn-add");

const notesEle: HTMLElement = document.getElementById("notes");

const notes: string[] = JSON.parse(localStorage.getItem("notes"));

// add localStorage to DOM
function addLocalStorageToDOM() {
  (notes || []).forEach((note) => addNewNote(note));
}

addLocalStorageToDOM();

btnAdd.addEventListener("click", () => addNewNote());

function addNewNote(noteData: string = "") {
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

  const btnEdit: HTMLElement = note.querySelector(".fa-edit");
  const btnDelete: HTMLElement = note.querySelector(".fa-trash-alt");

  const main: HTMLElement = note.querySelector(".notes__main");
  const textarea: HTMLTextAreaElement = note.querySelector(".notes__main-textarea");

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

  textarea.addEventListener("input", (e: any) => {
    const { value } = e.target;
    main.innerHTML = marked(value);

    updateLocalStorage();
  });

  document.body.appendChild(note);
}

// save data in localStorage
function updateLocalStorage() {
  const allTextareas: NodeList = document.querySelectorAll(".notes__main-textarea");
  const notes: string[] = [];
  allTextareas.forEach((allTextarea: HTMLTextAreaElement) => notes.push(allTextarea.value));
  localStorage.setItem("notes", JSON.stringify(notes));
}
