/**
 * IOCE
 * I (Input):
 *   - s: string (binary string containing only '0' and '1')
 *
 * O (Output):
 *   - number: count of non-empty substrings with:
 *       1) equal number of 0's and 1's
 *       2) all 0's grouped consecutively and all 1's grouped consecutively
 *          (i.e., substring looks like 000..0111..1 or 111..1000..0)
 *
 * C (Constraints):
 *   - 1 <= s.length <= 1e5
 *   - s[i] is '0' or '1'
 *
 * E (Edge cases):
 *   - length 1 => 0 (no possible balanced substring)
 *   - all same characters (e.g., "0000") => 0
 *   - alternating characters (e.g., "10101") => counts adjacent pairs mostly
 *   - long runs; ensure O(n) time to handle 1e5 length
 *
 * Complexity:
 *   - Time: O(n)
 *   - Space: O(1)
 *
 * Approach:
 *   Count lengths of consecutive groups. For every adjacent pair of groups with
 *   lengths a and b, the number of valid substrings contributed is min(a, b).
 *   Sum over all adjacent pairs.
 */

/**
 * Returns the number of valid binary substrings.
 */
function countBinarySubstrings(s: string): number {
  let prevGroupLen = 0; // length of previous run
  let currGroupLen = 1; // length of current run (at least 1)
  let ans = 0;

  for (let i = 1; i < s.length; i++) {
    if (s[i] === s[i - 1]) {
      currGroupLen++;
    } else {
      // run ended; count substrings formed by prev and curr runs
      ans += Math.min(prevGroupLen, currGroupLen);
      prevGroupLen = currGroupLen;
      currGroupLen = 1;
    }
  }

  // last pair
  ans += Math.min(prevGroupLen, currGroupLen);
  return ans;
}

/* -------------------- Console Tests -------------------- */
console.log(countBinarySubstrings("00110011"), "expected:", 6);
console.log(countBinarySubstrings("10101"), "expected:", 4);

console.log(countBinarySubstrings("0"), "expected:", 0);
console.log(countBinarySubstrings("00"), "expected:", 0);
console.log(countBinarySubstrings("01"), "expected:", 1);
console.log(countBinarySubstrings("10"), "expected:", 1);
console.log(countBinarySubstrings("000111"), "expected:", 3); // "01","0011","000111"
console.log(countBinarySubstrings("00110"), "expected:", 3);  // "01","0011","10"