import { jest, describe, test, expect } from "@jest/globals";
import {
  getOpponentTurn,
  getPieceCoordinate,
  getPieceTurn,
  isPathClear,
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
  //todo: move to empty dest square
});

describe("isPathClear() Tests", () => {
  test("Pass src===dest, expect true", () => {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", "b", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", "k", ".", ".", "."],
      [".", ".", ".", ".", ".", "Q", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
    expect(
      isPathClear(
        board,
        getPieceCoordinate(board, "b"),
        getPieceCoordinate(board, "b")
      )
    ).toBe(true);
  });
  test("if path not clear, expect false", () => {});
  test("if path clear, expect true", () => {});
});
