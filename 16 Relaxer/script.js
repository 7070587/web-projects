const container = document.getElementById("container");
const text = document.getElementById("text");

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

function breathAnimation() {
  //   console.log("Breathe In => ");
  text.innerText = "Breathe In";
  container.className = "container grow";

  setTimeout(() => {
    // console.log("Hold => ");
    text.innerText = "Hold";

    setTimeout(() => {
      //   console.log("Breathe Out => ");  text.innerText = "Breathe In";
      text.innerText = "Breathe Out";
      container.className = "container shrink";
    }, holdTime);
  }, breatheTime);
}

breathAnimation();

setInterval(breathAnimation, totalTime);
