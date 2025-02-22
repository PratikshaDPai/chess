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
function isValidMove(board, src, dest, turn) {
  const srcPiece = board[src.x][src.y];
  const destPiece = board[dest.x][dest.y];
  //check if piece color matches turn
  //'B' turn=lowercase pieces, 'W' turn= uppercase
  //also test if dest square occupied by same color piece
  if (getPieceTurn(srcPiece) !== turn || getPieceTurn(destPiece) === turn) {
    return false;
  }

  return true; //todo: implement
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
