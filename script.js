// DOM elements
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startButton = document.getElementById('startBtn');
const pauseButton = document.getElementById('pauseBtn');
const resetButton = document.getElementById('resetBtn');
const lapButton = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

// Variables for time tracking
let startTime;
let elapsedTime = 0;
let timeInterval;
let isRunning = false;
let lapCount = 1;

// Format time to display with leading zeros
function formatTime(time) {
    return time.toString().padStart(2, '0');
}

// Update display
function updateDisplay() {
    const currentTime = Date.now() - startTime + elapsedTime;
    const minutes = Math.floor(currentTime / 60000);
    const seconds = Math.floor((currentTime % 60000) / 1000);
    const milliseconds = Math.floor((currentTime % 1000) / 10);

    minutesDisplay.textContent = formatTime(minutes);
    secondsDisplay.textContent = formatTime(seconds);
    millisecondsDisplay.textContent = formatTime(milliseconds);
}

// Start the stopwatch
function start() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now();
        timeInterval = setInterval(updateDisplay, 10);
        startButton.style.display = 'none';
        pauseButton.style.display = 'inline-block';
    }
}

// Pause the stopwatch
function pause() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timeInterval);
        elapsedTime += Date.now() - startTime;
        startButton.style.display = 'inline-block';
        pauseButton.style.display = 'none';
    }
}

// Reset the stopwatch
function reset() {
    isRunning = false;
    clearInterval(timeInterval);
    elapsedTime = 0;
    startTime = Date.now();
    updateDisplay();
    lapsList.innerHTML = '';
    lapCount = 1;
    startButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
    millisecondsDisplay.textContent = '00';
}

// Record lap time
function lap() {
    if (isRunning) {
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${lapCount}: ${minutesDisplay.textContent}:${secondsDisplay.textContent}:${millisecondsDisplay.textContent}`;
        lapsList.insertBefore(lapTime, lapsList.firstChild);
        lapCount++;
    }
}

// Event listeners
startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

// Initial setup
pauseButton.style.display = 'none'; 