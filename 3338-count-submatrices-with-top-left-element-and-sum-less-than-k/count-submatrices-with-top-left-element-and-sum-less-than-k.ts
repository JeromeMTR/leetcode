/**
 * IOCE
 * I: grid (m x n non-negative ints), k (int)
 * O: number of submatrices that include (0,0) and whose sum <= k
 * C:
 *   1 <= m,n <= 1000, 0 <= grid[i][j] <= 1000, 1 <= k <= 1e9
 *   Time:  O(m*n)  (compute 2D prefix + count all (r,c) endings)
 *   Space: O(m*n)  (prefix sums)  [can be optimized to O(n) if needed]
 * E (edge cases):
 *   - 1x1 grid
 *   - k smaller than grid[0][0] => answer 0
 *   - large m,n up to 1000 (need O(m*n), avoid O(m*n*something))
 *   - all zeros (many valid submatrices)
 *
 * Key idea:
 * Any submatrix containing top-left (0,0) is uniquely defined by its bottom-right corner (r,c).
 * Its sum is simply prefixSum[r][c] where prefixSum is the 2D prefix sum from (0,0) to (r,c).
 * Count how many prefixSum[r][c] <= k.
 */

function countSubmatrices(grid: number[][], k: number): number {
  const m = grid.length;
  const n = grid[0].length;

  // Build 2D prefix sums: ps[i][j] = sum of grid[0..i][0..j]
  const ps: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));

  let ans = 0;

  for (let i = 0; i < m; i++) {
    let rowRunning = 0;
    for (let j = 0; j < n; j++) {
      rowRunning += grid[i][j];
      const above = i > 0 ? ps[i - 1][j] : 0;
      ps[i][j] = rowRunning + above;

      if (ps[i][j] <= k) ans++;
    }
  }

  return ans;
}

/***********************
 * Console log tests
 ***********************/
console.log(
  countSubmatrices(
    [
      [7, 6, 3],
      [6, 6, 1],
    ],
    18
  ),
  "expected 4"
);

console.log(
  countSubmatrices(
    [
      [7, 2, 9],
      [1, 5, 0],
      [2, 6, 6],
    ],
    20
  ),
  "expected 6"
);

// Edge tests
console.log(countSubmatrices([[5]], 4), "expected 0");
console.log(countSubmatrices([[5]], 5), "expected 1");
console.log(
  countSubmatrices(
    [
      [0, 0],
      [0, 0],
    ],
    0
  ),
  "expected 4 (all bottom-right corners valid)"
);