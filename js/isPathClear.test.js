import { jest, describe, test, expect } from "@jest/globals";
import { isPathClear, getPieceCoordinate } from "./gameLogic";

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

  test("Test path not clear, expect false", () => {
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
        getPieceCoordinate(board, "Q")
      )
    ).toBe(false);
  });
  test("Test Diagonal clear, expect true", () => {
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
        getPieceCoordinate(board, "k")
      )
    ).toBe(true);
  });
  test("Test row clear, expect true", () => {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", "b", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", "k", ".", ".", "."],
      [".", ".", ".", ".", ".", "Q", ".", "."],
      [".", ".", "R", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
    expect(
      isPathClear(
        board,
        getPieceCoordinate(board, "R"),
        getPieceCoordinate(board, "b")
      )
    ).toBe(true);
  });
  test("Test column clear, expect true", () => {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", "k", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", "R", ".", ".", "b", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
    expect(
      isPathClear(
        board,
        getPieceCoordinate(board, "R"),
        getPieceCoordinate(board, "b")
      )
    ).toBe(true);
  });
  test("Test antidiagonal clear, expect true", () => {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", "k", ".", ".", "."],
      [".", ".", ".", ".", ".", "Q", ".", "."],
      [".", ".", "b", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
    expect(
      isPathClear(
        board,
        getPieceCoordinate(board, "b"),
        getPieceCoordinate(board, "k")
      )
    ).toBe(true);
  });
  test("Test invalid path, expect false", () => {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", "b", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", "k", ".", ".", "."],
      [".", ".", ".", ".", ".", "Q", ".", "."],
      [".", ".", ".", "R", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
    expect(
      isPathClear(
        board,
        getPieceCoordinate(board, "b"),
        getPieceCoordinate(board, "R")
      )
    ).toBe(false);
  });
});
