// IOCE
// Input : board: string[][]
// Output: boolean
// Constraints: board.length == 9, board[i].length == 9,
//              board cells are '1'-'9' or '.'

// Function to check if a sudoku board is valid
function isValidSudoku(board: string[][]): boolean {
    // Arrays of Sets to track digits in rows, columns, and boxes
    const rows: Set<string>[] = Array.from({length: 9}, () => new Set());
    const cols: Set<string>[] = Array.from({length: 9}, () => new Set());
    const boxes: Set<string>[] = Array.from({length: 9}, () => new Set());

    // Traverse each cell in the 9x9 board
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const val = board[r][c];

            // Skip empty cells
            if (val === ".") continue;

            // Calculate which 3x3 box (0-8) this cell belongs to
            const boxIdx = Math.floor(r / 3) * 3 + Math.floor(c / 3);

            // Check for duplicates in row, column, or box
            if (rows[r].has(val) || cols[c].has(val) || boxes[boxIdx].has(val)) {
                return false; // Violation found
            }

            // Insert value into tracking sets for row/col/box
            rows[r].add(val);
            cols[c].add(val);
            boxes[boxIdx].add(val);
        }
    }
    // No violations found, board is valid
    return true;
}

/* --- Example Usage / Test Cases --- */
const board1: string[][] = [
    ["5","3",".",".","7",".",".",".","."],
    ["6",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]
];
console.log(isValidSudoku(board1)); // Output: true

const board2: string[][] = [
    ["8","3",".",".","7",".",".",".","."],
    ["6",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]
];
console.log(isValidSudoku(board2)); // Output: false