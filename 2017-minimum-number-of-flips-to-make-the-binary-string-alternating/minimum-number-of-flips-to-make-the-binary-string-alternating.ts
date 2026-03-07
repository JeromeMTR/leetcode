/**
 * 1888. Minimum Number of Flips to Make the Binary String Alternating
 *
 * IOCE
 * Inputs:
 *  - s: string (binary string containing only '0' and '1')
 *
 * Outputs:
 *  - number: minimum count of Type-2 (flip) operations needed so that after any number of Type-1 rotations,
 *            the string can be made alternating.
 *
 * Constraints:
 *  - 1 <= s.length <= 1e5
 *  - s[i] ∈ {'0','1'}
 *  - O(n) where n = s.length
 *  - O(1) extra space (besides the input string)
 *
 * Edge Cases:
 *  - n = 1: already alternating => 0
 *  - string already alternating => 0
 *  - all same chars (e.g., "0000", "111") => depends on parity and best rotation
 *  - odd length: rotations change which indices are expected to be 0/1, so we must consider all rotations
 *  - even length: rotations do NOT change mismatch count vs patterns "0101..." or "1010..." (still works with the same logic)
 *
 * Approach:
 *  - Consider alternating patterns:
 *      A: "010101..."
 *      B: "101010..."
 *  - Rotation is equivalent to taking a length-n window over s+s.
 *  - For each window (rotation) compute mismatches against both patterns and take min.
 *  - Maintain mismatch counts with a sliding window of length n in O(1) per shift.
 */
function minFlips(s: string): number {
  const n = s.length;
  if (n <= 1) return 0;

  const ss = s + s; // length 2n
  let mismatchA = 0; // mismatches vs pattern A (start with '0') in current window
  let mismatchB = 0; // mismatches vs pattern B (start with '1') in current window

  // Helper: expected char for global index i in ss under pattern A/B
  // Pattern A: even index => '0', odd => '1'
  // Pattern B: even index => '1', odd => '0'
  const expectedA = (i: number) => (i % 2 === 0 ? "0" : "1");
  const expectedB = (i: number) => (i % 2 === 0 ? "1" : "0");

  // Build initial window [0, n-1]
  for (let i = 0; i < n; i++) {
    if (ss[i] !== expectedA(i)) mismatchA++;
    if (ss[i] !== expectedB(i)) mismatchB++;
  }

  let ans = Math.min(mismatchA, mismatchB);

  // Slide window over ss: window [l, r] of length n, where r = l + n - 1
  for (let l = 1; l <= n; l++) {
    const outIdx = l - 1;
    const inIdx = l + n - 1;

    // remove outgoing character contributions
    if (ss[outIdx] !== expectedA(outIdx)) mismatchA--;
    if (ss[outIdx] !== expectedB(outIdx)) mismatchB--;

    // add incoming character contributions
    if (ss[inIdx] !== expectedA(inIdx)) mismatchA++;
    if (ss[inIdx] !== expectedB(inIdx)) mismatchB++;

    ans = Math.min(ans, mismatchA, mismatchB);
  }

  return ans;
}

/********************
 * Console log tests *
 ********************/
console.log(minFlips("111000"), "expected:", 2);
console.log(minFlips("010"), "expected:", 0);
console.log(minFlips("1110"), "expected:", 1);

// Additional tests
console.log(minFlips("0"), "expected:", 0);
console.log(minFlips("1"), "expected:", 0);
console.log(minFlips("00"), "expected:", 1);   // flip one => "01" or "10"
console.log(minFlips("11"), "expected:", 1);   // flip one
console.log(minFlips("000"), "expected:", 1);  // rotate doesn't matter; best alternating needs 1 flip: "010"
console.log(minFlips("001"), "expected:", 0);  // rotate to "010"
console.log(minFlips("010101"), "expected:", 0);
console.log(minFlips("100101"), "expected:", 1);