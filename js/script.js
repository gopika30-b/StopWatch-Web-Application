let startTimer;
let hrs = (min = sec = ms = 0);
let lapStartTime;
let laps = [];

const btnstart = document.querySelector(".start");
const btnreset = document.querySelector(".reset");
const btnLap = document.querySelector(".lap");
const lapList = document.getElementById("lapList");

btnstart.addEventListener("click", () => {
  if (!startTimer) {
    StartTime = new Date() - (lapStartTime || 0);
    startTimer = setInterval(() => {
      ms += 1;
      if (ms === 100) {
        sec += 1;
        ms = 0;
      }
      if (sec === 60) {
        min += 1;
        sec = 0;
      }
      if (min === 60) {
        hrs += 1;
      }
      update();
    }, 10);
    btnstart.innerText = "STOP";
    btnLap.disabled = false;
  } else {
    clearInterval(startTimer);
    startTimer = null;
    btnstart.innerText = "START";
    btnLap.disabled = true;
  }
});

btnreset.addEventListener("click", () => {
  clearInterval(startTimer);
  startTimer = null;
  hrs = min = sec = ms = 0;
  update();
  lapStartTime = null;
  laps = [];
  location.reload();
});
btnLap.addEventListener("click", () => {
  if (startTimer) {
    const lapTime = new Date() - StartTime;
    laps.push(formatTime(lapTime));
    lapStartTime = new Date();
    displayLaps();
  }
});

function displayLaps() {
  lapList.innerHTML = "";
  laps.forEach((lap, index) => {
    const li = document.createElement("li");
    li.textContent = `Lap ${index + 1}: ${lap}`;
    lapList.appendChild(li);
  });
}
function formatTime(time) {
  const date = new Date(time);
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const milliseconds = date.getMilliseconds().toString().padStart(3, "0");
  return `${minutes}:${seconds}.${milliseconds}`;
}

function update() {
  phrs = hrs < 10 ? "0" + hrs : hrs;
  pmin = min < 10 ? "0" + min : min;
  psec = sec < 10 ? "0" + sec : sec;
  pms = ms < 10 ? "0" + ms : ms;
  document.querySelector(".hrs").innerText = phrs;
  document.querySelector(".min").innerText = pmin;
  document.querySelector(".sec").innerText = psec;
  document.querySelector(".ms").innerText = pms;
}
