/**
 * IOCE
 * I (Inputs):
 *   - matrix: number[][], a binary matrix of size m x n
 *
 * O (Outputs):
 *   - returns number: the maximum area of a submatrix consisting of all 1s
 *     after optimally reordering columns (same reordering applied to all rows).
 *
 * C (Constraints):
 *   - 1 <= m * n <= 1e5
 *   - matrix[i][j] ∈ {0, 1}
 *   - Time Complexity: O(n * log n) due to sorting each row's heights
 *   - Space Complexity: O(n) extra (heights + a temp array per row)
 *
 * E (Edge cases):
 *   - All zeros => answer 0
 *   - Single row => answer is max number of 1s (after column reorder they can be contiguous)
 *   - Single column => answer is max vertical run of 1s
 *   - Mixed rows where heights vary; sorting heights per row is key
 */

function largestSubmatrix(matrix: number[][]): number {
  const m = matrix.length;
  const n = matrix[0].length;

  const heights = new Array<number>(n).fill(0);
  let best = 0;

  for (let i = 0; i < m; i++) {
    // Update histogram heights for this row
    for (let j = 0; j < n; j++) {
      heights[j] = matrix[i][j] === 1 ? heights[j] + 1 : 0;
    }

    // Since we can reorder columns, sort heights descending for this row
    const sorted = heights.slice().sort((a, b) => b - a);

    // Compute best area with width = k+1 and height = sorted[k]
    for (let k = 0; k < n; k++) {
      const h = sorted[k];
      if (h === 0) break; // no larger areas possible beyond this point
      const area = h * (k + 1);
      if (area > best) best = area;
    }
  }

  return best;
}

/****************
 * Console log tests
 ***********************/
console.log(largestSubmatrix([[0,0,1],[1,1,1],[1,0,1]])); // 6
console.log(largestSubmatrix([[1,0,1,0,1]]));
console.log(largestSubmatrix([[1,1,0],[1,0,1],[0,1,1]])); // 2
