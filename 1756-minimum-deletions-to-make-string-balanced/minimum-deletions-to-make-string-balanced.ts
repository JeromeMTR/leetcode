/**
 * 1653. Minimum Deletions to Make String Balanced
 *
 * IOCE
 * I (Input):
 *  - s: string (only 'a' and 'b'), 1 <= s.length <= 1e5
 *
 * O (Output):
 *  - number: minimum deletions needed to make s balanced
 *
 * C (Constraints / Complexity):
 *  - Time: O(n) where n = s.length (single pass)
 *  - Space: O(1)
 *
 * E (Edge cases):
 *  - Already balanced (all 'a' then all 'b'): answer 0
 *  - All 'a' or all 'b': answer 0
 *  - Alternating patterns like "babababa"
 *  - Very large input size up to 1e5
 *
 *  @param s - Input string consisting only of 'a' and 'b'.
 *  @returns Minimum deletions required to make the string balanced.
 */
function minimumDeletions(s: string): number {
  let countB = 0;
  let dp = 0;

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "b") {
      countB++;
    } else {
      // ch === 'a'
      dp = Math.min(dp + 1, countB);
    }
  }

  return dp;
}

/* ------------------ Console log tests ------------------ */
console.log(minimumDeletions("aababbab"), "=> expected 2");
console.log(minimumDeletions("bbaaaaabb"), "=> expected 2");

console.log(minimumDeletions("aaaa"), "=> expected 0");
console.log(minimumDeletions("bbbb"), "=> expected 0");
console.log(minimumDeletions("abbb"), "=> expected 0");
console.log(minimumDeletions("ba"), "=> expected 1");
console.log(minimumDeletions("baba"), "=> expected 2");
console.log(minimumDeletions("abba"), "=> expected 1");
