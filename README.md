
# [Simplified Chess](https://pratikshadpai.github.io/chess/)

This is a simplified version of chess, built over a week. I chose this project because I’ve been playing chess daily for the past two years and wanted to combine my skills in HTML, CSS, and vanilla JavaScript with my passion for chess.

---

## ♟️ Rules

- Two players: One plays white (moves first), and the other plays black.
- Each player starts with:
  - 8 pawns
  - 2 rooks
  - 2 bishops
  - 2 knights
  - 1 queen
  - 1 king
- The goal is to **checkmate** the opponent’s king using valid moves.
- The game can also end if:
  - A player resigns.
  - Both players agree to a draw.
- Each piece has a defined set of valid moves that must be followed.

---

## ❌ Out of Scope Mechanics

### **Edge Cases**
- **En passant**: Capturing a pawn that moves two spaces forward.
- **Pawn promotion**: A pawn reaching the last rank promotes to a rook, queen, or knight.
- **Castling**: A king in its initial position can castle with a rook if it hasn't moved.

### **Draws & Stalemates**
| **Draw Type**          | **Cause** |
|------------------------|----------|
| **Stalemate**         | No legal moves, but the king is not in check. |
| **Insufficient Material** | Checkmate is impossible due to lack of pieces. |
| **Threefold Repetition** | The same position occurs three times. |
| **50-Move Rule** | No captures or pawn moves in 50 moves. |
| **Mutual Agreement** | Both players agree to a draw. |
| **Perpetual Check** | The opponent is checked indefinitely. |

---

## ⚙️ How It’s Built

### ♟️ **Board Representation**
- The board is an **8x8 2D array** containing piece objects.

### ♟️ **Game Actions**
- **Draw**: Sends message → `"Draw? (✔️ | ❌)"`
- **Resign**: The opponent wins.
- **New Game**: Resets the board state.

### ♟️ **Piece Representation**
- White pieces: **Uppercase**
- Black pieces: **Lowercase**
- Notation:
  ````
  'R' | 'N' | 'B' | 'Q' | 'K' | 'P' | 'r' | 'n' | 'b' | 'q' | 'k' | 'p'
  ````
  

---

## 🎯 Moves & Validations

### **Move Format**
A move consists of:

Source: {row, column}, Destination: {row, column}


### **Move Validation**
- The move must be valid according to piece rules.
- A player **cannot** move an opponent’s piece.
- A piece **cannot** move to a square occupied by the same color.
- Moves cannot place the player’s king in check.

### **Checkmate & Winning**
- **`isCheck()`**: Determines if the king is under attack.
- If `isCheck()` is `true`, the player must escape the check.
- If no escape is possible and the king has no valid moves, it’s **checkmate**.
- A player can also win if the opponent resigns.

---

## ✨ Features

1. **Responsive UI** with scalable design.
2. **Algebraic Notation**: Moves displayed in standard chess notation (e.g., `e4e5`, `d4e6`).
3. **Valid Moves Highlighting**: Players can view valid moves.
4. **Turn Indicator**: Background changes based on the current turn.
5. **Audio Feedback**: Sounds for moves and game end.

---

## 🚀 Future Enhancements

1. **Pawn Promotion**: Allow players to promote a pawn.
2. **Stalemate Detection**.
3. **Castling**: Implement castling rules and state tracking.
4. **En Passant**: Add pawn capture logic.
5. **Timers**: Support for bullet, 5-minute, and 30-minute games.
6. **Algebraic Notation on Board**.
7. **Captured Pieces Display**: Show captured pieces beside the board.
8. **Undo Move**: Store board history for undo functionality.
9. **Winning Quotes**: Display random grandmaster quotes on victory.
10. **Game History Storage**: Allow players to review past games.
11. **Draw Types**: Implement insufficient material and 50-move draw.
