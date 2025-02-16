let gameMode = '';
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameStatus = document.getElementById('status');
let player1Name = 'Player 1';
let player2Name = 'Player 2';

function startGame(mode) {
    gameMode = mode;
    document.getElementById('gameModeSelection').style.display = 'none';
    document.getElementById('nameInput').style.display = 'block';

    if (gameMode === 'friend') {
        document.getElementById('player2Input').style.display = 'block';
    } else {
        document.getElementById('player2Input').style.display = 'none';
        document.getElementById('player2Name').value = 'Computer';
    }
}

function startGameWithNames() {
    const player1NameInput = document.getElementById('player1Name');
    const player2NameInput = document.getElementById('player2Name');

    // Basic validation to ensure names are entered
    if (gameMode === 'friend' && (!player1NameInput.value.trim() || !player2NameInput.value.trim())) {
        alert('Please enter both player names.');
        return;
    }

    if (gameMode === 'computer' && !player1NameInput.value.trim()) {
        alert('Please enter your name.');
        return;
    }

    player1Name = player1NameInput.value || 'Player 1';
    player2Name = player2NameInput.value || (gameMode === 'computer' ? 'Computer' : 'Player 2');

    document.getElementById('nameInput').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'block';

    updateStatus();
    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
    document.getElementById('resetButton').style.display = 'block';
}

function updateStatus() {
    const currentPlayerName = currentPlayer === 'X' ? player1Name : player2Name;
    gameStatus.textContent = `${currentPlayerName}'s Turn (${currentPlayer})`;
}

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (gameState[index] !== '' || (gameMode === 'computer' && currentPlayer === 'O')) return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase()); // Add 'x' or 'o' class immediately

    if (checkWinner()) {
        gameStatus.textContent = `${currentPlayer === 'X' ? player1Name : player2Name} Wins!`;
        disableBoard();
        showPartyBooms(); // Trigger party booms after a win
    } else if (gameState.every(cell => cell !== '')) {
        gameStatus.textContent = 'It\'s a Draw!';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();

        if (gameMode === 'computer' && currentPlayer === 'O') {
            setTimeout(computerMove, 500);
        }
    }
}


function computerMove() {
    let emptyCells = gameState.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    gameState[randomIndex] = currentPlayer;
    let cell = document.querySelector(`.cell[data-index='${randomIndex}']`);
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    if (checkWinner()) {
        gameStatus.textContent = 'Computer Wins!';
        disableBoard();
    } else if (gameState.every(cell => cell !== '')) {
        gameStatus.textContent = 'It\'s a Draw!';
    } else {
        currentPlayer = 'X';
        updateStatus();
    }
}

// Create Party Boom Effect Inside the Game Board
function createPartyBoom(x, y) {
    const partyBoom = document.createElement('div');
    partyBoom.className = 'party';
    partyBoom.style.left = `${x}px`;
    partyBoom.style.top = `${y}px`;

    // Ensure the party boom stays inside the game board
    document.getElementById('gameBoard').appendChild(partyBoom);

    // Remove the party boom after 1 second
    setTimeout(() => partyBoom.remove(), 1000);
}

// Show Party Booms
function showPartyBooms() {
    for (let i = 0; i < 30; i++) {
        const x = Math.random() * 120 * 3;  // Ensure x stays within the width of the game board
        const y = Math.random() * 120 * 3;  // Ensure y stays within the height of the game board
        createPartyBoom(x, y);
    }
}


function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            setTimeout(showPartyBooms, 500); // Trigger party booms after a slight delay
            return true;
        }
    }
    return false;
}

function disableBoard() {
    document.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', handleCellClick));
}

// Reset Game: Clear Party Booms and Reset Board
function resetGame() {
    // Clear all existing party booms inside the game board
    const partyBooms = document.querySelectorAll('.party');
    partyBooms.forEach(partyBoom => partyBoom.remove());

    // Reset game state
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });

    document.getElementById('gameBoard').style.display = 'none';
    document.getElementById('gameModeSelection').style.display = 'block';
    document.getElementById('resetButton').style.display = 'none';
    gameStatus.textContent = '';
}