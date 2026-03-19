/**
 * IOCE
 * Input:
 *  - grid: 2D array of characters: 'X', 'Y', or '.'
 *
 * Output:
 *  - number: count of submatrices that:
 *      1) contain grid[0][0]  => equivalently, top-left corner is (0,0)
 *      2) have equal # of 'X' and 'Y'
 *      3) have at least one 'X'
 *
 * Constraints:
 *  - 1 <= n = grid.length <= 1000
 *  - 1 <= m = grid[0].length <= 1000
 *  - grid[i][j] in {'X','Y','.'}
 *
 * Edge Cases:
 *  - All '.' => DX always 0 => answer 0
 *  - No (r,c) with D == 0 => 0
 *  - grid[0][0] = 'Y' or '.' etc is fine; requirement is "contains cell", not "must be X".
 */

function numberOfSubmatrices(grid: string[][]): number {
  const n = grid.length;
  const m = grid[0].length;

  // Prefix sums for X and Y counts.
  // px[i+1][j+1] = #X in rectangle (0..i, 0..j)
  // py similarly.
  const px: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  const py: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const isX = grid[i][j] === "X" ? 1 : 0;
      const isY = grid[i][j] === "Y" ? 1 : 0;
      px[i + 1][j + 1] = px[i][j + 1] + px[i + 1][j] - px[i][j] + isX;
      py[i + 1][j + 1] = py[i][j + 1] + py[i + 1][j] - py[i][j] + isY;
    }
  }

  let ans = 0;

  // Count anchored rectangles (0..r,0..c)
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      const xCount = px[r + 1][c + 1];
      if (xCount === 0) continue; // must contain at least one X

      const yCount = py[r + 1][c + 1];
      if (xCount === yCount) ans++;
    }
  }

  return ans;
}

/* -------------------- Console log tests -------------------- */

// Example 1
const grid1 = [
  ["X", "Y", "."],
  ["Y", ".", "."],
];
console.log(numberOfSubmatrices(grid1), "expected:", 3);

// Example 2
const grid2 = [
  ["X", "X"],
  ["X", "Y"],
];
console.log(numberOfSubmatrices(grid2), "expected:", 0);

// Example 3
const grid3 = [
  [".", "."],
  [".", "."],
];
console.log(numberOfSubmatrices(grid3), "expected:", 0);

// Additional tests
// Single cell 'X' => X=1,Y=0 not equal => 0
console.log(numberOfSubmatrices([["X"]]), "expected:", 0);

// 1x2: [X,Y] => anchored rectangles: (0,0): X!=Y; (0,1): X=1,Y=1 => 1
console.log(numberOfSubmatrices([["X", "Y"]]), "expected:", 1);

// 2x2: X Y / . . => anchored (0,1) ok, (1,1) ok? counts X=1,Y=1 => still ok => 2
const grid4 = [
  ["X", "Y"],
  [".", "."],
];
console.log(numberOfSubmatrices(grid4), "expected:", 2);
