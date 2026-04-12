/*
IOCE

Inputs:
- word: string
  - A string of uppercase English letters ('A' to 'Z').

Outputs:
- number
  - The minimum total Manhattan distance needed to type the word using two fingers.

Constraints:
- 2 <= word.length <= 300
- word consists only of uppercase English letters.

Edge Cases:
- Word length is 2:
  - We can place each finger freely on each letter, so answer can be 0.
- Repeated letters, e.g. "AA":
  - Typing same letter again may cost 0 if same finger is used.
- One finger may stay unused for several steps.
- Initial finger positions are free:
  - This is handled by allowing a special "unused" state with 0 movement cost to the first assigned letter.
*/

function minimumDistance(word: string): number {
  const UNUSED = 26;
  const SIZE = 27;
  const INF = Number.MAX_SAFE_INTEGER;

  // Convert character to 0..25
  const idx = (ch: string): number => ch.charCodeAt(0) - 65;

  // Manhattan distance between two letter indices.
  // If one finger is unused, moving it to any letter costs 0
  // because initial positions are free.
  const dist = (a: number, b: number): number => {
    if (a === UNUSED) return 0;
    const r1 = Math.floor(a / 6);
    const c1 = a % 6;
    const r2 = Math.floor(b / 6);
    const c2 = b % 6;
    return Math.abs(r1 - r2) + Math.abs(c1 - c2);
  };

  // dp[f1][f2] = min cost after processing current prefix
  let dp: number[][] = Array.from({ length: SIZE }, () => Array(SIZE).fill(INF));
  dp[UNUSED][UNUSED] = 0;

  for (const ch of word) {
    const target = idx(ch);
    const next: number[][] = Array.from({ length: SIZE }, () => Array(SIZE).fill(INF));

    for (let f1 = 0; f1 < SIZE; f1++) {
      for (let f2 = 0; f2 < SIZE; f2++) {
        const cur = dp[f1][f2];
        if (cur === INF) continue;

        // Option 1: use finger 1 to type current character
        next[target][f2] = Math.min(next[target][f2], cur + dist(f1, target));

        // Option 2: use finger 2 to type current character
        next[f1][target] = Math.min(next[f1][target], cur + dist(f2, target));
      }
    }

    dp = next;
  }

  let ans = INF;
  for (let f1 = 0; f1 < SIZE; f1++) {
    for (let f2 = 0; f2 < SIZE; f2++) {
      ans = Math.min(ans, dp[f1][f2]);
    }
  }

  return ans;
}


// ------------------------
// Console log tests
// ------------------------
console.log(minimumDistance("CAKE"));   // Expected: 3
console.log(minimumDistance("HAPPY"));  // Expected: 6
console.log(minimumDistance("AA"));     // Expected: 0
console.log(minimumDistance("AB"));     // Expected: 0
console.log(minimumDistance("TYPE"));   // Sample verification
console.log(minimumDistance("YEAR"));   // Sample verification
