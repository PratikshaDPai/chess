import { jest, describe, test, expect } from "@jest/globals";
import {
  getOpponentTurn,
  getPieceCoordinate,
  getPieceTurn,
  isCheckmate,
  isValidMove,
  algebraicNotation,
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

  test("Move piece to empty destination square, return true", () => {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", "q", ".", "P", ".", ".", "."],
      [".", ".", ".", ".", "k", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
    expect(
      isValidMove(
        board,
        getPieceCoordinate(board, "q"),
        getPieceCoordinate(board, "."),
        "B"
      )
    ).toBe(true);
  });

  test("Move Pawn up by one square, return true", () => {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", "P", ".", ".", ".", "."], // Pawn at (6,3)
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
    const src = getPieceCoordinate(board, "P");
    const dest = { x: 5, y: 3 }; // Move up one row
    expect(isValidMove(board, src, dest, "W")).toBe(true);
  });

  test("Move Pawn up by 3 squares, return false", () => {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", "P", ".", ".", ".", "."], // Pawn at (6,3)
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
    const src = getPieceCoordinate(board, "P");
    const dest = { x: 3, y: 3 }; // Attempt to move up 3
    expect(isValidMove(board, src, dest, "W")).toBe(false);
  });

  test("Move Pawn diagonal by 1 position with enemy piece, return true", () => {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", "p", ".", ".", ".", ".", "."], // Black pawn at (5,2)
      [".", ".", ".", "P", ".", ".", ".", "."], // White pawn at (6,3)
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
    expect(
      isValidMove(
        board,
        getPieceCoordinate(board, "P"),
        getPieceCoordinate(board, "p"),
        "W"
      )
    ).toBe(true);
  });

  test("Move Pawn diagonal by 1 position with empty square, return false", () => {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", "P", ".", ".", ".", "."], // Pawn at (6,3)
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
    const src = getPieceCoordinate(board, "P");
    const dest = { x: 5, y: 2 };
    expect(isValidMove(board, src, dest, "W")).toBe(false);
  });

  test("Move Pawn backwards, return false", () => {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", "P", ".", ".", ".", "."], // Pawn at (6,3)
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
    const src = getPieceCoordinate(board, "P");
    const dest = { x: 7, y: 3 }; // Move down
    expect(isValidMove(board, src, dest, "W")).toBe(false);
  });

  test("Move Pawn up by 2 positions when in middle of board, return false", () => {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", "P", ".", ".", ".", "."], // Pawn at (4,3)
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
    const src = getPieceCoordinate(board, "P");
    const dest = { x: 2, y: 3 };
    expect(isValidMove(board, src, dest, "W")).toBe(false);
  });

  test("Move Pawn up by 2 positions when in start position with blocked path, return false", () => {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", "p", ".", ".", ".", "."], // Black pawn blocking (5,3)
      [".", ".", ".", "P", ".", ".", ".", "."], // White pawn at (6,3)
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
    const src = getPieceCoordinate(board, "P");
    // White wants to move from row 6 -> row 4, but row 5 is blocked
    const dest = { x: 4, y: 3 };
    expect(isValidMove(board, src, dest, "W")).toBe(false);
  });

  test("Move Pawn up by 2 positions when in start position with clear path, return true", () => {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", "P", ".", ".", ".", "."], // Pawn at (6,3)
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
    const src = getPieceCoordinate(board, "P");
    const dest = { x: 4, y: 3 };
    expect(isValidMove(board, src, dest, "W")).toBe(true);
  });

  test("Move a white Pawn such that dx = -2 and dy = 7", () => {
    const board = [
      [".", ".", ".", ".", "k", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      ["P", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", "K", ".", ".", "."],
    ];
    const src = getPieceCoordinate(board, "P");
    expect(isValidMove(board, src, { x: src.x - 2, y: src.y + 7 }, "W")).toBe(
      false
    );
  });

  test("Move a black Pawn such that dx = 2 and dy = 7", () => {
    const board = [
      [".", ".", ".", ".", "k", ".", ".", "."],
      ["p", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", "K", ".", ".", "."],
    ];
    const src = getPieceCoordinate(board, "p");
    expect(isValidMove(board, src, { x: src.x + 2, y: src.y + 7 }, "B")).toBe(
      false
    );
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

  test("Move Bishop to the next diagonal, return false", () => {
    const board = [
      [".", ".", ".", ".", "k", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", "B", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", "K", ".", ".", "."],
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
      [".", ".", ".", ".", ".", "K", ".", "."],
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
      [".", ".", "q", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", "k", ".", ".", "."],
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

  test("Move Knight in L shape, return true", () => {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", "N", "K", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", "k", ".", ".", "."],
      [".", ".", "q", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
    expect(
      isValidMove(
        board,
        getPieceCoordinate(board, "N"),
        getPieceCoordinate(board, "k"),
        "W"
      )
    ).toBe(true);
  });

  test("Move Knight in reverse L shape, return true", () => {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", "k", "K", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", "Q", ".", "N", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
    expect(
      isValidMove(
        board,
        getPieceCoordinate(board, "N"),
        getPieceCoordinate(board, "k"),
        "W"
      )
    ).toBe(true);
  });

  test("Move Knight diagonally, return false", () => {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", "N", ".", ".", "."],
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
        getPieceCoordinate(board, "N"),
        getPieceCoordinate(board, "q"),
        "W"
      )
    ).toBe(false);
  });

  test("Move king by 2 positions, return false", () => {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", "N", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", "q", ".", "k", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", "K", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
    expect(
      isValidMove(
        board,
        getPieceCoordinate(board, "k"),
        getPieceCoordinate(board, "N"),
        "B"
      )
    ).toBe(false);
  });

  test("Move king up by one position, return true", () => {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", "P", ".", ".", "."],
      [".", ".", "q", ".", "k", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", "K", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
    expect(
      isValidMove(
        board,
        getPieceCoordinate(board, "k"),
        getPieceCoordinate(board, "P"),
        "B"
      )
    ).toBe(true);
  });

  test("Move king into another kings area, return false", () => {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", "K", ".", ".", "."],
      [".", ".", "q", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", "k", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
    expect(
      isValidMove(board, getPieceCoordinate(board, "k"), { x: 3, y: 4 }, "B")
    ).toBe(false);
    expect(
      isValidMove(board, getPieceCoordinate(board, "K"), { x: 3, y: 4 }, "W")
    ).toBe(false);
  });
});

describe("isCheckmate() tests", () => {
  test("temp prod bug :(", () => {
    const board = [
      ["r", "n", ".", ".", "k", ".", ".", "r"],
      ["p", ".", ".", ".", ".", "p", ".", "p"],
      [".", ".", "p", ".", ".", "p", ".", "."],
      [".", ".", ".", ".", "q", ".", ".", "."],
      [".", "b", "B", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      ["P", "P", "P", "P", "K", "P", "P", "P"],
      ["R", ".", "B", ".", ".", "R", ".", "."],
    ];
    expect(isCheckmate(board, "B")).toBe(false);
    expect(isCheckmate(board, "W")).toBe(false);
  });
});

describe("algebraicNotation() tests", () => {
  test("Test invalid input, return undefined", () => {
    expect(algebraicNotation({ x: -1, y: -1 }, { x: 4, y: 4 })).toBeUndefined;
  });
  test("Test {4,4} to {4,5} returns e4  f4", () => {
    expect(algebraicNotation({ x: 4, y: 4 }, { x: 4, y: 5 })).toBe("e4    f4");
  });
  test("Test {4,4} to {4,4} returns e4  e4 (same dest as src)", () => {
    expect(algebraicNotation({ x: 4, y: 4 }, { x: 4, y: 4 })).toBe("e4    e4");
  });
});
