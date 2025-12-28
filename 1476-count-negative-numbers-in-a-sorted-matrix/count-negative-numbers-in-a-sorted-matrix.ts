// @params: number[][] grid

/**
 *
 * IOCE
 * I: m x n matrix `grid`, sorted non-increasing in each row and each column
 * O: number of negative values in the matrix
 * C: 1 <= m,n <= 100; values in [-100, 100]
 * E: handle cases with no negatives / all negatives; works in O(m + n)
 */
function countNegatives(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;

  // Start from bottom-left corner.
  // If current is negative, then all elements to its right in the same row are negative.
  // If current is non-negative, move right to potentially find negatives in that column.
  let row = m - 1;
  let col = 0;
  let count = 0;

  while (row >= 0 && col < n) {
    if (grid[row][col] < 0) {
      // In this row, from col..n-1 are all negative due to row-wise non-increasing order.
      count += (n - col);
      // Move up to the previous row to continue counting.
      row--;
    } else {
      // Current is >= 0, so all above in this column are also >= 0 (column-wise non-increasing).
      // Negatives, if any, must be to the right.
      col++;
    }
  }

  return count;
}

// Test cases
// Example 1
const grid1 = [
  [4, 3, 2, -1],
  [3, 2, 1, -1],
  [1, 1, -1, -2],
  [-1, -1, -2, -3],
];
console.log("Example 1 -> expected 8, got:", countNegatives(grid1));

// Example 2
const grid2 = [
  [3, 2],
  [1, 0],
];
console.log("Example 2 -> expected 0, got:", countNegatives(grid2));

// Example 3
const grid3 = [
  [1, -1],
  [-1, -1],
];
console.log("Example 3 -> expected 3, got:", countNegatives(grid3));

// Example 4
const grid4 = [[-1]];
console.log("Example 4 -> expected 1, got:", countNegatives(grid4));

// Additional edge-style checks
const grid5 = [
  [10, 5, 0, -1, -2],
  [9, 4, -1, -3, -4],
  [8, 2, -2, -3, -5],
];
console.log("Additional -> expected 10, got:", countNegatives(grid5));