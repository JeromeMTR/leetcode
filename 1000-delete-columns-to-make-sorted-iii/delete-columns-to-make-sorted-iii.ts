/**
 * IOCE
 * I: strs: string[] (n strings, same length m)
 * O: minimum number of columns to delete so that EACH row becomes non-decreasing
 * C: n <= 100, m <= 100, lowercase letters
 * E: n=1; already sorted rows; m=1
 *
 * Key idea:
 * - We choose a subsequence of column indices to KEEP (same for all rows).
 * - For every row, the kept characters must be non-decreasing.
 * - This is exactly: find the longest sequence of columns (in increasing index order)
 *   that is non-decreasing for ALL rows simultaneously.
 * - Let L = maximum number of columns we can keep. Answer = m - L.
 *
 * DP over columns:
 * dp[j] = longest valid kept subsequence ending at column j.
 * Transition i -> j (i < j) is allowed iff for every row r: strs[r][i] <= strs[r][j].
 */
function minDeletionSize(strs: string[]): number {
  const n = strs.length;
  const m = strs[0].length;

  // dp[j]: best length ending at column j
  const dp = new Array<number>(m).fill(1);

  let best = 1;
  for (let j = 0; j < m; j++) {
    for (let i = 0; i < j; i++) {
      // Check if we can extend subsequence from i to j across ALL rows
      let ok = true;
      for (let r = 0; r < n; r++) {
        if (strs[r].charCodeAt(i) > strs[r].charCodeAt(j)) {
          ok = false;
          break;
        }
      }
      if (ok) dp[j] = Math.max(dp[j], dp[i] + 1);
    }
    best = Math.max(best, dp[j]);
  }

  return m - best;
}