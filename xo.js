let board = ["", "", "", "", "", "", "", "", ""];
let player = "X";
let computer = "O";
let gameActive = true;

let playerScore = 0;
let computerScore = 0;

const boardDiv = document.getElementById("board");

function createBoard() {
    boardDiv.innerHTML = "";
    board.forEach((cell, index) => {
        let div = document.createElement("div");
        div.classList.add("cell");
        div.innerText = cell;
        div.onclick = () => makeMove(index);
        boardDiv.appendChild(div);
    });
}
function playClickSound() {
    document.getElementById("clickSound").play();
}
function makeMove(index) {
    if (board[index] !== "" || !gameActive) return;

    playClickSound();

    board[index] = player;
    createBoard();

    if (checkWin(player)) {
        playerScore++;
        updateScore();
        playWinSound();
        endRound("You win this round!");
        return;
    }

    if (checkTie()) {
        endRound("It's a draw! 🤝");
        playtieSound();
        return;
    }

    computerMove();
}

function computerMove() {
    // 1. Try to win
    let move = findBestMove(computer);
    
    // 2. Block player
    if (move === -1) {
        move = findBestMove(player);
    }

    // 3. Random fallback
    if (move === -1) {
        let empty = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);
        move = empty[Math.floor(Math.random() * empty.length)];
    }

    board[move] = computer;
    createBoard();

    if (checkWin(computer)) {
        computerScore++;
        updateScore();
        playLoseSound();
        endRound("Computer wins this round!");
    }
    if (checkTie()) {
    endRound("It's a draw! 🤝");
    playtieSound();
}
}

function findBestMove(p) {
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            board[i] = p;

            if (checkWin(p)) {
                board[i] = "";
                return i;
            }

            board[i] = "";
        }
    }
    return -1;
}

function checkWin(p) {
    const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    return wins.some(combo =>
        combo.every(i => board[i] === p)
    );
}

function checkTie() {
    return board.every(cell => cell !== "");
}

function endRound(msg) {
    gameActive = false;

    setTimeout(() => {
        if (msg.includes("draw")) {
            showPopup("It's a Draw 🤝");
            playtieSound();
        } 
        else if (playerScore === 2) {
            showPopup("You won the match! 🎉");
        } 
        else if (computerScore === 2) {
            showPopup("Computer won 😢");
        } 
        else {
            resetBoard();
        }
    }, 800);
}

function showPopup(text) {
    document.getElementById("popupText").innerText = text;
    document.getElementById("popup").classList.remove("hidden");
}

function restartMatch() {
    document.getElementById("popup").classList.add("hidden");
    resetMatch();
}

function resetBoard() {
    board = ["","","","","","","","",""];
    gameActive = true;
    createBoard();
}

function resetMatch() {
    playerScore = 0;
    computerScore = 0;
    updateScore();
    resetBoard();
}

function updateScore() {
    document.getElementById("playerScore").innerText = playerScore;
    document.getElementById("computerScore").innerText = computerScore;
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

createBoard();