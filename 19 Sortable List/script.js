const draggableList = document.getElementById("draggable-list");
const btnCheck = document.getElementById("btn-check");

const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffett",
  "Bernard Arnault",
  "Carlos Slim Helu",
  "Amancio Ortega",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page",
];

// store list items
const listItems = [];

let dragStartIndex;

// insert list item in to DOM
function createList() {
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      console.log(" => ", person);
      const listItem = document.createElement("li");

      listItem.setAttribute("data-index", index);
      listItem.classList.add("draggable-item");

      listItem.innerHTML = `
        <span class="draggable-number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="draggable-person-name">${person}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;

      listItems.push(listItem);
      draggableList.appendChild(listItem);
    });
}

createList();
