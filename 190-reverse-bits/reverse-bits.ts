/**
 * Reverse Bits (32-bit)
 *
 * IOCE
 * Inputs:
 *   - n: number (given as a 32-bit signed/unsigned integer value in range)
 *
 * Outputs:
 *   - number: the 32-bit value whose bits are reversed (returned as an unsigned 32-bit number)
 *
 * Constraints:
 *   - 0 <= n <= 2^31 - 2 (given)
 *   - n is even (given, but solution works for any 32-bit value)
 *
 * Edge cases:
 *   - n = 0 => 0
 *   - n with leading zeros (common): they become trailing zeros after reverse
 *   - Values that would be negative in signed 32-bit after reverse:
 *       we return as unsigned using >>> 0 (as typical for this problem)
 *
 * Reverses bits of a 32-bit integer.
 * Uses unsigned shifts to avoid sign-extension issues in JS/TS bitwise operations.
 */
function reverseBits(n: number): number {
  // Ensure we treat n as unsigned 32-bit.
  n = n >>> 0;

  let res = 0;
  for (let i = 0; i < 32; i++) {
    // Shift res left to make room for next bit
    res = (res << 1) >>> 0;
    // Add lowest bit of n
    res |= (n & 1);
    // Shift n right to process next bit
    n = n >>> 1;
  }
  return res >>> 0;
}

/* -------------------- Console tests -------------------- */
console.log(reverseBits(43261596), "expected:", 964176192);
console.log(reverseBits(2147483644), "expected:", 1073741822);
