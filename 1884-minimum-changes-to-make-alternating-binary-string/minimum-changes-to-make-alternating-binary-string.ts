/**
 * IOCE
 * Inputs:
 *  - s: string consisting only of '0' and '1'
 *
 * Outputs:
 *  - number: minimum operations (bit flips) to make s alternating
 *
 * Constraints:
 *  - 1 <= s.length <= 1e4
 *  - s[i] ∈ {'0','1'}
 *  - O(n)
 *  - O(1)
 *
 * Edge Cases:
 *  - length 1: always alternating => 0
 *  - already alternating => 0
 *  - all same chars (e.g., "0000" or "1111") => floor(n/2) flips
 *  - choose min between patterns "0101..." and "1010..."
 */

function minOperations(s: string): number {
  let mismatchesA = 0; // mismatches to "0101..."
  let mismatchesB = 0; // mismatches to "1010..."

  for (let i = 0; i < s.length; i++) {
    const expectedA = (i % 2 === 0) ? "0" : "1";
    const expectedB = (i % 2 === 0) ? "1" : "0";
    if (s[i] !== expectedA) mismatchesA++;
    if (s[i] !== expectedB) mismatchesB++;
  }

  return Math.min(mismatchesA, mismatchesB);
}

/* ------------------------ Console log tests ------------------------ */
console.log(minOperations("0100"), "=> expected 1");
console.log(minOperations("10"), "=> expected 0");
console.log(minOperations("1111"), "=> expected 2");
console.log(minOperations("0"), "=> expected 0");
console.log(minOperations("1"), "=> expected 0");
console.log(minOperations("01"), "=> expected 0");
console.log(minOperations("00"), "=> expected 1");
console.log(minOperations("101010"), "=> expected 0");
console.log(minOperations("100101"), "=> expected 2");