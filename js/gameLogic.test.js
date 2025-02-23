import { jest, describe, test, expect } from "@jest/globals";
import {
  getOpponentTurn,
  getPieceCoordinate,
  getPieceTurn,
  isValidMove,
} from "./gameLogic";

describe("getOpponentTurn() Tests", () => {
  test("Pass B, get W", () => {
    expect(getOpponentTurn("B")).toBe("W");
  });

  test("Pass W, get B", () => {
    expect(getOpponentTurn("W")).toBe("B");
  });
});

describe("getPieceCoordinate() tests", () => {
  test("Pass k in (4,4) get (4,4)", () => {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", "k", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];

    expect(getPieceCoordinate(board, "k")).toStrictEqual({ x: 4, y: 4 });
  });

  test("Pass empty board get undefined", () => {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];

    expect(getPieceCoordinate(board, "k")).toBeUndefined();
  });
});

describe("getPieceTurn() tests", () => {
  test("Pass 'k' get 'B'", () => {
    expect(getPieceTurn("k")).toBe("B");
  });

  test("Pass 'K' get 'W'", () => {
    expect(getPieceTurn("K")).toBe("W");
  });

  test("Pass '.' get undefined", () => {
    expect(getPieceTurn(".")).toBeUndefined();
  });
});

describe("isValidMove() tests", () => {
  test("Move piece to attack same color, get false", () => {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", "b", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", "k", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
    expect(
      isValidMove(
        board,
        getPieceCoordinate(board, "b"),
        getPieceCoordinate(board, "k"),
        "B"
      )
    ).toBe(false);
  });

  test("Move empty src square return false", () => {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", "b", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", "k", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
    expect(
      isValidMove(
        board,
        getPieceCoordinate(board, "."),
        getPieceCoordinate(board, "k"),
        "B"
      )
    ).toBe(false);
  });

  test("Move Black piece when turn is W, return false", () => {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", "b", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", "k", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
    expect(
      isValidMove(
        board,
        getPieceCoordinate(board, "b"),
        getPieceCoordinate(board, "k"),
        "W"
      )
    ).toBe(false);
  });

  test("Move Rook Diagonally, return false", () => {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", "R", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", "k", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
    expect(
      isValidMove(
        board,
        getPieceCoordinate(board, "R"),
        getPieceCoordinate(board, "k"),
        "W"
      )
    ).toBe(false);
  });

  test("Move Bishop vertically, return false", () => {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", "R", ".", "B", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", "k", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
    expect(
      isValidMove(
        board,
        getPieceCoordinate(board, "B"),
        getPieceCoordinate(board, "k"),
        "W"
      )
    ).toBe(false);
  });

  test("Move Rook vertically, return true", () => {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", "R", ".", "B", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", "q", ".", "k", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
    expect(
      isValidMove(
        board,
        getPieceCoordinate(board, "R"),
        getPieceCoordinate(board, "q"),
        "W"
      )
    ).toBe(true);
  });

  test("Move Bishop diagonally, return true", () => {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", "B", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", "q", ".", "k", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
    expect(
      isValidMove(
        board,
        getPieceCoordinate(board, "B"),
        getPieceCoordinate(board, "k"),
        "W"
      )
    ).toBe(true);
  });
  test("Move Queen diagonally, return true", () => {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", "B", ".", "K", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", "q", ".", "k", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
    expect(
      isValidMove(
        board,
        getPieceCoordinate(board, "q"),
        getPieceCoordinate(board, "K"),
        "B"
      )
    ).toBe(true);
  });

  test("Move Queen vertically, return true", () => {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", "B", ".", "K", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", "q", ".", "k", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
    expect(
      isValidMove(
        board,
        getPieceCoordinate(board, "q"),
        getPieceCoordinate(board, "B"),
        "B"
      )
    ).toBe(true);
  });

  test("Move Queen in L shape, return false", () => {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", "B", "K", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", "q", ".", "k", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
    expect(
      isValidMove(
        board,
        getPieceCoordinate(board, "q"),
        getPieceCoordinate(board, "B"),
        "B"
      )
    ).toBe(false);
  });
  //todo: move to empty dest square
});
