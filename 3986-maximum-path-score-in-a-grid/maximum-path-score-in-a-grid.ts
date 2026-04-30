/**
 * IOCE
 * ----
 * Input:
 *  - grid: number[][] (m x n), values in {0,1,2}, grid[0][0] == 0
 *  - k: number (max total cost allowed)
 *
 * Output:
 *  - number: maximum achievable score along a path from (0,0) to (m-1,n-1)
 *           moving only Right or Down, with total cost <= k; else -1.
 *
 * Constraints / Complexity targets:
 *  - 1 <= m,n <= 200  => up to 40,000 cells
 *  - 0 <= k <= 1000
 *
 * Edge cases:
 *  - m=1 or n=1 (only one path)
 *  - k=0 (only cells with cost 0 can be visited)
 *  - No feasible path within cost k => return -1
 *  - Large grids: must use rolling arrays, avoid O(m*n*k) memory
 */

function maxScoreWithCost(grid: number[][], k: number): number {
  const m = grid.length;
  const n = grid[0].length;

  const NEG = -1e15;

  // Helper: cell cost and score
  const costOf = (v: number) => (v === 0 ? 0 : 1);
  const scoreOf = (v: number) => v; // 0->0,1->1,2->2

  // prevRow[j*(k+1)+c] stores dp for row i-1 at column j, cost c
  let prevRow = new Float64Array(n * (k + 1));
  for (let idx = 0; idx < prevRow.length; idx++) prevRow[idx] = NEG;

  for (let i = 0; i < m; i++) {
    // curRow[j*(k+1)+c]
    const curRow = new Float64Array(n * (k + 1));
    for (let idx = 0; idx < curRow.length; idx++) curRow[idx] = NEG;

    for (let j = 0; j < n; j++) {
      const v = grid[i][j];
      const cellCost = costOf(v);
      const cellScore = scoreOf(v);
      const base = j * (k + 1);

      for (let c = 0; c <= k; c++) {
        if (c < cellCost) continue;
        const prevCost = c - cellCost;

        // Start cell (0,0): you must "take" it
        if (i === 0 && j === 0) {
          // grid[0][0] is 0 by constraints; still handle generally
          curRow[base + c] = (prevCost === 0 ? cellScore : NEG);
          continue;
        }

        let best = NEG;

        // from top
        if (i > 0) {
          const fromTop = prevRow[base + prevCost];
          if (fromTop > best) best = fromTop;
        }

        // from left
        if (j > 0) {
          const fromLeft = curRow[(j - 1) * (k + 1) + prevCost];
          if (fromLeft > best) best = fromLeft;
        }

        if (best !== NEG) curRow[base + c] = best + cellScore;
      }
    }

    prevRow = curRow;
  }

  // Extract answer from bottom-right (m-1,n-1)
  const lastBase = (n - 1) * (k + 1);
  let ans = NEG;
  for (let c = 0; c <= k; c++) ans = Math.max(ans, prevRow[lastBase + c]);

  return ans === NEG ? -1 : Math.trunc(ans);
}
