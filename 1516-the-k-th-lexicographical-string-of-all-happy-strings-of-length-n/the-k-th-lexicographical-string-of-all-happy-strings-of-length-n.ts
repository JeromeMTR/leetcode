/**
 * IOCE
 * I (Inputs):
 *   - n: number (1 <= n <= 10), length of the happy string
 *   - k: number (1 <= k <= 100), 1-indexed position in lexicographically sorted list
 *
 * O (Outputs):
 *   - string: the k-th happy string of length n in lexicographical order, or "" if k is too large
 *
 * C (Constraints / Complexity):
 *   - Total happy strings of length n: 3 * 2^(n-1)
 *   - Time: O(n) (construct string char by char)
 *   - Space: O(1) auxiliary (excluding output string)
 *
 * E (Edge cases):
 *   - k > 3 * 2^(n-1) => return ""
 *   - n = 1 => answer is simply 'a','b','c' depending on k (if k <= 3)
 *   - Ensure lexicographic order with allowed letters ['a','b','c'] and no adjacent equal
 */

function getHappyString(n: number, k: number): string {
  const total = 3 * (1 << (n - 1)); // 3 * 2^(n-1)
  if (k > total) return "";

  const letters = ["a", "b", "c"];
  let res = "";
  let prev = "";

  // remaining = how many strings are produced for each choice at current position
  // At position i (0-based), after choosing a letter there are 2^(n-i-1) continuations
  for (let i = 0; i < n; i++) {
    const remaining = 1 << (n - i - 1);

    // candidate letters in lexicographic order, excluding prev
    const candidates: string[] = [];
    for (const ch of letters) if (ch !== prev) candidates.push(ch);

    // Each candidate contributes exactly 'remaining' strings.
    // Determine which candidate block contains k.
    const idx = Math.floor((k - 1) / remaining);
    const chosen = candidates[idx];

    res += chosen;
    prev = chosen;

    // Reduce k to the index within the chosen block
    k -= idx * remaining;
  }

  return res;
}

/*********************
 * Console log tests *
 *********************/
console.log(getHappyString(1, 3), "expected:", "c");
console.log(getHappyString(1, 4), "expected:", "");
console.log(getHappyString(3, 9), "expected:", "cab");

// Additional checks
console.log(getHappyString(3, 1), "expected:", "aba");
console.log(getHappyString(3, 12), "expected:", "cbc");
console.log(getHappyString(10, 100), "expected:", "(non-empty or empty depending on k)");
// total for n=10 is 3*2^9 = 153, so k=100 should be non-empty:
console.log(getHappyString(10, 154), "expected:", ""); // beyond total => ""
