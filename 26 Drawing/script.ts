const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const btnIncrease: HTMLElement = document.getElementById("increase");
const btnDecrease: HTMLElement = document.getElementById("decrease");
const btnClear: HTMLElement = document.getElementById("clear");
const btnSave: HTMLElement = document.getElementById("save");

const canvasSize: HTMLInputElement = <HTMLInputElement>document.getElementById("canvasSize");
const canvasColor: HTMLInputElement = <HTMLInputElement>document.getElementById("color");

let size: number = 5;
let color: string = "black";
let x: number = undefined;
let y: number = undefined;

let isPressed: boolean = undefined;

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
function drawCircle(x: number, y: number): void {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

// draw line
function drawLine(x1: number, y1: number, x2: number, y2: number): void {
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
  if (size > 50) size = 50;
  canvasSize.value = `${size}`;
});

btnDecrease.addEventListener("click", () => {
  size--;
  if (size < 1) size = 1;
  canvasSize.value = `${size}`;
});

canvasSize.addEventListener("input", () => {
  if (+canvasSize.value > 50) canvasSize.value = "50";
  if (+canvasSize.value < 1) canvasSize.value = "1";

  size = +canvasSize.value;
});

canvasSize.addEventListener("click", () => {
  if (+canvasSize.value > 50) canvasSize.value = "50";
  if (+canvasSize.value < 1) canvasSize.value = "1";

  size = +canvasSize.value;
});

// color
canvasColor.addEventListener("change", (e: any) => {
  color = e.target.value;
  console.log(" => ", color);
});

// clear canvas
btnClear.addEventListener("click", () => ctx.clearRect(0, 0, canvas.width, canvas.height));

// save canvas
btnSave.addEventListener("click", () => exportCanvasAsPNG("canvas", "canvas-image"));

function exportCanvasAsPNG(id: string, fileName: string) {
  const canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(id);

  const MIME_TYPE: string = "image/png";

  const imgURL: string = canvasElement.toDataURL(MIME_TYPE);

  const dlLink: any = document.createElement("a");

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
