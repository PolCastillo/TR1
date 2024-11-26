const workTime = 25 * 60; // 25 minutes in seconds
const shortBreak = 5 * 60; // 5 minutes in seconds
const cycles = 4; // 4 cycles before a long break
const longBreak = 30 * 60; // 30 minutes in seconds

let currentTime = workTime;
let isPaused = true;
let cycleCount = 0;
let isWorkPeriod = true;
let timerInterval;

// Prepare the audio
const alertSound = new Audio("./sounds/alert-sound.mp3"); // Path to your sound file

const timeDisplay = document.getElementById('time-display');
const statusDisplay = document.getElementById('status');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateTimer() {
    timeDisplay.textContent = formatTime(currentTime);
}

function playSound() {
    alertSound.play(); // Play the sound
}

function switchCycle() {
    if (isWorkPeriod) {
        currentTime = shortBreak;
        statusDisplay.textContent = 'Descanso Corto';
    } else {
        cycleCount++;
        if (cycleCount >= cycles) {
            currentTime = longBreak;
            statusDisplay.textContent = 'Descanso Largo';
            cycleCount = 0; // Reset cycle count after a long break
        } else {
            currentTime = workTime;
            statusDisplay.textContent = 'Trabajando';
        }
    }
    isWorkPeriod = !isWorkPeriod; // Toggle between work and break periods
    updateTimer();
    playSound(); // Play sound when switching cycle
}

function startTimer() {
    if (!isPaused) return;
    isPaused = false;
    timerInterval = setInterval(() => {
        if (currentTime <= 0) {
            playSound(); // Play sound when timer ends
            switchCycle();
        } else {
            currentTime--;
            updateTimer();
        }
    }, 1000);
}

function pauseTimer() {
    if (isPaused) return;
    isPaused = true;
    clearInterval(timerInterval);
}

function resetTimer() {
    pauseTimer();
    currentTime = workTime;
    cycleCount = 0;
    isWorkPeriod = true;
    statusDisplay.textContent = 'Trabajando';
    updateTimer();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// Initialize the timer display
updateTimer();
