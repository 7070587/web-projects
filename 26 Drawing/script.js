const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const btnIncrease = document.getElementById("increase");
const btnDecrease = document.getElementById("decrease");
const btnClear = document.getElementById("clear");
const btnSave = document.getElementById("save");
const canvasSize = document.getElementById("canvasSize");
const canvasColor = document.getElementById("color");
let size = 5;
let color = "black";
let x = undefined;
let y = undefined;
let isPressed = undefined;
canvas.addEventListener("mousedown", (e) => {
    isPressed = true;
    x = e.offsetX;
    y = e.offsetY;
});
canvas.addEventListener("mouseup", (e) => {
    isPressed = false;
    x = undefined;
    y = undefined;
});
canvas.addEventListener("mousemove", (e) => {
    if (isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;
        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);
        x = x2;
        y = y2;
    }
});
// draw circle
function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}
// draw line
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}
// drawLine(100, 100, 200, 200);
// size
btnIncrease.addEventListener("click", () => {
    size++;
    if (size > 50)
        size = 50;
    canvasSize.value = `${size}`;
});
btnDecrease.addEventListener("click", () => {
    size--;
    if (size < 1)
        size = 1;
    canvasSize.value = `${size}`;
});
canvasSize.addEventListener("input", () => {
    if (+canvasSize.value > 50)
        canvasSize.value = "50";
    if (+canvasSize.value < 1)
        canvasSize.value = "1";
    size = +canvasSize.value;
});
canvasSize.addEventListener("click", () => {
    if (+canvasSize.value > 50)
        canvasSize.value = "50";
    if (+canvasSize.value < 1)
        canvasSize.value = "1";
    size = +canvasSize.value;
});
// color
canvasColor.addEventListener("change", (e) => {
    color = e.target.value;
    console.log(" => ", color);
});
// clear canvas
btnClear.addEventListener("click", () => ctx.clearRect(0, 0, canvas.width, canvas.height));
// save canvas
btnSave.addEventListener("click", () => exportCanvasAsPNG("canvas", "canvas-image"));
function exportCanvasAsPNG(id, fileName) {
    const canvasElement = document.getElementById(id);
    const MIME_TYPE = "image/png";
    const imgURL = canvasElement.toDataURL(MIME_TYPE);
    const dlLink = document.createElement("a");
    dlLink.download = fileName;
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(":");
    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
}
// drawCircle(100, 100);
// function draw(): void {
//   // clear
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   drawCircle(100, 100);
//   requestAnimationFrame(draw);
// }
// draw();
//# sourceMappingURL=script.js.map