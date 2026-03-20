let playerScore = 0;
let computerScore = 0;
let timeLeft = 7;
let timer;

startTimer();

function startTimer() {
    clearInterval(timer);

    timeLeft = 7;
    document.getElementById("timer").innerText = "Time left: " + timeLeft + "s";

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = "Time left: " + timeLeft + "s";

        if (timeLeft === 0) {
            clearInterval(timer);
            document.getElementById("status").innerText = "Too slow! Game reset 😤";

            resetGame(); // FULL reset if no click
        }
    }, 1000);
}

function play(userChoice) {
    clearInterval(timer); // stop timer when user clicks

    const choices = ["rock", "paper", "scissors"];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    let result = "";

    if (userChoice === computerChoice) {
        result = "It's a tie!";
        playtieSound();
    } else if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissors" && computerChoice === "paper")
    ) {
        result = "You win!";
        playerScore++;
        playWinSound();
    } else {
        result = "You lose!";
        computerScore++;
        playLoseSound();
    }

    document.getElementById("playerScore").innerText = playerScore;
    document.getElementById("computerScore").innerText = computerScore;

    document.getElementById("status").innerText =
        `You: ${userChoice} | Computer: ${computerChoice} → ${result}`;

    // restart timer for next round
    startTimer();
}

function playWinSound() {
    document.getElementById("winSound").play();
}

function playLoseSound() {
    document.getElementById("loseSound").play();
}
function playtieSound() {
    document.getElementById("tieSound").play();
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;

    document.getElementById("playerScore").innerText = 0;
    document.getElementById("computerScore").innerText = 0;
    document.getElementById("status").innerText = "Choose your weapon!";

    startTimer();
}