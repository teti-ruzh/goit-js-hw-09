

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

stopButton.disabled = true;
let timerId = null;

startButton.addEventListener('click', onStartClick);
stopButton.addEventListener('click', onStopClick);


function onStartClick(event) {
timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    startButton.disabled = true;
    stopButton.disabled = false;
}, 1000)
};

function onStopClick() {
    clearInterval(timerId);
    startButton.disabled = false;
    stopButton.disabled = true;
}


