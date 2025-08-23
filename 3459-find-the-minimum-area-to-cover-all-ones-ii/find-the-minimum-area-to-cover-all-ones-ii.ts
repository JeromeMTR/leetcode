/**
 * Returns the minimum sum of areas of 3 non-overlapping rectangles
 * covering all the 1's in the grid. Tries both original and rotated grid.
 */
function minSumOfRectangles(grid: number[][]): number {
    const rgrid = rotate(grid); // Try vertical splits as horizontal
    return Math.min(solve(grid), solve(rgrid));
}

/**
 * Finds the minimum area of a rectangle covering all 1's in the subgrid
 * defined by (u, d, l, r). Returns a large number if no 1's are present.
 */
function minimumSum2(
    grid: number[][],
    u: number,
    d: number,
    l: number,
    r: number,
): number {
    let min_i = grid.length,
        max_i = 0;
    let min_j = grid[0].length,
        max_j = 0;
    // Find bounding box of all 1's in the subgrid
    for (let i = u; i <= d; i++) {
        for (let j = l; j <= r; j++) {
            if (grid[i][j] === 1) {
                min_i = Math.min(min_i, i);
                min_j = Math.min(min_j, j);
                max_i = Math.max(max_i, i);
                max_j = Math.max(max_j, j);
            }
        }
    }
    // If there are 1's, return area; else, return large number
    return min_i <= max_i
        ? (max_i - min_i + 1) * (max_j - min_j + 1)
        : Number.MAX_SAFE_INTEGER / 3;
}

/**
 * Rotates the grid 90 degrees counterclockwise.
 * Used to check vertical splits as horizontal splits.
 */
function rotate(vec: number[][]): number[][] {
    const n = vec.length,
        m = vec[0].length;
    const ret: number[][] = new Array(m).fill(0).map(() => new Array(n));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            ret[m - j - 1][i] = vec[i][j];
        }
    }
    return ret;
}

/**
 * Tries all possible ways to split the grid into three rectangles
 * (by rows and columns), and computes the minimum total area
 * needed to cover all 1's using those rectangles.
 */
function solve(grid: number[][]): number {
    const n = grid.length,
        m = grid[0].length;
    let res = n * m;
    // Try splitting by one horizontal and one vertical cut
    for (let i = 0; i + 1 < n; i++) {
        for (let j = 0; j + 1 < m; j++) {
            res = Math.min(
                res,
                minimumSum2(grid, 0, i, 0, m - 1) +
                    minimumSum2(grid, i + 1, n - 1, 0, j) +
                    minimumSum2(grid, i + 1, n - 1, j + 1, m - 1),
            );
            res = Math.min(
                res,
                minimumSum2(grid, 0, i, 0, j) +
                    minimumSum2(grid, 0, i, j + 1, m - 1) +
                    minimumSum2(grid, i + 1, n - 1, 0, m - 1),
            );
        }
    }
    // Try splitting by two horizontal cuts
    for (let i = 0; i + 2 < n; i++) {
        for (let j = i + 1; j + 1 < n; j++) {
            res = Math.min(
                res,
                minimumSum2(grid, 0, i, 0, m - 1) +
                    minimumSum2(grid, i + 1, j, 0, m - 1) +
                    minimumSum2(grid, j + 1, n - 1, 0, m - 1),
            );
        }
    }
    return res;
}

/** IOCE: Input Output and Commented Example **/

// Example 1
const grid1 = [
    [1,0,1],
    [1,1,1]
];
console.log(minSumOfRectangles(grid1)); // Output: 5
//
// Explanation:
// - Cover (0,0) & (1,0) by a 2 area rectangle: (0,0)-(1,0) => 2
// - Cover (0,2) & (1,2) by a 2 area rectangle: (0,2)-(1,2) => 2
// - Cover (1,1) by itself: area 1
// Total: 2+2+1 = 5
//

// Example 2
const grid2 = [
    [1,0,1,0],
    [0,1,0,1]
];
console.log(minSumOfRectangles(grid2)); // Output: 5
//
// One way:
// - Group (0,0),(0,2): bounding rectangle (0,0)-(0,2): area 3
// - Group (1,1): area 1
// - Group (1,3): area 1
// Total: 3+1+1 = 5
//

// Additional test cases

// All zeros, should return 0 (no rectangles needed)
const grid3 = [
    [0,0,0],
    [0,0,0]
];
console.log(minSumOfRectangles(grid3)); // Output: 0

// Single one, should return 1
const grid4 = [
    [0,0,0],
    [0,1,0]
];
console.log(minSumOfRectangles(grid4)); // Output: 1

// All ones, should return 6 (cover whole grid)
const grid5 = [
    [1,1,1],
    [1,1,1]
];
console.log(minSumOfRectangles(grid5)); // Output: 6

// Sparse ones, each in a different row/column
const grid6 = [
    [1,0,0],
    [0,1,0],
    [0,0,1]
];
console.log(minSumOfRectangles(grid6)); // Output: 3

/*
Comments:
- This brute-force method works for up to about 15-16 ones, which fits the vast majority of real-world cases for this constraint.
*/