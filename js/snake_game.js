const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 10 * box, y: 10 * box }];
let direction = "";
let food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let gameRunning = false;
let speed = 200;  // Initial speed
let lastTime = 0;  // Track time for smoother updates
let gameInterval;

document.getElementById("highScore").innerText = highScore;

document.addEventListener("keydown", function (event) {
    if (!gameRunning && event.key === " ") {
        gameRunning = true;
        startGame();
    }
    changeDirection(event);
});

function changeDirection(event) {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    else if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function startGame() {
    document.getElementById("instructionPopup").style.display = "none"; // Close instructions popup
    restartGame(); // Start a fresh game
    requestAnimationFrame(gameLoop); // Start the game loop using requestAnimationFrame for smoother updates
}

function draw() {
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw food (larger size)
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box / 1.2, box / 1.2); // Larger food size

    // Draw snake
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "yellow" : "lime";
        ctx.fillRect(segment.x, segment.y, box, box);
    });

    // Display score
    document.getElementById("score").innerText = score;
}

function gameLoop(timestamp) {
    if (!gameRunning) return; // Stop the game if game is not running

    const deltaTime = timestamp - lastTime;
    if (deltaTime > speed) { // Update only after the interval has passed
        update();
        lastTime = timestamp;
    }

    draw(); // Redraw game
    requestAnimationFrame(gameLoop); // Request the next frame for smooth animation
}

function update() {
    let newHead = { x: snake[0].x, y: snake[0].y };

    if (direction === "UP") newHead.y -= box;
    if (direction === "DOWN") newHead.y += box;
    if (direction === "LEFT") newHead.x -= box;
    if (direction === "RIGHT") newHead.x += box;

    // Check if snake hits the wall or itself
    if (newHead.x < 0 || newHead.y < 0 || newHead.x >= canvas.width || newHead.y >= canvas.height || snakeCollision(newHead)) {
        gameOver();
        return;
    }

    // Check if snake eats food
    if (newHead.x === food.x && newHead.y === food.y) {
        score += 5;
        food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };

        // Update high score
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
        }

        // Increase speed based on score
        increaseSpeed();
    } else {
        snake.pop(); // Remove last segment of snake (tail)
    }

    // Add new head to the snake
    snake.unshift(newHead);
}

function snakeCollision(newHead) {
    for (let i = 1; i < snake.length; i++) {
        if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function increaseSpeed() {
    // Gradually increase the speed based on score, but avoid going too fast
    if (score % 10 === 0 && speed > 50) { // Speed increases every 10 points, and speed won't go below 50ms
        speed -= 10;
    }
}

function gameOver() {
    if (!gameRunning) return; // Prevent game over being triggered multiple times

    gameRunning = false; // Stop the game loop

    // Display Game Over pop-up and high score
    document.getElementById("finalScore").innerText = score;
    document.getElementById("highScorePopup").innerText = highScore;
    document.getElementById("gameOverPopup").style.display = "flex"; // Show game over pop-up
}

function restartGame() {
    // Reset game variables
    snake = [{ x: 10 * box, y: 10 * box }];
    direction = "";
    score = 0;
    gameRunning = true;
    document.getElementById("gameOverPopup").style.display = "none"; // Hide the game over pop-up

    // Start a new game loop
    requestAnimationFrame(gameLoop);
}

// Show instructions popup on first visit
window.onload = function () {
    if (!localStorage.getItem("gamePlayed")) {
        document.getElementById("instructionPopup").style.display = "flex";
        localStorage.setItem("gamePlayed", "true");
    }
};

// Restart the game when Space is pressed after game over
document.addEventListener("keydown", function (event) {
    if (!gameRunning && event.key === " ") {
        restartGame();
    }
});
