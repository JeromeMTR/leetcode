/**
 * Counts the number of square submatrices with all ones in a given binary matrix.
 * @param matrix - 2D array of 0s and 1s
 * @returns the count of square submatrices with all ones
 */
function countSquares(matrix: number[][]): number {
    const m = matrix.length;
    const n = matrix[0].length;
    // dp[i][j] is the size of the largest all-1 square with bottom-right at (i, j)
    const dp: number[][] = Array.from({length: m}, () => Array(n).fill(0));
    let total = 0;

    // Iterate through matrix
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // Only check if cell is 1
            if (matrix[i][j] === 1) {
                if (i === 0 || j === 0) {
                    // If it is in the first row or first column, only 1x1 square possible
                    dp[i][j] = 1;
                } else {
                    // Else, minimum of top, left, and top-left neighbors + 1
                    dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1;
                }
                total += dp[i][j]; // Add the number of new squares ending at (i, j)
            } // else, dp[i][j] stays 0
        }
    }

    return total;
}

// -- Example Tests --
console.log(countSquares([
  [0,1,1,1],
  [1,1,1,1],
  [0,1,1,1]
])); // Output: 15

console.log(countSquares([
  [1,0,1],
  [1,1,0],
  [1,1,0]
])); // Output: 7

// Additional edge test
console.log(countSquares([
  [0]
])); // Output: 0

console.log(countSquares([
  [1]
])); // Output: 1