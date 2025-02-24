import {
  getOpponentTurn,
  isCheckmate,
  isValidMove,
  makeMove,
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
  const square = event.target;
  if (!square.classList.contains("square")) return;
  if (!src) {
    src = { x: parseInt(square.dataset.row), y: parseInt(square.dataset.col) };
  } else {
    dest = { x: parseInt(square.dataset.row), y: parseInt(square.dataset.col) };
    algebraicNotation(src, dest);
    if (isValidMove(boardMatrix, src, dest, turn)) {
      boardMatrix = makeMove(boardMatrix, { src, dest });
      updateBoard();
      if (isCheckmate(boardMatrix, getOpponentTurn(turn))) {
        alert(`Game Over! ${turn} wins!`);
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

/**
 *
 * @param {Coordinate} src
 * @param {Coordinate} dest
 * @returns {String}
 */
function algebraicNotation(src, dest) {
  const rank = { 0: 8, 1: 7, 2: 6, 3: 5, 4: 4, 5: 3, 6: 2, 7: 1 };
  const file = {
    0: "a",
    1: "b",
    2: "c",
    3: "d",
    4: "e",
    5: "f",
    6: "g",
    7: "h",
  };
  console.log(`${file[src.y]}${rank[src.x]}    ${file[dest.y]}${rank[dest.x]}`);
}

function updateBoard() {
  for (const square of board.children) {
    const row = square.dataset.row;
    const col = square.dataset.col;
    const piece = boardMatrix[row][col];
    //todo: change to images
    const emojis = {
      ".": "",
      P: "♙",
      B: "♗",
      R: "♖",
      N: "♘",
      K: "♔",
      Q: "♕",
      p: "♟️",
      b: "♝",
      r: "♜",
      n: "♞",
      k: "♚",
      q: "♛",
    };
    square.innerText = emojis[piece];
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
