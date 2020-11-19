const btnAdd: HTMLElement = document.getElementById("btn-add");

const notesEle: HTMLElement = document.getElementById("notes");

btnAdd.addEventListener("click", () => addNewNote());

function addNewNote() {
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
  const textarea: HTMLElement = note.querySelector(".notes__main-textarea");

  btnEdit.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textarea.classList.toggle("hidden");
  });

  btnDelete.addEventListener("click", () => {
    note.remove();
  });

  textarea.addEventListener("input", (e: any) => {
    const { value } = e.target;
    main.innerHTML = marked(value);
  });

  document.body.appendChild(note);
}
