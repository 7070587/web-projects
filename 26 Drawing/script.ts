const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let size: number = 5;
let x: number = 10;
let y: number = 10;

let isPressed: boolean = undefined;

canvas.addEventListener("mousedown", () => (isPressed = true));
canvas.addEventListener("mouseup", () => (isPressed = false));

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    const x: number = e.offsetX;
    const y: number = e.offsetY;

    drawCircle(x, y);
  }
});

function drawCircle(x: number, y: number): void {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();
}

// drawCircle(100, 100);

// function draw(): void {
//   // clear
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   drawCircle(100, 100);
//   requestAnimationFrame(draw);
// }

// draw();
