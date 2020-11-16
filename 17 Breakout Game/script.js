const btnRules = document.getElementById("btn-rules");
const btnClose = document.getElementById("btn-close");
const rules = document.getElementById("rules");

// canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let score = 0;

// create ball props
const ball = {
  // in middle center
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
  color: "#0095dd",
};

// create paddle props
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
};

// draw ball on canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2); // Outer circle
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

// draw paddle on canvas
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h); // Outer circle
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

// draw score on canvas
function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30); // Outer circle
}

// darw everything
function drawEevrything() {
  drawBall();
  drawPaddle();
  drawScore();
}

drawEevrything();

// rules and close
btnRules.addEventListener("click", () => rules.classList.add("show"));
btnClose.addEventListener("click", () => rules.classList.remove("show"));
