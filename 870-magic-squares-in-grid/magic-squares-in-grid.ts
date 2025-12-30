/**
 * IOCE (Input/Output/Constraints/Edge-cases)
 * Input: grid: number[][]
 * Output: number of 3x3 subgrids that are magic squares
 * Constraints: 1 <= row,col <= 10, 0 <= grid[i][j] <= 15
 * Edge-cases:
 *  - grid smaller than 3x3 => 0
 *  - values outside 1..9 => not magic square
 *  - must contain all distinct numbers 1..9 exactly once
 *
 * Approach:
 *  - Iterate all 3x3 windows.
 *  - Quick prune: center must be 5 (true for all 3x3 normal magic squares using 1..9).
 *  - Verify: all 9 numbers are 1..9 and distinct.
 *  - Verify sums: 3 rows, 3 cols, 2 diagonals all equal to 15.
 */
function numMagicSquaresInside(grid: number[][]): number {
  const R = grid.length;
  const C = grid[0].length;
  if (R < 3 || C < 3) return 0;

  let ans = 0;

  // Check if 3x3 subgrid with top-left (r,c) is a magic square
  const isMagic = (r: number, c: number): boolean => {
    // Center must be 5 in any 1..9 3x3 magic square
    if (grid[r + 1][c + 1] !== 5) return false;

    // Validate numbers: must be 1..9 and distinct
    const seen = new Array<boolean>(10).fill(false); // indices 1..9
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const v = grid[r + i][c + j];
        if (v < 1 || v > 9) return false;
        if (seen[v]) return false;
        seen[v] = true;
      }
    }

    // Magic sum for 1..9 3x3 magic square is 15
    const S = 15;

    // Rows
    for (let i = 0; i < 3; i++) {
      const sum = grid[r + i][c] + grid[r + i][c + 1] + grid[r + i][c + 2];
      if (sum !== S) return false;
    }

    // Cols
    for (let j = 0; j < 3; j++) {
      const sum = grid[r][c + j] + grid[r + 1][c + j] + grid[r + 2][c + j];
      if (sum !== S) return false;
    }

    // Diagonals
    const d1 = grid[r][c] + grid[r + 1][c + 1] + grid[r + 2][c + 2];
    if (d1 !== S) return false;
    const d2 = grid[r][c + 2] + grid[r + 1][c + 1] + grid[r + 2][c];
    if (d2 !== S) return false;

    return true;
  };

  for (let r = 0; r <= R - 3; r++) {
    for (let c = 0; c <= C - 3; c++) {
      if (isMagic(r, c)) ans++;
    }
  }

  return ans;
}