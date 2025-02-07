const board = document.getElementById("board");
const message = document.getElementById("message");
let currentPlayer = "X";
let cells = Array(9).fill(null);

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            message.textContent = `${cells[a]} wins!`;
            board.querySelectorAll(".cell").forEach(cell => cell.classList.add("taken"));
            return true;
        }
    }
    if (!cells.includes(null)) {
        message.textContent = "It's a draw!";
        return true;
    }
    return false;
}

function handleClick(index, cell) {
    if (!cells[index]) {
        cells[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add("taken");
        if (!checkWinner()) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
}

function resetGame() {
    cells.fill(null);
    board.innerHTML = "";
    message.textContent = "";
    currentPlayer = "X";
    createBoard();
}

function createBoard() {
    board.innerHTML = "";
    cells.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", () => handleClick(index, cell));
        board.appendChild(cell);
    });
}

createBoard();
