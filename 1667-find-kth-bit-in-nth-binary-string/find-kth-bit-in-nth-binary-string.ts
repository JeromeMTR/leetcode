/**
 * IOCE
 * Inputs:
 *   - n: positive integer (1 <= n <= 20)
 *   - k: positive integer (1 <= k <= 2^n - 1), 1-indexed position in S_n
 *
 * Outputs:
 *   - Returns the k-th bit (1-indexed) in S_n as a string: "0" or "1"
 *
 * Constraints / Complexity:
 *   - O(n)   (each step reduces the problem to n-1)
 *   - O(1)  (iterative, no building of strings)
 *
 * Edge cases:
 *   - n = 1 -> S_1 = "0", so answer always "0"
 *   - k is the middle position (2^(n-1)) -> always "1"
 *   - k in the second half -> mirrored index with inversion
 */

/**
 * S_i = S_{i-1} + "1" + reverse(invert(S_{i-1}))
 * Length(S_i) = 2^i - 1
 *
 * Let len = 2^n - 1, mid = 2^(n-1)
 * - if k == mid: answer is "1"
 * - if k < mid: answer is kthBit(n-1, k)
 * - if k > mid: it maps to mirrored position in S_{n-1}, but inverted
 *     mirrorK = len - k + 1
 *     answer = invert( kthBit(n-1, mirrorK) )
 */
function findKthBit(n: number, k: number): string {
  let invert = false;

  while (true) {
    if (n === 1) return invert ? "1" : "0";

    const len = (1 << n) - 1;
    const mid = 1 << (n - 1);

    if (k === mid) {
      const bit = "1";
      return invert ? (bit === "1" ? "0" : "1") : bit;
    }

    if (k > mid) {
      // Map to mirrored index in first half and toggle inversion
      k = len - k + 1;
      invert = !invert;
    }

    // Move to previous level (first half is exactly S_{n-1})
    n -= 1;
  }
}

/* -------------------- Console log tests -------------------- */
console.log(findKthBit(3, 1), 'expected "0"');
console.log(findKthBit(4, 11), 'expected "1"');

// Additional sanity tests
console.log(findKthBit(1, 1), 'expected "0"');          // S1 = "0"
console.log(findKthBit(2, 1), 'expected "0"');          // S2 = "011"
console.log(findKthBit(2, 2), 'expected "1"');
console.log(findKthBit(2, 3), 'expected "1"');
console.log(findKthBit(3, 4), 'expected "1"');          // middle of S3
console.log(findKthBit(4, 8), 'expected "1"');          // middle of S4
console.log(findKthBit(4, 1), 'expected "0"');          // starts with "0"
console.log(findKthBit(4, (1 << 4) - 1), 'expected "1"'); // last bit of S4 is "1"