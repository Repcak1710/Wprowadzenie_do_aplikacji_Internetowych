let time = 0;
let timer;

const timeDisplay = document.getElementById('timeDisplay');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');

function formatTime(givenSeconds){
    const minutes = Math.floor(givenSeconds/60);
    const seconds = givenSeconds%60;
    return minutes>0 ? `${minutes}min ${seconds}s`: `${seconds}s`;
    
}

function updateTimeDisplay(){
    timeDisplay.textContent = formatTime(time);
}

startButton.addEventListener('click', () => {
    if(!timer){
        timer = setInterval(() => {
            time++;
            updateTimeDisplay();
        }, 1000);
    }
});

stopButton.addEventListener('click', () => {
    clearInterval(timer);
    timer = null;
});

resetButton.addEventListener('click', () => {
    clearInterval(timer);
    timer = null;
    time = 0;
    updateTimeDisplay();
});


updateTimeDisplay();