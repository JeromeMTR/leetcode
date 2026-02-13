/**
 * Longest Balanced Substring (letters only: 'a', 'b', 'c')
 *
 * IOCE
 * Inputs:
 *  - s: string consisting only of 'a', 'b', 'c'
 *
 * Outputs:
 *  - number: length of the longest balanced non-empty substring
 *
 * Constraints:
 *  - 1 <= s.length <= 1e5
 *
 * Edge Cases:
 *  - single-character string => answer is 1
 *  - all same character => entire string is balanced
 *  - substrings can be balanced with:
 *      * exactly 1 distinct letter (trivially balanced)
 *      * exactly 2 distinct letters with equal counts
 *      * all 3 letters with equal counts
 *
 */

function longestBalanced(s: string): number {
    if (s.length === 0) return 0;

  // 1) Single-character runs
  let result = longestSingleRun(s);

  // 2) Two-letter equal counts within segments that exclude the third letter
  result = Math.max(
    result,
    longestEqualTwoLettersOnly(s, 'a', 'b', 'c'),
    longestEqualTwoLettersOnly(s, 'a', 'c', 'b'),
    longestEqualTwoLettersOnly(s, 'b', 'c', 'a')
  );

  // 3) All three letters equal counts
  result = Math.max(result, longestAllThreeEqual(s));

  return result;
};

function longestEqualTwoLettersOnly(s: string, x: string, y: string, z: string): number {
  let ans = 0;
  let diff = 0;
  // Map from diff to earliest index where this diff occurred in the current segment.
  // Seed with diff=0 at index -1 (or at the last z index when we reset).
  const firstIndex = new Map<number, number>();
  firstIndex.set(0, -1);

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];

    if (ch === z) {
      // Reset because substring cannot include 'z'.
      diff = 0;
      firstIndex.clear();
      firstIndex.set(0, i); // Pretend the "prefix before the new segment start" is at i.
      continue;
    }

    if (ch === x) diff += 1;
    else if (ch === y) diff -= 1;
    // no else needed: only 'a','b','c' per constraints

    if (firstIndex.has(diff)) {
      const j = firstIndex.get(diff)!;
      ans = Math.max(ans, i - j);
    } else {
      firstIndex.set(diff, i);
    }
  }

  return ans;
}

/**
 * Helper: longest substring where counts of all three letters are equal.
 * Use 2D prefix differences: key = (A-B, A-C).
 * If the same key appears at positions j and i, then between (j+1..i) we have ΔA=ΔB=ΔC.
 */
function longestAllThreeEqual(s: string): number {
  let A = 0, B = 0, C = 0;
  let ans = 0;

  const key = (v1: number, v2: number) => `${v1}#${v2}`;
  const seen = new Map<string, number>();
  seen.set(key(0, 0), -1);

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === 'a') A++;
    else if (ch === 'b') B++;
    else C++; // 'c'

    const k = key(A - B, A - C);
    if (seen.has(k)) {
      const j = seen.get(k)!;
      ans = Math.max(ans, i - j);
    } else {
      seen.set(k, i);
    }
  }

  return ans;
}

/**
 * Helper: longest single-character run (since single-char substrings are balanced).
 */
function longestSingleRun(s: string): number {
  if (s.length === 0) return 0;
  let ans = 1;
  let run = 1;
  for (let i = 1; i < s.length; i++) {
    if (s[i] === s[i - 1]) {
      run++;
    } else {
      run = 1;
    }
    if (run > ans) ans = run;
  }
  return ans;
}

/* ------------------------- Console log tests ------------------------- */
console.log(longestBalanced("abbac"), "expected", 4);   // "abba"
console.log(longestBalanced("aabcc"), "expected", 3);   // "abc"
console.log(longestBalanced("aba"), "expected", 2);     // "ab" or "ba"

console.log(longestBalanced("a"), "expected", 1);
console.log(longestBalanced("aaaaa"), "expected", 5);
console.log(longestBalanced("abcabc"), "expected", 6);  // a,b,c each 2
console.log(longestBalanced("abccba"), "expected", 6);  // a,b,c each 2
console.log(longestBalanced("abca"), "expected", 3);    // "abc"
console.log(longestBalanced("bbbaaac"), "expected", 6); // "bbbaaa"
console.log(longestBalanced("acbacb"), "expected", 6);  // a,b,c each 2
