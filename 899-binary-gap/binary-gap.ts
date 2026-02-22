/**
 * IOCE
 * Inputs:
 *   - n: positive integer (1 <= n <= 1e9)
 *
 * Outputs:
 *   - number: the maximum distance between two adjacent 1s in n's binary form.
 *
 * Constraints:
 *   - Time: O(log n)
 *   - Space: O(1)
 *
 * Edge cases:
 *   - n has 0 or 1 set bit (e.g., 1, 8) => return 0
 *   - consecutive ones (e.g., 3 -> "11") => distance 1
 *   - multiple 1s with varying gaps (take maximum)
 */

/**
 * Longest distance between adjacent 1s in binary representation.
 * Adjacent means: consider consecutive 1 bits (no other 1 between them).
 */
function binaryGap(n: number): number {
  let lastOnePos = -1; // position of previous encountered 1-bit
  let pos = 0;         // current bit position (0 = LSB)
  let best = 0;

  while (n > 0) {
    // Check lowest bit
    if ((n & 1) === 1) {
      if (lastOnePos !== -1) {
        best = Math.max(best, pos - lastOnePos);
      }
      lastOnePos = pos;
    }

    n = n >>> 1; // unsigned shift to move to next bit
    pos++;
  }

  return best;
}

/* -------------------- Console log tests -------------------- */
console.log(binaryGap(22), "expected:", 2); // 10110
console.log(binaryGap(8), "expected:", 0);  // 1000
console.log(binaryGap(5), "expected:", 2);  // 101

// Additional checks
console.log(binaryGap(1), "expected:", 0);   // 1
console.log(binaryGap(3), "expected:", 1);   // 11
console.log(binaryGap(9), "expected:", 3);   // 1001
console.log(binaryGap(6), "expected:", 1);   // 110
console.log(binaryGap(1041), "expected:", 6); // 10000010001 (classic example)