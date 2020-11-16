const btnRules = document.getElementById("btn-rules");
const btnClose = document.getElementById("btn-close");
const rules = document.getElementById("rules");

// canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let score = 0;

const brickRowCount = 9;
const brickColumnCount = 5;

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

// create brick props
const brick = {
  w: 70,
  h: 20,
  padding: 10,
  offSetX: 45,
  offSetY: 60,
  visible: true,
};

// create bricks
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brick.w + brick.padding) + brick.offSetX;
    const y = j * (brick.h + brick.padding) + brick.offSetY;
    bricks[i][j] = { x, y, ...brick };
  }
}

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

// draw brick on canvas
function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? "#0095dd" : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
}

// darw everything
function drawEevrything() {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

// move paddle on canvas
function movePaddle() {
  paddle.x += paddle.dx;

  // wall detection
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

// update canvas draw and animation
function update() {
  movePaddle();

  // darw everything
  drawEevrything();

  requestAnimationFrame(update);
}

update();

function keyDown(e) {
  if (e.key === "ArrowRight" || e.key === "Right") {
    paddle.dx = paddle.speed;
  } else if (e.key === "ArrowLeft" || e.key === "Left") {
    paddle.dx = -paddle.speed;
  }
}

function keyUp(e) {
  if (e.key === "ArrowRight" || e.key === "Right" || e.key === "ArrowLeft" || e.key === "Left") {
    paddle.dx = 0;
  }
}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// rules and close
btnRules.addEventListener("click", () => rules.classList.add("show"));
btnClose.addEventListener("click", () => rules.classList.remove("show"));
