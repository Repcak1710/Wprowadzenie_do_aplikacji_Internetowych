const game = document.getElementById("game");
const uiLives = document.getElementById("lives");
const uiScore = document.getElementById("score");
const popup = document.getElementById("popup");
const restartButton = document.getElementById("restart-button");
const sadMusic = document.getElementById("sad-music");

let score = 0;
let lives = 3;
let isGameOver = false;
let activeZombies = [];
let occupiedHeights = [];
let zombieInterval;
let difficultyTimer;

function updateLives() {
    const hearts = uiLives.querySelectorAll("img");
    hearts.forEach((heart, index) => {
        heart.src = index < lives ? "images/full_heart.png" : "images/empty_heart.png";
    });
}

function updateScore() {
    uiScore.textContent = `Wynik: ${score}`;
}

function isPositionOccupied(topPosition, zombieHeight) {
    return occupiedHeights.some(range => {
        return (topPosition < range.top + range.height && topPosition + zombieHeight > range.top);
    });
}

function updateOccupiedHeights(topPosition, zombieHeight) {
    occupiedHeights.push({
        top: topPosition,
        height: zombieHeight
    });

    setTimeout(() => {
        occupiedHeights = occupiedHeights.filter(range => range.top !== topPosition);
    }, 2000);
}

function createZombie() {
    if (isGameOver) return;

    const zombie = document.createElement("div");
    zombie.classList.add("zombie");

    const zombieHeightPercentage = 31.2;
    const minTop = 77;
    const maxTop = 100;

    const randomTop = minTop + Math.random() * (maxTop - minTop);

    const scale = 0.8 + ((randomTop - minTop) / (maxTop - minTop)) * 0.4;
    const zombieHeight = zombieHeightPercentage * scale;

    const adjustedTop = randomTop - zombieHeight;

    zombie.style.top = `${adjustedTop}%`;

    zombie.style.transform = `scale(${scale})`;

    zombie.style.right = "-200px";

    const zIndex = Math.floor(randomTop);
    zombie.style.zIndex = zIndex;

    const randomSpeed = 3 + Math.random() * 4;
    zombie.style.animationDuration = `${randomSpeed}s`;
    
    game.appendChild(zombie);

    activeZombies.push(zombie);

    zombie.addEventListener("click", () => {
        if (isGameOver) return;
        score += 20;
        updateScore();
        zombie.remove();
        activeZombies = activeZombies.filter(z => z !== zombie);
    });

    zombie.addEventListener("animationend", () => {
        if (zombie.parentNode) {
            lives--;
            updateLives();
            zombie.remove();
            activeZombies = activeZombies.filter(z => z !== zombie);
            if (lives === 0) {
                endGame();
            }
        }
    });
}

function endGame() {
    isGameOver = true;
    popup.classList.remove("hidden");
    sadMusic.play();
    clearInterval(zombieInterval);
    clearInterval(difficultyTimer);
}

function restartGame() {
    score = 0;
    lives = 3;
    isGameOver = false;
    updateScore();
    updateLives();
    popup.classList.add("hidden");
    sadMusic.pause();
    sadMusic.currentTime = 0;
    document.querySelectorAll(".zombie").forEach(zombie => zombie.remove());
    activeZombies = [];
    clearInterval(zombieInterval);
    clearInterval(difficultyTimer);
    startGame();
}

function increaseDifficulty() {
    if (isGameOver) return;
    
    let newInterval = Math.max(800, 1500 - Math.floor(score / 100) * 100);
    
    clearInterval(zombieInterval);
    zombieInterval = setInterval(createZombie, newInterval);
}

function moveAim(event) {
    const aim = document.getElementById("aim");

    const aimSize = 200;
    
    const xPos = event.clientX - aimSize / 2;
    const yPos = event.clientY - aimSize / 2;

    aim.style.left = `${xPos}px`;
    aim.style.top = `${yPos}px`;
}

game.addEventListener("click", (event) => {
    if (isGameOver) return;

    const clickedZombie = document.elementFromPoint(event.clientX, event.clientY);

    if (clickedZombie && clickedZombie.classList.contains("zombie")) {
        return;
    } else {
        if (activeZombies.length > 0) {
            score -= 5;
            updateScore();
        }
    }
});

function startGame() {
    zombieInterval = setInterval(createZombie, 1500);
    difficultyTimer = setInterval(increaseDifficulty, 5000);
}

game.addEventListener("mousemove", moveAim);
restartButton.addEventListener("click", restartGame);

const aim = document.createElement("div");
aim.id = "aim";
game.appendChild(aim);

aim.style.position = "absolute";
aim.style.zIndex = "1000";

updateLives();
updateScore();
startGame();
