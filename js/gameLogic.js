/**
 * @typedef {(Piece|'.')[][]} Board
 */

/**
 * @typedef { 'R' | 'N' | "B" | "Q" | "K" | "P" | 'r' | 'n' | 'b' | 'q' | 'k' | 'p' } Piece
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
 * @param {Board} board
 * @param {Turn} turn
 * @returns {boolean}
 */
function isCheck(board, turn) {
  //for a board state, check that king of current turn is not checked
  //Step 1: find king's position
  const king = turn === "B" ? "k" : "K";
  const kingCoordinate = getPieceCoordinate(board, king);
}

/**
 * Board level function. Needs access to
 * @param {Board} board
 * @param {Piece} piece
 * @returns {Coordinate}
 */
function getPieceCoordinate(board, piece) {
  return { x: 0, y: 0 }; //todo: implement
}
