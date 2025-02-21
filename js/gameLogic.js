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
 * 1. Turn (W or B)
 * 2. Board matrix
 * - Find king of current turn, check for
 * - For each opponent piece, is king’s square a valid move()?
 * @param {Move} move
 * @param {Board} board
 * @param {Turn} turn
 */
let isCheck = (move, board, turn) => {};
