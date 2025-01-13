let timeLeft = 0;
let timerId = null;
let isPaused = true;

const startPauseButton = document.getElementById('startPauseButton');
const timeSlider = document.getElementById('timeSlider');

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Timer functionality
function updateTimeFromSlider() {
    const minutes = parseInt(timeSlider.value);
    timeLeft = minutes * 60;
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = '00';
}

function toggleTimer() {
    if (isPaused) {
        if (timeLeft === 0) {
            timeLeft = parseInt(timeSlider.value) * 60;
        }
        startTimer();
        startPauseButton.textContent = 'Pause';
        startPauseButton.classList.add('active');
    } else {
        pauseTimer();
        startPauseButton.textContent = 'Start';
        startPauseButton.classList.remove('active');
    }
    isPaused = !isPaused;
}

function startTimer() {
    if (timeLeft > 0) {
        timerId = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                startPauseButton.textContent = 'Start';
                startPauseButton.classList.remove('active');
                isPaused = true;
                alert('Meditation session completed!');
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = 0;
    isPaused = true;
    startPauseButton.textContent = 'Start';
    startPauseButton.classList.remove('active');
    timeSlider.value = 5;
    updateTimerDisplay();
}

// Notes functionality
function saveNotes() {
    const notes = document.getElementById('meditationNotes').value;
    const date = new Date().toLocaleString();
    const savedNotes = JSON.parse(localStorage.getItem('meditationNotes') || '[]');
    savedNotes.push({ date, notes });
    localStorage.setItem('meditationNotes', JSON.stringify(savedNotes));
    alert('Notes saved successfully!');
}

// Event Listeners
startPauseButton.addEventListener('click', toggleTimer);
timeSlider.addEventListener('input', updateTimeFromSlider);
document.getElementById('resetTimer').addEventListener('click', resetTimer); 

// Also, let's initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateTimeFromSlider(); // Set initial time based on slider value
}); 