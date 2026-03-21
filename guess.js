let secretNumber = Math.floor(Math.random() * 100) + 1;
let currentInput = "";
let history = [];

// sounds
function playClickSound() {
    const sound = document.getElementById("clickSound");
    sound.currentTime = 0;
    sound.play();
}

function playWinSound() {
    const sound = document.getElementById("winSound");
    sound.currentTime = 0;
    sound.play();
}

// keypad
const keypad = document.getElementById("keypad");

for (let i = 0; i <= 9; i++) {
    let btn = document.createElement("button");
    btn.innerText = i;

    btn.onclick = () => {
        playClickSound();
        addNumber(i);
    };

    keypad.appendChild(btn);
}

function addNumber(num) {
    if (currentInput.length >= 3) return;
    currentInput += num;
    updateInput();
}

function updateInput() {
    document.getElementById("inputBox").innerText = "Your Guess: " + currentInput;
}

function clearInput() {
    playClickSound();
    currentInput = "";
    updateInput();
}

function submitGuess() {
    let guess = Number(currentInput);

    if (!guess || guess < 1 || guess > 100) {
        return;
    }

    playClickSound();

    let message = "";

    if (guess === secretNumber) {
        document.getElementById("display").innerText = secretNumber;
        playWinSound();

        message = `✔ ${guess}`;
    } 
    else if (guess > secretNumber) {
        message = `⬇ ${guess}`;
    } 
    else {
        message = `⬆ ${guess}`;
    }

    history.unshift(message);
    updateHistory();

    currentInput = "";
    updateInput();
}
document.getElementById("display").innerText = "?";

function updateHistory() {
    const historyDiv = document.getElementById("history");

    historyDiv.innerHTML = history
        .map(item => `<div>${item}</div>`)
        .join("");
}