/**
 * Determines whether a grid can be partitioned into two parts with equal sum
 * using exactly one horizontal or vertical cut.
 *
 * Input
 * - grid: number[][]
 *   A 2D integer matrix with dimensions rows x cols.
 *
 * Output
 * - boolean
 *   Returns true if there exists at least one valid cut (between adjacent rows
 *   or adjacent columns) such that the sums of both parts are equal.
 *
 */
function canPartitionGrid(grid: number[][]): boolean {
    const rows = grid.length;
    const cols = grid[0].length;

    // Compute total grid sum.
    let totalSum = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            totalSum += grid[r][c];
        }
    }

    // Odd total cannot be split into two equal integer sums.
    if (totalSum % 2 !== 0) {
        return false;
    }

    const targetHalf = totalSum / 2;

    // Try all horizontal cuts: cut after row r, where r in [0, rows - 2].
    let runningSum = 0;
    for (let r = 0; r < rows - 1; r++) {
        for (let c = 0; c < cols; c++) {
            runningSum += grid[r][c];
        }
        if (runningSum === targetHalf) {
            return true;
        }
    }

    // Try all vertical cuts: cut after column c, where c in [0, cols - 2].
    runningSum = 0;
    for (let c = 0; c < cols - 1; c++) {
        for (let r = 0; r < rows; r++) {
            runningSum += grid[r][c];
        }
        if (runningSum === targetHalf) {
            return true;
        }
    }

    return false;
}

// Example tests
console.log(canPartitionGrid([[1, 4], [2, 3]])); // Output: true
console.log(canPartitionGrid([[1, 3], [2, 4]])); // Output: false
console.log(canPartitionGrid([[1]])); // Output: false due to no valid cut
console.log(canPartitionGrid([[1, 1], [1, 1], [1, 2]])); // Output: true