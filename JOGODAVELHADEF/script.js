const cells = document.querySelectorAll('.cell');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const player1Wins = document.getElementById('player1Wins');
const player2Wins = document.getElementById('player2Wins');
const message = document.getElementById('message');
let currentPlayer = 1;
let player1Score = 0;
let player2Score = 0;
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (!cell.textContent && !gameOver) {
      if (currentPlayer === 1) {
        cell.textContent = 'X';
        gameBoard[index] = 'X';
        currentPlayer = 2;
      } else {
        cell.textContent = 'O';
        gameBoard[index] = 'O';
        currentPlayer = 1;
      }
      checkWinner();
    }
  });
});

function checkWinner() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameOver = true;
      message.textContent = `Parabéns, o jogador ${currentPlayer === 1 ? player1Input.value : player2Input.value} venceu!`;
      if (currentPlayer === 1) {
        player1Score++;
        player1Wins.textContent = `Vitórias: ${player1Score}`;
      } else {
        player2Score++;
        player2Wins.textContent = `Vitórias: ${player2Score}`;
      }
      setTimeout(resetGame, 1500);
      return;
    }
  }

  if (!gameBoard.includes('')) {
    gameOver = true;
    message.textContent = 'Empate!';
    setTimeout(resetGame, 1500);
  }
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
  });
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  message.textContent = '';
  gameOver = false;
  currentPlayer = 1;
}

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetScore);

function resetScore() {
  player1Wins.textContent = 'Vitórias: 0';
  player2Wins.textContent = 'Vitórias: 0';
  player1Score = 0;
  player2Score = 0;
}
