/**
 Problem: Champagne Tower (LeetCode 799)

 IOCE
 - Inputs:
   - poured: number — total cups of champagne poured into the top glass (0 <= poured <= 1e9)
   - query_row: number — target row index (0-indexed, 0 <= query_row < 100)
   - query_glass: number — target glass index within the row (0-indexed, 0 <= query_glass <= query_row)

 - Output:
   - number — how full the target glass is, clamped to [0, 1]

 - Constraints / Complexity:
   - Time: O(query_row^2) — we propagate overflow row by row (at most 100 rows, so ~5,000 ops)
   - Space: O(query_row) — 1D DP array for current row state

 - Edge cases:
   - poured = 0 → all glasses are empty
   - query_row = 0 → answer is min(1, poured)
   - Defensive: if query_glass > query_row (shouldn’t happen per constraints), return 0
   - Very large poured values → result in many full glasses; always clamp returned value to at most 1
   - Floating precision: JavaScript/TypeScript number (double) is sufficient for this problem

*/

function champagneTower(poured: number, query_row: number, query_glass: number): number {
  // Defensive check (though constraints guarantee 0 <= query_glass <= query_row)
  if (query_glass > query_row) return 0;

  // 1D DP array: enough length to handle the next position during propagation
  const row: number[] = new Array(query_row + 2).fill(0);
  row[0] = poured;

  // Propagate overflow down to each subsequent row
  for (let r = 0; r < query_row; r++) {
    // Update from right to left to avoid contaminating values needed in this iteration
    for (let c = r; c >= 0; c--) {
      const overflow = Math.max(0, row[c] - 1);
      row[c] = overflow / 2;         // amount passed to the left glass in next row
      row[c + 1] += overflow / 2;    // amount passed to the right glass in next row (accumulate)
    }
  }

  // The amount in the target glass cannot exceed 1 (glass capacity)
  return Math.min(1, row[query_glass]);
}

/* ------------------------- Console log tests ------------------------- */
console.log('Example 1:', champagneTower(1, 1, 1), 'expected', 0.0);
console.log('Example 2:', champagneTower(2, 1, 1), 'expected', 0.5);
console.log('Example 3:', champagneTower(100000009, 33, 17), 'expected', 1.0);
