let lastQuickFilters = [];
let countdownInterval;
let stopwatchInterval;

function createTimerUI() {
  if (document.getElementById("jira-timer-container")) return;

  const container = document.createElement("div");
  container.id = "jira-timer-container";

  container.innerHTML = `
    <div class="timer-ring">
      <button id="jira-timer-minimize" aria-label="Minimize">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#e3e3e3"><path d="M440-440v240h-80v-160H200v-80h240Zm160-320v160h160v80H520v-240h80Z"/></svg>
      </button>
      <svg viewBox="0 0 400 400">
        <circle r="180" cx="200" cy="200" fill="none" stroke="#333" stroke-width="20" />
        <circle class="timer-path" r="180" cx="200" cy="200" fill="none" stroke="lightskyblue" stroke-width="20" stroke-linecap="round" stroke-dasharray="1130" stroke-dashoffset="0" />
      </svg>
      <div id="jira-timer-display">--:--</div>
    </div>
  `;

  document.body.appendChild(container);
  
  // Create restore button
  const restoreButton = document.createElement("button");
  restoreButton.id = "jira-timer-restore";
  restoreButton.textContent = "Timer";
  document.body.appendChild(restoreButton);

  // Minimize event
  document.getElementById("jira-timer-minimize").addEventListener("click", () => {
    container.style.display = "none";
    restoreButton.style.display = "block";
  });

  // Restore event
  restoreButton.addEventListener("click", () => {
    container.style.display = "flex";
    restoreButton.style.display = "none";
  });
}

function startTimer() {
  clearInterval(countdownInterval);
  clearInterval(stopwatchInterval);

  const container = document.getElementById("jira-timer-container");
  if (container) container.classList.remove("over-time");

  let totalSeconds = 90;
  let timeLeft = totalSeconds + 2; // 2 seconds for loading the board extra
  let stopwatchSeconds = 0;
  const path = document.querySelector(".timer-path");
  const circleLength = 2 * Math.PI * 180;

  path.style.strokeDasharray = circleLength;
  path.style.strokeDashoffset = "0";
  path.setAttribute("stroke", "lightskyblue");

  updateDisplay(formatTime(timeLeft));

  countdownInterval = setInterval(() => {
    timeLeft--;

    const progress = circleLength * (1 - timeLeft / totalSeconds);
    path.style.strokeDashoffset = progress;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      container.classList.add("over-time");
      path.setAttribute("stroke", "red");

      stopwatchInterval = setInterval(() => {
        stopwatchSeconds++;
        updateDisplay("+" + formatTime(stopwatchSeconds));

        const overtimeProgress = circleLength + (circleLength * stopwatchSeconds) / totalSeconds;
        path.style.strokeDashoffset = overtimeProgress;
      }, 1000);
    } else {
      updateDisplay(formatTime(timeLeft));
    }
  }, 1000);
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function updateDisplay(text) {
  const display = document.getElementById("jira-timer-display");
  if (display) {
    display.textContent = text;
  }
}

// Detect URL Quick Filter change in SPAs
function getQuickFiltersFromUrl(url) {
  const urlObj = new URL(url);
  // URLSearchParams.getAll returns all values for repeated params
  return urlObj.searchParams.getAll("quickFilter").sort();
}

const observer = new MutationObserver(() => {
  const currentQuickFilters = getQuickFiltersFromUrl(location.href);
  // Compare arrays as strings (sorted, so order irrelevant)
  if (currentQuickFilters.join(",") !== lastQuickFilters.join(",")) {
    lastQuickFilters = currentQuickFilters;
    startTimer();
  }
});

observer.observe(document.body, { childList: true, subtree: true });

createTimerUI();
startTimer(); // start once on load
