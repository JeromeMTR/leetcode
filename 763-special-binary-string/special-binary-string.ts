/**
 * Special Binary Strings (LeetCode 761) — TypeScript
 *
 * IOCE
 * I (Input):
 *   - s: string (special binary string)
 *
 * O (Output):
 *   - string: lexicographically largest string obtainable by swapping consecutive special substrings
 *
 * C (Constraints):
 *   - 1 <= s.length <= 50
 *   - s is special:
 *       * #1s == #0s
 *       * every prefix has #1s >= #0s
 *   - Time: O(n^2 log n) worst-case (n<=50), due to recursive parsing + sorting substrings
 *   - Space: O(n) recursion depth + storing parts
 *
 * E (Edge cases):
 *   - Smallest special string: "10"
 *   - Already maximal order (no beneficial swaps)
 *   - Deeply nested special strings (like "111...000...")
 *
 */

function makeLargestSpecial(s: string): string {
  const parts: string[] = [];
  let balance = 0;
  let start = 0;

  // Split into top-level special substrings
  for (let i = 0; i < s.length; i++) {
    balance += s[i] === "1" ? 1 : -1;

    // When balance returns to 0, we found a top-level special substring [start..i]
    if (balance === 0) {
      // Strip outer "1"..."0", recursively maximize the inner part
      const inner = s.slice(start + 1, i);
      const bestInner = makeLargestSpecial(inner);
      parts.push("1" + bestInner + "0");
      start = i + 1;
    }
  }

  // Sort top-level special substrings in descending lexicographic order
  parts.sort((a, b) => (a > b ? -1 : a < b ? 1 : 0));

  return parts.join("");
}

/********************
 * Console log tests
 ********************/
console.log(makeLargestSpecial("11011000"), "=> expected 11100100");
console.log(makeLargestSpecial("10"), "=> expected 10");

// Additional tests
console.log(makeLargestSpecial("111000"), "=> expected 111000"); // already nested maximal
console.log(makeLargestSpecial("1010"), "=> expected 1010");     // two top-level "10","10"
console.log(makeLargestSpecial("1100"), "=> expected 1100");     // single top-level