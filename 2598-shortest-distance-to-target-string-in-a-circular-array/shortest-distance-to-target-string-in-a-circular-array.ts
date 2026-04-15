/**
 * IOCE
 * I (Inputs):
 *   - words: string[]  (0-indexed circular array of strings)
 *   - target: string   (string to reach)
 *   - startIndex: number (starting index)
 *
 * O (Output):
 *   - number: shortest distance (minimum steps) to reach any index i where words[i] === target
 *             using moves to next/previous in the circular array; -1 if target not present.
 *
 * C (Constraints):
 *   - 1 <= words.length <= 100
 *   - 1 <= words[i].length <= 100
 *   - words[i], target are lowercase English letters
 *   - 0 <= startIndex < words.length
 *
 *   Time Complexity: O(n)
 *   Space Complexity: O(1)
 *
 * E (Edge cases):
 *   - target not found => -1
 *   - words[startIndex] === target => 0
 *   - multiple occurrences of target => choose minimum circular distance
 *   - n = 1 => answer is 0 if match else -1
 */

/**
 * Returns the shortest distance in a circular array from startIndex to any target occurrence.
 */
function closetTarget(words: string[], target: string, startIndex: number): number {
  const n = words.length;
  let ans = Number.POSITIVE_INFINITY;

  for (let i = 0; i < n; i++) {
    if (words[i] !== target) continue;

    const diff = Math.abs(i - startIndex);
    const circularDist = Math.min(diff, n - diff);
    ans = Math.min(ans, circularDist);
  }

  return ans === Number.POSITIVE_INFINITY ? -1 : ans;
}

/* -------------------- Console log tests -------------------- */

// Example 1
console.log(
  closetTarget(["hello", "i", "am", "leetcode", "hello"], "hello", 1),
  "expected:",
  1
);

// Example 2
console.log(closetTarget(["a", "b", "leetcode"], "leetcode", 0), "expected:", 1);

// Example 3
console.log(closetTarget(["i", "eat", "leetcode"], "ate", 0), "expected:", -1);

// Additional edge tests
console.log(closetTarget(["x"], "x", 0), "expected:", 0);        // n=1 match
console.log(closetTarget(["x"], "y", 0), "expected:", -1);       // n=1 no match
console.log(closetTarget(["a", "b", "a", "c"], "a", 1), "expected:", 1); // nearest of multiple
console.log(closetTarget(["a", "b", "c", "d"], "d", 0), "expected:", 1); // wrap-around left