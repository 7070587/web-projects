const panels: NodeListOf<Element> = document.querySelectorAll(".panel");

panels.forEach((panel: Element) => {
  panel.addEventListener("click", () => {
    removeActiveClass();
    panel.classList.add("active");
  });
});

function removeActiveClass(): void {
  panels.forEach((panel: Element) => {
    panel.classList.remove("active");
  });
}
