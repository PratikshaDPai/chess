/**
 * @typedef {BoardSquare[][]} Board
 */

/**
 * @typedef { 'R' | 'N' | "B" | "Q" | "K" | "P" | 'r' | 'n' | 'b' | 'q' | 'k' | 'p' } Piece
 */

/**
 * @typedef {Piece|'.'} BoardSquare
 */

/**
 * @typedef {'B'|'W'} Turn
 */

/**
 *
 * @typedef Coordinate
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef Move
 * @property {Coordinate} src
 * @property {Coordinate} dest
 */

/**
 * Board level function. Needs access to
 * - Find king of current turn, check for
 * - For each opponent piece, is king’s square a valid move()?
 * - board is assumed to be in a valid state, passing an invalid board is out of scope
 * @param {Board} board
 * @param {Turn} turn
 * @returns {boolean}
 */
function isCheck(board, turn) {
  //for a board state, check that king of current turn is not checked
  //Step 1: find king's position
  const opponentTurn = getOpponentTurn(turn);
  const king = turn === "B" ? "k" : "K";
  const kingCoordinate = getPieceCoordinate(board, king);
  //Step 2: If not king, check if any opponent(non-king) piece has isValidMove() to king coordinate
  //Iterate over board, find pieces opp of turn, check validmove(piece coordinate, king coordinate,board)
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board.length; y++) {
      const piece = board[x][y];
      if (piece === ".") continue;

      // if turn= 'W' find lowercase non-king piece, if turn="B" find uppercase non-king piece
      const nonKingPieces = {
        W: ["R", "N", "B", "Q", "P"],
        B: ["r", "n", "b", "q", "p"],
      };
      if (
        nonKingPieces[opponentTurn].includes(piece) &&
        isValidMove(board, { x, y }, kingCoordinate, opponentTurn)
      ) {
        //check if x,y to kingCoordinates is a validMove
        return true;
      }
    }
  }

  return false;
}

/**
 * @param {Turn} turn
 * @returns {Turn}
 */
export function getOpponentTurn(turn) {
  return turn === "B" ? "W" : "B";
}

/**
 * @param {BoardSquare} piece
 * @returns {Turn}
 */
export function getPieceTurn(piece) {
  if (piece === ".") return undefined;
  if (piece === piece.toLowerCase()) return "B";
  return "W";
}
/**
 *
 * @param {Board} board
 * @param {Coordinate} src
 * @param {Coordinate} dest
 * @param {Turn} turn
 * @returns {boolean}
 */
export function isValidMove(board, src, dest, turn) {
  const srcPiece = board[src.x][src.y];
  const destPiece = board[dest.x][dest.y];
  //check if piece color matches turn
  //'B' turn=lowercase pieces, 'W' turn= uppercase
  //also test if dest square occupied by same color piece
  if (getPieceTurn(srcPiece) !== turn || getPieceTurn(destPiece) === turn) {
    return false;
  }

  switch (srcPiece.toLowerCase()) {
    case "p": {
      break;
    }
    case "r": {
      return (dx === 0 || dy === 0) && isPathClear(board, src, dest);
    }
    case "b": {
      return Math.abs(dx) === Math.abs(dy) && isPathClear(board, src, dest);
    }
    case "q": {
      return (
        (dx === 0 || dy === 0 || Math.abs(dx) === Math.abs(dy)) &&
        isPathClear(board, src, dest)
      );
    }
    case "k": {
      return Math.abs(dx) <= 1 && Math.abs(dy) <= 1;
    }
    case "n": {
      return (
        (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
        (Math.abs(dx) === 1 && Math.abs(dy) === 2)
      );
    }
  }

  return false;
}

/**
 * Check if path is clear from Source Square to Target
 * If path is not valid, returns false
 * @param {Board} board
 * @param {Coordinate} src
 * @param {Coordinate} dest
 * @returns {boolean}
 */
export function isPathClear(board, src, dest) {
  //if src=dest return true
  if (src.x === dest.x && src.y === dest.y) return true;
  const xdisp = dest.x - src.x;
  const ydisp = dest.y - src.y;
  //goal to move x to x+xdisp and y to y+ydisp in increments of dx,dy
  //get direction vector
  const dx = xdisp !== 0 ? xdisp / Math.abs(xdisp) : 0;
  const dy = ydisp !== 0 ? ydisp / Math.abs(ydisp) : 0;
  //possible moves: dx === 0 || dy === 0 || Math.abs(dx) === Math.abs(dy)
  if (dx !== 0 && dy !== 0 && Math.abs(dx) !== Math.abs(dy)) {
    return false;
  }
  let x = src.x + dx;
  let y = src.y + dy;
  while (x !== dest.x || y !== dest.y) {
    if (board[x][y] !== ".") return false;
    x += dx;
    y += dy;
  }
  return true;
}

/**
 * Board level function. Needs access to
 * @param {Board} board
 * @param {Piece} piece
 * @returns {Coordinate|undefined}
 */
export function getPieceCoordinate(board, piece) {
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board.length; y++) {
      if (board[x][y] === piece) {
        return { x, y };
      }
    }
  }
  return undefined;
}
