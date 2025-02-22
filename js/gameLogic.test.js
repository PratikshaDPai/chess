import { jest, describe, test, expect } from "@jest/globals";
import { getOpponentTurn, getPieceCoordinate, getPieceTurn } from "./gameLogic";

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
