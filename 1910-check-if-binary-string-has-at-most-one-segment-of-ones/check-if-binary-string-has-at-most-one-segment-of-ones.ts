/**
 * IOCE
 * Inputs:
 *  - s: string (binary string, no leading zeros; s[0] === '1')
 *
 * Outputs:
 *  - boolean: true if s contains at most one contiguous segment of '1's, else false
 *
 * Constraints:
 *  - 1 <= s.length <= 100
 *  - s[i] ∈ {'0','1'}
 *  - s[0] === '1'
 *
 * Time Complexity:
 *  - O(n), where n = s.length
 *
 * Space Complexity:
 *  - O(1)
 *
 * Edge Cases:
 *  - All ones: "111" -> true (single segment)
 *  - Ones followed by zeros: "11000" -> true
 *  - Ones separated by zeros: "101" / "1001" -> false
 *  - Minimal length: "1" -> true
 */

function checkOnesSegment(s: string): boolean {
  let endedFirstSegment = false;

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];

    if (ch === "0") {
      // If we see a zero after starting with ones, we have ended the first ones segment.
      endedFirstSegment = true;
    } else {
      // ch === '1'
      // If we already ended the first segment and see another 1, that's a new segment.
      if (endedFirstSegment) return false;
    }
  }

  return true;
}

/* -------------------- Console log tests -------------------- */
console.log(checkOnesSegment("1001"), "expected:", false);
console.log(checkOnesSegment("110"), "expected:", true);
console.log(checkOnesSegment("1"), "expected:", true);
console.log(checkOnesSegment("11111"), "expected:", true);
console.log(checkOnesSegment("110000"), "expected:", true);
console.log(checkOnesSegment("101"), "expected:", false);
console.log(checkOnesSegment("1000001"), "expected:", false);