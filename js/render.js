import { getOpponentTurn, isValidMove, makeMove } from "./gameLogic.js";

const board = document.querySelector(".board");
let boardMatrix = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  [".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", "."],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
];
let src;
let dest;
let turn = "W";

board.addEventListener("click", function (event) {
  const square = event.target;
  if (!square.classList.contains("square")) return;
  if (!src) {
    src = { x: parseInt(square.dataset.row), y: parseInt(square.dataset.col) };
  } else {
    dest = { x: parseInt(square.dataset.row), y: parseInt(square.dataset.col) };
    if (isValidMove(boardMatrix, src, dest, turn)) {
      boardMatrix = makeMove(boardMatrix, { src, dest });
      turn = getOpponentTurn(turn);
      src = undefined;
      dest = undefined;
      updateBoard();
    } else {
      src = undefined;
    }
  }
});

function updateBoard() {
  for (const square of board.children) {
    const row = square.dataset.row;
    const col = square.dataset.col;
    const piece = boardMatrix[row][col];
    if (piece === ".") {
      square.innerText = "";
    } else {
      square.innerText = piece;
    }
  }
}

function renderBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const square = document.createElement("div");
      square.classList.add("square", (i + j) % 2 === 0 ? "light" : "dark");
      square.dataset.row = i;
      square.dataset.col = j;
      if (boardMatrix[i][j] !== ".") {
        square.textContent = boardMatrix[i][j];
      }
      board.appendChild(square);
    }
  }
}

renderBoard();
