import {
  getOpponentTurn,
  isCheckmate,
  isValidMove,
  makeMove,
  algebraicNotation,
  getValidCoordinates,
} from "./gameLogic.js";

const bmoveSound = new Audio("./css/assets/B-move.mp3");
const wmoveSound = new Audio("./css/assets/W-move.mp3");
const board = document.querySelector(".board");
const body = document.querySelector("body");
const algebraicDisplayElement = document.querySelector(".algebraic-notation");
const playerInfo = document.querySelector(".player-info");
const newGameButton = document.querySelector(".new-game-btn");
const gameStatus = document.querySelector("#game-status");
const resignButton = document.querySelector(".resign-btn");
const drawButton = document.querySelector(".draw-btn");
const drawModal = document.querySelector(".draw-modal");
const closeIcon = document.querySelector(".close");
const drawIcon = document.querySelector(".draw");

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
let winner;

function createNewGame() {
  boardMatrix = [
    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "B", "N", "R"],
  ];
  src = undefined;
  dest = undefined;
  winner = undefined;
  updateTurn("W");
  updateBoard();
  algebraicDisplayElement.innerText = "";
  gameStatus.innerText = "Game in Progress";
}

function updateTurn(newTurn) {
  turn = newTurn;
  playerInfo.innerText =
    turn === "W" ? "Current Player: White" : "Current Player: Black";
  body.style.backgroundColor = turn === "W" ? "#e3bd94" : "#633b21";
}

function updateWinner(newWinner) {
  winner = newWinner;
  gameStatus.innerText = winner === "W" ? "White wins!" : "Black wins!";
}

resignButton.addEventListener("click", function () {
  updateWinner(getOpponentTurn(turn));
});

newGameButton.addEventListener("click", function (event) {
  createNewGame();
});

drawButton.addEventListener("click", (event) => {
  drawModal.style.display = "block";
});

closeIcon.addEventListener("click", function (event) {
  drawModal.style.display = "none";
});

drawIcon.addEventListener("click", function (event) {
  drawModal.style.display = "none"; //todo: add draw logic
});

board.addEventListener("click", function (event) {
  if (winner) {
    return;
  }

  const square = event.target.closest(".square");
  if (!square.classList.contains("square")) return;
  if (!src) {
    src = { x: parseInt(square.dataset.row), y: parseInt(square.dataset.col) };
    getValidCoordinates(boardMatrix, src, turn).forEach(({ x, y }) => {
      const targetSquare = document.querySelector(
        `[data-row="${x}"][data-col="${y}"]`
      );
      if (targetSquare) {
        targetSquare.classList.add("valid-move");
      }
    });
  } else {
    dest = { x: parseInt(square.dataset.row), y: parseInt(square.dataset.col) };
    for (const child of board.children) {
      child.classList.remove("valid-move");
    }
    if (isValidMove(boardMatrix, src, dest, turn)) {
      boardMatrix = makeMove(boardMatrix, { src, dest });
      if (turn === "B") {
        bmoveSound.load();
        bmoveSound.play();
      } else {
        wmoveSound.load();
        wmoveSound.play();
      }
      const notation = document.createElement("p");
      notation.innerText = `${turn}: ${algebraicNotation(src, dest)}`;
      algebraicDisplayElement.appendChild(notation);
      updateBoard();
      if (isCheckmate(boardMatrix, getOpponentTurn(turn))) {
        updateWinner(turn);
      }
      updateTurn(getOpponentTurn(turn));
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
      P: "./css/assets/white-pawn-filled.svg",
      B: "./css/assets/white-bishop-filled.svg",
      R: "./css/assets/white-rook-filled.svg",
      N: "./css/assets/white-knight-filled.svg",
      K: "./css/assets/white-king-filled.svg",
      Q: "./css/assets/white-queen-filled.svg",
      p: "./css/assets/black-pawn.svg",
      b: "./css/assets/black-bishop.svg",
      r: "./css/assets/black-rook.svg",
      n: "./css/assets/black-knight.svg",
      k: "./css/assets/black-king.svg",
      q: "./css/assets/black-queen.svg",
    };
    square.innerText = "";
    if (piece !== ".") {
      let image = new Image(35, 35);
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
createNewGame();
