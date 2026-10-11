const images = [
    "images/img1.png",
    "images/img2.png",
    "images/img3.png",
    "images/img4.png",
    "images/img5.png",
    "images/img6.png",
    "images/img7.png",
    "images/img8.png"
];

let cards = [...images, ...images];

let first = null;
let second = null;
let lock = false;

shuffle(cards);

const grid = document.getElementById("grid");

/* 🔊 sounds */
function playClickSound() {
    const s = document.getElementById("clickSound");
    s.currentTime = 0;
    s.play();
}

function playWinSound() {
    const s = document.getElementById("winSound");
    s.currentTime = 0;
    s.play();
}

/* 🧱 board */
function createBoard() {
    grid.innerHTML = "";

    cards.forEach((img, index) => {
        let div = document.createElement("div");
        div.classList.add("card");
        div.dataset.index = index;

        div.innerHTML = `<div class="inner">
            <div class="front"></div>
            <div class="back">
            <img src="${cards[index]}">
        </div>
    </div>
    `;

div.onclick = () => flipCard(div, index);

grid.appendChild(div);
    });
}

function flipCard(card, index) {
    if (lock || card.classList.contains("flip")) return;

    playClickSound();

    card.classList.add("flip");

    if (!first) {
        first = { card, index };
    } else {
        second = { card, index };
        lock = true;

        if (cards[first.index] === cards[second.index]) {
            resetTurn();
            checkWin();
        } else {
            setTimeout(() => {
                first.card.classList.remove("flip");
                second.card.classList.remove("flip");
                resetTurn();
            }, 800);
        }
    }
}

function resetTurn() {
    first = null;
    second = null;
    lock = false;
}

function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
}

function restartGame() {
    playClickSound();

    shuffle(cards);
    createBoard();

    document.getElementById("popup").classList.add("hidden");

    resetTurn();
}

function checkWin() {
    const allFlipped = [...document.querySelectorAll(".card")]
        .every(card => card.classList.contains("flip"));

    if (allFlipped) {
        setTimeout(() => {
            playWinSound();
            showPopup();
        }, 400);
    }
}

/* 🎉 popup */
function showPopup() {
    document.getElementById("popup").classList.remove("hidden");
}

createBoard();