import {
  getOpponentTurn,
  isCheckmate,
  isValidMove,
  makeMove,
  algebraicNotation,
} from "./gameLogic.js";

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
  const square = event.currentTarget;
  if (!square.classList.contains("square")) return;
  if (!src) {
    src = { x: parseInt(square.dataset.row), y: parseInt(square.dataset.col) };
  } else {
    dest = { x: parseInt(square.dataset.row), y: parseInt(square.dataset.col) };
    if (isValidMove(boardMatrix, src, dest, turn)) {
      boardMatrix = makeMove(boardMatrix, { src, dest });
      console.log(algebraicNotation(src, dest));
      updateBoard();
      if (isCheckmate(boardMatrix, getOpponentTurn(turn))) {
        console.log(`Game Over! ${turn} wins!`);
      }
      turn = getOpponentTurn(turn);
      document.querySelector("body").style.backgroundColor =
        turn === "W" ? "white" : "black";
      src = undefined;
      dest = undefined;
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
    //todo: change to images
    const emojis = {
      ".": "",
      P: "./css/assets/white-pawn.svg",
      B: "./css/assets/white-bishop.svg",
      R: "./css/assets/white-rook.svg",
      N: "./css/assets/white-knight.svg",
      K: "./css/assets/white-king.svg",
      Q: "./css/assets/white-queen.svg",
      p: "./css/assets/black-pawn.svg",
      b: "./css/assets/black-bishop.svg",
      r: "./css/assets/black-rook.svg",
      n: "./css/assets/black-knight.svg",
      k: "./css/assets/black-king.svg",
      q: "./css/assets/black-queen.svg",
    };
    square.innerText = "";
    if (piece !== ".") {
      let image = new Image(30, 30);
      image.src = emojis[piece];
      square.appendChild(image);
    }
  }
}

function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const square = document.createElement("div");
      square.classList.add("square", (i + j) % 2 === 0 ? "light" : "dark");
      square.dataset.row = i;
      square.dataset.col = j;
      board.appendChild(square);
    }
  }
  updateBoard();
}

createBoard();
