/**
 * IOCE (Idea / Observations / Complexity / Edge cases)
 *
 * Idea:
 * - Operation flips signs of two adjacent cells => total parity of negative count is invariant:
 *   flipping two signs changes negative-count by -2, 0, or +2.
 * - On an n x n grid (n>=2), using adjacent flips, you can achieve any sign configuration
 *   with the same parity of negative cells. Therefore, the maximum sum depends only on:
 *   - sum of absolute values
 *   - parity of initial negatives
 *   - smallest absolute value (the "cost" if one cell must remain negative)
 *
 * Observations:
 * - If number of negative elements is even: make all elements non-negative => answer = sumAbs
 * - If odd: must leave exactly one element negative; choose the one with minimum abs value:
 *   answer = sumAbs - 2 * minAbs
 *
 * Complexity:
 * - O(n^2) time, O(1) extra space
 *
 * Edge cases:
 * - Zeros: if minAbs==0 and negatives odd, still can get sumAbs (because leaving 0 "negative" costs nothing)
 * - Large sums: use BigInt to avoid overflow in JS number (can exceed 2^53-1).
 */

function maxMatrixSum(matrix: number[][]): number {
  let sumAbs = 0n;
  let minAbs = BigInt(Number.MAX_SAFE_INTEGER);
  let negCount = 0;

  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];
    for (let j = 0; j < row.length; j++) {
      const v = row[j];
      if (v < 0) negCount++;
      const av = BigInt(Math.abs(v));
      sumAbs += av;
      if (av < minAbs) minAbs = av;
    }
  }

  const ans = (negCount % 2 === 0) ? sumAbs : (sumAbs - 2n * minAbs);

  // LeetCode expects a number; the true value is within safe range for given constraints,
  // but keep BigInt internally for robustness.
  return Number(ans);
}