function startGame(gameName) {
    const gameContainer = document.getElementById('gameContainer');
    const gameContent = document.getElementById('gameContent');

    gameContent.innerHTML = ''; // Clear previous game content
    gameContainer.classList.remove('hidden');

    if (gameName === 'Click Counter') {
        setupClickCounter();
    } else {
        gameContent.innerHTML = `<h2>${gameName} coming soon!</h2>`;
    }
}

function setupClickCounter() {
    const gameContent = document.getElementById('gameContent');
    let count = 0;

    gameContent.innerHTML = `
        <h2>Click Counter Game</h2>
        <p>Clicks: <span id="clickCount">0</span></p>
        <button onclick="incrementCounter()">Click Me!</button>
    `;
}

function incrementCounter() {
    const clickCount = document.getElementById('clickCount');
    let count = parseInt(clickCount.textContent);
    clickCount.textContent = count + 1;
}

function closeGame() {
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.classList.add('hidden');
}
