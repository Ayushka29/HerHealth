const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 480;
canvas.height = 640;

const bubbleRadius = 20;
const colors = ["red", "blue", "green", "yellow", "purple"];
let bubbles = [];
let shooterBubble = { x: canvas.width / 2, y: canvas.height - bubbleRadius * 2, color: randomColor() };
let score = 0;
let isShooting = false;
let shootVelocity = { x: 0, y: -5 };

// Create bubble grid
function createBubbleGrid(rows = 6, cols = 8) {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = col * (bubbleRadius * 2) + bubbleRadius;
            const y = row * (bubbleRadius * 2) + bubbleRadius;
            bubbles.push({ x, y, color: randomColor(), popped: false });
        }
    }
}

// Generate random color
function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

// Draw bubble
function drawBubble(x, y, color) {
    ctx.beginPath();
    ctx.arc(x, y, bubbleRadius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
}

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bubbles
    for (let bubble of bubbles) {
        if (!bubble.popped) {
            drawBubble(bubble.x, bubble.y, bubble.color);
        }
    }

    // Draw shooter bubble
    drawBubble(shooterBubble.x, shooterBubble.y, shooterBubble.color);

    // Update score
    document.getElementById("score").innerText = score;
}

// Shoot bubble
function shootBubble() {
    if (!isShooting) {
        isShooting = true;

        const shootInterval = setInterval(() => {
            shooterBubble.y += shootVelocity.y;

            if (shooterBubble.y <= bubbleRadius) {
                placeBubble();
                clearInterval(shootInterval);
                isShooting = false;
            }

            for (let bubble of bubbles) {
                if (!bubble.popped && checkCollision(shooterBubble, bubble)) {
                    placeBubble();
                    clearInterval(shootInterval);
                    isShooting = false;
                    break;
                }
            }
        }, 20);
    }
}

// Check collision
function checkCollision(b1, b2) {
    const distance = Math.sqrt((b1.x - b2.x) ** 2 + (b1.y - b2.y) ** 2);
    return distance < bubbleRadius * 2;
}

// Place bubble on grid
function placeBubble() {
    bubbles.push({ x: shooterBubble.x, y: shooterBubble.y, color: shooterBubble.color, popped: false });
    checkMatches();
    shooterBubble = { x: canvas.width / 2, y: canvas.height - bubbleRadius * 2, color: randomColor() };
}

// Check for matching bubbles
function checkMatches() {
    for (let bubble of bubbles) {
        if (!bubble.popped) {
            const sameColorBubbles = bubbles.filter(b => !b.popped && b.color === bubble.color && checkCollision(bubble, b));

            if (sameColorBubbles.length >= 3) {
                sameColorBubbles.forEach(b => (b.popped = true));
                score += sameColorBubbles.length * 10;
            }
        }
    }
}

// Mouse movement for aiming
canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    shootVelocity.x = (mouseX - shooterBubble.x) / 15;
});

// Click to shoot
canvas.addEventListener("click", () => {
    if (!isShooting) {
        shootBubble();
    }
});

// Start game
createBubbleGrid();
setInterval(draw, 30);
