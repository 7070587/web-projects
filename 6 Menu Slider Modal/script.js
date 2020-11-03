const toggle = document.getElementById("toggle");
const closeModal = document.getElementById("close-modal");
const showModal = document.getElementById("show-modal");
const modal = document.getElementById("modal");

// toggle
toggle.addEventListener("click", () => document.body.classList.toggle("body__show-nav"));

// show modal
showModal.addEventListener("click", () => modal.classList.add("modal__container--show"));

// hide modal
closeModal.addEventListener("click", () => modal.classList.remove("modal__container--show"));

// hide modal on outside click
window.addEventListener("click", (e) => (e.target === modal ? modal.classList.remove("modal__container--show") : fasle));
