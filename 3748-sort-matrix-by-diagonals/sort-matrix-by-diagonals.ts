/**
 * Input:
 *   grid: n x n integer matrix
 * Output:
 *   grid with bottom-left diagonals sorted non-increasingly and 
 *   top-right diagonals sorted non-decreasingly.
 * Constraints:
 *   1 <= n <= 10
 *   -10^5 <= grid[i][j] <= 10^5
 * 
 * Example:
 *   Input:  grid = [[1,7,3],[9,8,2],[4,5,6]]
 *   Output:        [[8,2,3],[9,6,7],[4,5,1]]
 */

function diagonalSort(grid: number[][]): number[][] {
    const n = grid.length;

    // Helper to extract a diagonal starting at (startRow, startCol)
    function extractDiagonal(startRow: number, startCol: number): number[] {
        const diagonal = [];
        let r = startRow, c = startCol;
        while (r < n && c < n) {
            diagonal.push(grid[r][c]);
            r++;
            c++;
        }
        return diagonal;
    }

    // Helper to overwrite a diagonal starting at (startRow, startCol)
    function fillDiagonal(startRow: number, startCol: number, values: number[]) {
        let r = startRow, c = startCol, idx = 0;
        while (r < n && c < n) {
            grid[r][c] = values[idx++];
            r++;
            c++;
        }
    }

    // --- Process bottom-left triangle (including main diagonal) ---
    for (let row = 0; row < n; row++) {
        const diag = extractDiagonal(row, 0);
        diag.sort((a, b) => b - a); // non-increasing
        fillDiagonal(row, 0, diag);
    }

    // --- Process top-right triangle (excluding main diagonal) ---
    for (let col = 1; col < n; col++) {
        const diag = extractDiagonal(0, col);
        diag.sort((a, b) => a - b); // non-decreasing
        fillDiagonal(0, col, diag);
    }

    return grid;
}

// ----- IOCE -----

// Example 1:
const grid1 = [[1,7,3],[9,8,2],[4,5,6]];
console.log(diagonalSort(grid1)); // [[8,2,3],[9,6,7],[4,5,1]]

// Example 2:
const grid2 = [[0,1],[1,2]];
console.log(diagonalSort(grid2)); // [[2,1],[1,0]]

// Example 3:
const grid3 = [[1]];
console.log(diagonalSort(grid3)); // [[1]]