/**
 * Minimum Absolute Difference in kxk Submatrices
 *
 * IOCE
 * Inputs:
 *  - grid: m x n integer matrix
 *  - k: size of submatrix (k x k)
 *
 * Outputs:
 *  - ans: (m-k+1) x (n-k+1) matrix where ans[i][j] is the minimum absolute
 *         difference between any two DISTINCT values in the kxk submatrix
 *         with top-left corner (i, j). If all values equal or only 1 distinct value -> 0.
 *
 * Constraints:
 *  - 1 <= m, n <= 30
 *  - -1e5 <= grid[i][j] <= 1e5
 *  - 1 <= k <= min(m, n)
 *
 * Edge Cases:
 *  - k = 1 => each window has one value => answer 0 everywhere.
 *  - Submatrix with duplicates: if any duplicate exists, min difference can be 0.
 *  - Negative values and wide value range: handled by sorting numbers.
 */

function minAbsDiff(grid: number[][], k: number): number[][] {
    const m = grid.length,
        n = grid[0].length;
    // Result matrix has one entry per k x k window position.
    const res: number[][] = Array.from({ length: m - k + 1 }, () =>
        Array(n - k + 1).fill(0),
    );
    // Enumerate every valid top-left corner (i, j) of a k x k submatrix.
    for (let i = 0; i + k <= m; i++) {
        for (let j = 0; j + k <= n; j++) {
            // Collect all values from the current k x k window.
            let kgrid: number[] = [];
            for (let x = i; x < i + k; x++) {
                for (let y = j; y < j + k; y++) {
                    kgrid.push(grid[x][y]);
                }
            }
            // Track the best (smallest) difference between distinct sorted neighbors.
            let kmin = Number.MAX_SAFE_INTEGER;
            // Sorting lets us compare only adjacent values for minimum absolute diff.
            kgrid.sort((a, b) => a - b);
            for (let t = 1; t < kgrid.length; t++) {
                // Skip equal neighbors; we only consider differences between distinct values.
                if (kgrid[t] === kgrid[t - 1]) {
                    continue;
                }
                kmin = Math.min(kmin, kgrid[t] - kgrid[t - 1]);
            }
            // If at least one distinct pair was found, write its minimum difference.
            if (kmin !== Number.MAX_SAFE_INTEGER) {
                res[i][j] = kmin;
            }
        }
    }
    return res;
}

/******************** Console log tests ********************/

const grid1 = [
  [1, 8],
  [3, -2],
];
console.log(minAbsDiffInSubmatrices(grid1, 2)); // expected [[2]]

const grid2 = [[3, -1]];
console.log(minAbsDiffInSubmatrices(grid2, 1)); // expected [[0,0]]

const grid3 = [
  [1, -2, 3],
  [2, 3, 5],
];
console.log(minAbsDiffInSubmatrices(grid3, 2)); // expected [[1,2]]

// Additional tests
const grid4 = [
  [7, 7],
  [7, 7],
];
console.log(minAbsDiffInSubmatrices(grid4, 2)); // expected [[0]]

const grid5 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
console.log(minAbsDiffInSubmatrices(grid5, 3)); // expected [[1]]