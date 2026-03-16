/**
 * Biggest Three Rhombus Sums in a Grid (TypeScript)
 *
 * IOCE
 * Inputs:
 *  - grid: number[][] (m x n integer matrix)
 *
 * Outputs:
 *  - number[]: the biggest three DISTINCT rhombus border sums, in descending order.
 *              If fewer than 3 distinct sums exist, return all.
 *
 * Constraints:
 *  - 1 <= m, n <= 50
 *  - 1 <= grid[i][j] <= 1e5
 *
 * Edge cases:
 *  - Area-0 rhombus (size k=0): sum is just the single cell value.
 *  - Very small grids: 1x1, 1xN, Mx1 (only k=0 possible).
 *  - Many duplicates: must return distinct top sums only.
 *  - Rhombus near borders: size limited by available space (up/down/left/right).
 */

function getBiggestThree(grid: number[][]): number[] {
  const m = grid.length;
  const n = grid[0].length;

  // diag1[r][c] = sum of grid along '\' diagonal ending at (r-1,c-1) in 1-based indexing
  const diag1: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  // diag2[r][c] = sum of grid along '/' diagonal ending at (r-1,c-1) but comes from (r-1,c+1)
  const diag2: number[][] = Array.from({ length: m + 1 }, () => Array(n + 2).fill(0)); // n+2 for safe c+1

  for (let r = 1; r <= m; r++) {
    for (let c = 1; c <= n; c++) {
      diag1[r][c] = grid[r - 1][c - 1] + diag1[r - 1][c - 1];
      diag2[r][c] = grid[r - 1][c - 1] + diag2[r - 1][c + 1];
    }
  }

  // Sum along '\' from (r1,c1) to (r2,c2), inclusive; requires r2-r1 == c2-c1 and r1<=r2
  function sumDiag1(r1: number, c1: number, r2: number, c2: number): number {
    // convert to 1-based indices
    const R1 = r1 + 1, C1 = c1 + 1, R2 = r2 + 1, C2 = c2 + 1;
    return diag1[R2][C2] - diag1[R1 - 1][C1 - 1];
  }

  // Sum along '/' from (r1,c1) to (r2,c2), inclusive; requires r2-r1 == -(c2-c1) and r1<=r2
  function sumDiag2(r1: number, c1: number, r2: number, c2: number): number {
    // convert to 1-based indices
    const R1 = r1 + 1, C1 = c1 + 1, R2 = r2 + 1, C2 = c2 + 1;
    return diag2[R2][C2] - diag2[R1 - 1][C1 + 1];
  }

  const set = new Set<number>();

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // k=0 rhombus (single cell)
      set.add(grid[i][j]);

      const maxK = Math.min(i, m - 1 - i, j, n - 1 - j);
      for (let k = 1; k <= maxK; k++) {
        const topR = i - k, topC = j;
        const rightR = i, rightC = j + k;
        const bottomR = i + k, bottomC = j;
        const leftR = i, leftC = j - k;

        // 4 sides (inclusive endpoints)
        const s1 = sumDiag1(topR, topC, rightR, rightC);     // top -> right (\)
        const s2 = sumDiag2(rightR, rightC, bottomR, bottomC); // right -> bottom (/)
        const s3 = sumDiag1(leftR, leftC, bottomR, bottomC); // left -> bottom (\)
        const s4 = sumDiag2(topR, topC, leftR, leftC);       // top -> left (/)

        // subtract corners once each because each corner is included in two sides
        const corners =
          grid[topR][topC] + grid[rightR][rightC] + grid[bottomR][bottomC] + grid[leftR][leftC];

        const sum = s1 + s2 + s3 + s4 - corners;
        set.add(sum);
      }
    }
  }

  const arr = Array.from(set);
  arr.sort((a, b) => b - a);
  return arr.slice(0, 3);
}

/* ------------------------- Console log tests ------------------------- */

const grid1 = [
  [3, 4, 5, 1, 3],
  [3, 3, 4, 2, 3],
  [20, 30, 200, 40, 10],
  [1, 5, 5, 4, 1],
  [4, 3, 2, 2, 5],
];
console.log(getBiggestThree(grid1)); // Expected: [228,216,211]

const grid2 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
console.log(getBiggestThree(grid2)); // Expected: [20,9,8]

const grid3 = [[7, 7, 7]];
console.log(getBiggestThree(grid3)); // Expected: [7]

// Additional quick edge tests
console.log(getBiggestThree([[5]])); // Expected: [5]
console.log(getBiggestThree([[1, 2, 1, 2]])); // only k=0 possible => distinct top: [2,1]