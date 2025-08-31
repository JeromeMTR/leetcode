/**
 * Solves the Sudoku board in place using backtracking.
 * @param board 9x9 array representing the Sudoku puzzle. Empty cells are '.'.
 */
function solveSudoku(board: string[][]): void {
    // Helper function to check if placing num at (row, col) is valid
    function isValid(row: number, col: number, num: string): boolean {
        // Check row & col
        for (let k = 0; k < 9; k++) {
            if (board[row][k] === num) return false;
            if (board[k][col] === num) return false;
        }
        // Check 3x3 box
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[boxRow + i][boxCol + j] === num) return false;
            }
        }
        return true;
    }

    // Main backtracking solver
    function backtrack(): boolean {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === '.') {
                    // Try numbers 1-9
                    for (let c = 1; c <= 9; c++) {
                        const char = c.toString();
                        if (isValid(i, j, char)) {
                            board[i][j] = char; // Place number
                            if (backtrack()) return true; // Continue
                            board[i][j] = '.'; // Undo choice (backtrack)
                        }
                    }
                    return false; // No valid number, trigger backtracking
                }
            }
        }
        return true; // No empty cells found, solution complete
    }

    backtrack();
}

// ----- Example IOCE Demonstration Below -----

// Example Input
const board: string[][] = [
 ["5","3",".",".","7",".",".",".","."],
 ["6",".",".","1","9","5",".",".","."],
 [".","9","8",".",".",".",".","6","."],
 ["8",".",".",".","6",".",".",".","3"],
 ["4",".",".","8",".","3",".",".","1"],
 ["7",".",".",".","2",".",".",".","6"],
 [".","6",".",".",".",".","2","8","."],
 [".",".",".","4","1","9",".",".","5"],
 [".",".",".",".","8",".",".","7","9"],
];

solveSudoku(board);

// Output the filled board
console.log("Solved board:");
for (const row of board) {
    console.log(row.join(" "));
}

/* Example Output:
Solved board:
5 3 4 6 7 8 9 1 2
6 7 2 1 9 5 3 4 8
1 9 8 3 4 2 5 6 7
8 5 9 7 6 1 4 2 3
4 2 6 8 5 3 7 9 1
7 1 3 9 2 4 8 5 6
9 6 1 5 3 7 2 8 4
2 8 7 4 1 9 6 3 5
3 4 5 2 8 6 1 7 9
*/