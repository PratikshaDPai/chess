import { jest, describe, test, expect } from "@jest/globals";
import { getOpponentTurn, getPieceCoordinate } from "./gameLogic";

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
