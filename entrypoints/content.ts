import { ContentScriptContext, defineContentScript } from '#imports';
import './style.css';

export default defineContentScript({
  registration: "runtime",
  main: async function (ctx: ContentScriptContext) {
    let lastQuickFilters: string[] = [];
    let countdownInterval: number | undefined;
    let stopwatchInterval: number | undefined;

    function createTimerUI() {
      if (document.getElementById('jira-timer-container')) return;

      const container = document.createElement('div');
      container.id = 'jira-timer-container';

      container.innerHTML = `
        <div class="timer-ring">
          <button id="jira-timer-minimize" aria-label="Minimize">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#e3e3e3">
              <path d="M440-440v240h-80v-160H200v-80h240Zm160-320v160h160v80H520v-240h80Z"/>
            </svg>
          </button>
          <svg viewBox="0 0 400 400">
            <circle r="180" cx="200" cy="200" fill="none" stroke="#333" stroke-width="20" />
            <circle class="timer-path" r="180" cx="200" cy="200" fill="none" stroke="lightskyblue" stroke-width="20" stroke-linecap="round" stroke-dasharray="1130" stroke-dashoffset="0" />
          </svg>
          <div id="jira-timer-display">--:--</div>
        </div>
      `;

      document.body.appendChild(container);

      const restoreButton = document.createElement('button');
      restoreButton.id = 'jira-timer-restore';
      restoreButton.textContent = 'Timer';
      document.body.appendChild(restoreButton);

      // Minimize event
      document.getElementById('jira-timer-minimize')?.addEventListener('click', () => {
        container.style.display = 'none';
        restoreButton.style.display = 'block';
      });

      // Restore event
      restoreButton.addEventListener('click', () => {
        container.style.display = 'flex';
        restoreButton.style.display = 'none';
      });
    }

    function formatTime(seconds: number): string {
      const m = Math.floor(seconds / 60).toString().padStart(2, '0');
      const s = (seconds % 60).toString().padStart(2, '0');
      return `${m}:${s}`;
    }

    function updateDisplay(text: string) {
      const display = document.getElementById('jira-timer-display');
      if (display) {
        display.textContent = text;
      }
    }

    function startTimer() {
      clearInterval(countdownInterval);
      clearInterval(stopwatchInterval);

      const container = document.getElementById('jira-timer-container');
      if (container) container.classList.remove('over-time');

      const totalSeconds = 90;
      let timeLeft = totalSeconds + 2; // Buffer time
      let stopwatchSeconds = 0;

      const path = document.querySelector<SVGCircleElement>('.timer-path');
      if (!path) return;

      const circleLength = 2 * Math.PI * 180;
      path.style.strokeDasharray = circleLength.toString();
      path.style.strokeDashoffset = '0';
      path.setAttribute('stroke', 'lightskyblue');

      updateDisplay(formatTime(timeLeft));

      countdownInterval = window.setInterval(() => {
        timeLeft--;

        const progress = circleLength * (1 - timeLeft / totalSeconds);
        path.style.strokeDashoffset = progress.toString();

        if (timeLeft <= 0) {
          clearInterval(countdownInterval);
          if (container) container.classList.add('over-time');
          path.setAttribute('stroke', 'red');

          stopwatchInterval = window.setInterval(() => {
            stopwatchSeconds++;
            updateDisplay('+' + formatTime(stopwatchSeconds));

            const overtimeProgress = circleLength + (circleLength * stopwatchSeconds) / totalSeconds;
            path.style.strokeDashoffset = overtimeProgress.toString();
          }, 1000);
        } else {
          updateDisplay(formatTime(timeLeft));
        }
      }, 1000);
    }

    function getQuickFiltersFromUrl(url: string): string[] {
      const urlObj = new URL(url);
      return urlObj.searchParams.getAll('quickFilter').sort();
    }

    const observer = new MutationObserver(() => {
      const currentQuickFilters = getQuickFiltersFromUrl(location.href);
      if (currentQuickFilters.join(',') !== lastQuickFilters.join(',')) {
        lastQuickFilters = currentQuickFilters;
        startTimer();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initialize
    createTimerUI();
    startTimer();
  },
});
