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

  addEventListener();
}

createList();

function addEventListener() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItem = document.querySelectorAll(".draggable-list .draggable-item");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItem.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

function dragStart() {
  //   console.log("dragStart => ");
  // Element.closest() 方法用來獲取：匹配特定選擇器且離當前元素最近的祖先元素（也可以是當前元素本身）。如果匹配不到，則返回 null。
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragEnter() {
  //   console.log("dragEnter => ");
  this.classList.add("over");
}

function dragLeave(e) {
  //   console.log("dragLeave => ");
  this.classList.remove("over");
  e.preventDefault();
}

function dragOver(e) {
  //   console.log("dragOver => ");
  e.preventDefault();
}

function dragDrop() {
  //   console.log("dragDrop => ");
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
}

// swap list item that are deag and drop
function swapItems(fromIndex, toIndex) {
  const itemStart = listItems[fromIndex].querySelector(".draggable");
  const itemEnd = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemEnd);
  listItems[toIndex].appendChild(itemStart);
}

// check the order of list items on button click
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".draggable").innerText.trim();

    console.log(" => ", listItem);

    if (personName !== richestPeople[index]) {
      listItem.classList.add("error");
    } else {
      listItem.classList.remove("error");
      listItem.classList.add("right");
    }
  });
}

btnCheck.addEventListener("click", checkOrder);
