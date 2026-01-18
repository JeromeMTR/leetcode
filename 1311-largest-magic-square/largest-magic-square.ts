
// IOCE (Input / Output / Constraints / Edge cases)
// Input:
//   - grid: number[][] - 2D array representing the grid values.
// Output:
//   - number - size k of the largest k x k magic square in the grid.
// Constraints (Time / Space):
//   - Time: O(m * n * min(m, n)^2) in the worst case.
//   - Space: O(1) extra space (uses only a few helpers and counters).
// Edge cases:
//   - 1 x 1 grid (always a magic square of size 1).
//   - No magic square larger than 1 x 1 exists.
//   - Rectangular grids where m != n.
// @params summary:
//   - @param grid number[][] - 2D integer grid.
//   - @returns number - largest magic square side length.

/**
 * Finds the largest k x k magic square in the given grid.
 * @param grid - 2D integer grid where grid[i][j] is the cell value.
 * @returns The side length k of the largest magic square.
 */


function largestMagicSquare(grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;

    const isMagic = (x: number, y: number, k: number): boolean => {
        const targetSum = sumRow(x, y, k, 0);

        for (let i = 0; i < k; i++) {
            if (sumRow(x, y, k, i) !== targetSum) return false;
        }

        for (let j = 0; j < k; j++) {
            if (sumCol(x, y, k, j) !== targetSum) return false;
        }

        if (sumMainDiagonal(x, y, k) !== targetSum) return false;
        if (sumAntiDiagonal(x, y, k) !== targetSum) return false;

        return true;
    };

    const sumRow = (x: number, y: number, k: number, i: number): number => {
        let sum = 0;
        for (let j = 0; j < k; j++) {
            sum += grid[x + i][y + j];
        }
        return sum;
    };

    const sumCol = (x: number, y: number, k: number, j: number): number => {
        let sum = 0;
        for (let i = 0; i < k; i++) {
            sum += grid[x + i][y + j];
        }
        return sum;
    };

    const sumMainDiagonal = (x: number, y: number, k: number): number => {
        let sum = 0;
        for (let i = 0; i < k; i++) {
            sum += grid[x + i][y + i];
        }
        return sum;
    };

    const sumAntiDiagonal = (x: number, y: number, k: number): number => {
        let sum = 0;
        for (let i = 0; i < k; i++) {
            sum += grid[x + i][y + (k - i - 1)];
        }
        return sum;
    };

    for (let k = Math.min(m, n); k > 0; k--) {
        for (let x = 0; x <= m - k; x++) {
            for (let y = 0; y <= n - k; y++) {
                if (isMagic(x, y, k)) return k;
            }
        }
    }

    return 1;
}

// Example test cases
console.log(largestMagicSquare([[7,1,4,5,6],[2,5,1,6,4],[1,5,4,3,2],[1,2,7,3,4]])); // Output: 3
console.log(largestMagicSquare([[5,1,3,1],[9,3,3,1],[1,3,3,8]])); // Output: 2
console.log(largestMagicSquare([[3,1,2,1]])); // Output: 3
console.log(largestMagicSquare([[1,2,1,2,1,2]])); // Output: 4
console.log(largestMagicSquare([[1,1,3,3,3,4,4,4,5,5]])); // Output: 4
