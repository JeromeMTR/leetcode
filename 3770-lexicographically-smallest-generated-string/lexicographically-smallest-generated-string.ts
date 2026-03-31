/*
IOCE

Inputs:
- str1: string of length n, only 'T' and 'F'
- str2: string of length m, only lowercase English letters

Output:
- Return the lexicographically smallest string `word` of length n + m - 1 such that:
  - if str1[i] === 'T', then word.substring(i, i + m) === str2
  - if str1[i] === 'F', then word.substring(i, i + m) !== str2
- If impossible, return ""

Constraints:
- 1 <= n <= 1e4
- 1 <= m <= 500
- Time target should be near O(n * m), since n is large and m is moderate
- Space should be manageable, around O(n * m) in worst-case if needed, but preferably optimized

Edge Cases:
1. All positions are 'T':
   - every required copy of str2 must overlap consistently
   - if overlaps conflict, answer is impossible
2. All positions are 'F':
   - choose lexicographically smallest string, but every window must differ from str2
3. m = 1:
   - each position directly constrained to equal or not equal one character
4. n = 1:
   - only one window exists
5. Forced letters from different 'T' windows may conflict
6. A window marked 'F' may become fully forced equal to str2, making answer impossible
7. Unforced positions should be filled as small as possible lexicographically

Idea:
1. Build the result array of length L = n + m - 1.
2. Apply all 'T' constraints:
   - word[i + j] must equal str2[j]
   - if conflict appears, return ""
3. Now satisfy all 'F' constraints:
   - each such window must contain at least one mismatch with str2
   - if it already has a forced mismatch, it's automatically satisfied
   - otherwise, if all positions are forced equal, impossible
   - else we must ensure at least one free position in that window is assigned a different character
4. To keep lexicographically smallest:
   - default all remaining free positions to 'a'
   - but some 'F' windows may still become equal to str2 if every free position also gets matching chars
   - greedily "break" such windows by changing the rightmost possible free position in that window,
     because changing later positions hurts lexicographic order less
5. Efficiently process windows:
   - Track which positions are forced by 'T'
   - For each 'F' window:
     - if any forced mismatch exists => satisfied
     - otherwise collect whether it has a free position
   - While scanning windows left to right, if a window would equal str2 under current assignments,
     change one rightmost free position inside it to a character != needed one
   - A DSU / next-pointer can help find the rightmost still-changeable free position in a range efficiently

Why greedy rightmost works:
- We only modify when necessary.
- To minimize lexicographically, postpone changes as far right as possible.
- At a chosen position p, use the smallest character different from str2[p - i] for the active window.
  Since default is 'a', usually choose 'a' if it mismatches, otherwise 'b'.

Complexities:
- Applying T constraints: O(n * m)
- Checking/satisfying F constraints with per-window scans: O(n * m)
- Total: O(n * m), acceptable since 1e4 * 500 = 5e6
- Space: O(n + number of windows * some bookkeeping) => O(n + n*m?) but here O(n)

*/

function generateString(str1: string, str2: string): string {
    const n = str1.length;
    const m = str2.length;
    const L = n + m - 1;

    // result characters; '?' means not assigned yet
    const word: string[] = new Array(L).fill('?');

    // forced[i] = true if position i was fixed by some 'T' constraint
    const forced: boolean[] = new Array(L).fill(false);

    // Step 1: apply all 'T' windows
    for (let i = 0; i < n; i++) {
        if (str1[i] === 'T') {
            for (let j = 0; j < m; j++) {
                const pos = i + j;
                const ch = str2[j];
                if (word[pos] !== '?' && word[pos] !== ch) {
                    return "";
                }
                word[pos] = ch;
                forced[pos] = true;
            }
        }
    }

    /*
      Step 2: Pre-check 'F' windows:
      - If there is already a forced mismatch in the window, it is satisfied forever.
      - If every position is forced and all equal to str2, impossible.
      - Otherwise this window may need to be "broken" later by assigning some free position.
    */

    // For each F-window, whether it is already satisfied by a forced mismatch
    const satisfiedByForcedMismatch: boolean[] = new Array(n).fill(false);

    for (let i = 0; i < n; i++) {
        if (str1[i] !== 'F') continue;

        let hasForcedMismatch = false;
        let allForcedAndEqual = true;

        for (let j = 0; j < m; j++) {
            const pos = i + j;
            if (forced[pos]) {
                if (word[pos] !== str2[j]) {
                    hasForcedMismatch = true;
                    break;
                }
            } else {
                allForcedAndEqual = false;
            }
        }

        if (hasForcedMismatch) {
            satisfiedByForcedMismatch[i] = true;
        } else if (allForcedAndEqual) {
            return "";
        }
    }

    /*
      Step 3:
      Fill all remaining positions with 'a' initially for lexicographic minimum.
      But some F-windows might exactly equal str2. For those windows, break them.

      Greedy:
      - process F windows left to right
      - if current window equals str2, change the rightmost non-forced position in it
      - choose smallest possible char != str2[offset]
      - rightmost choice preserves lexicographic minimality best
    */

    for (let i = 0; i < L; i++) {
        if (word[i] === '?') word[i] = 'a';
    }

    // canChange[i] means not forced by T and not already changed before.
    // Once we change a position away from default, we should not change it again,
    // because first chosen value is already lexicographically minimal for that moment.
    const changed: boolean[] = new Array(L).fill(false);

    for (let i = 0; i < n; i++) {
        if (str1[i] !== 'F') continue;
        if (satisfiedByForcedMismatch[i]) continue;

        // Check whether current window equals str2
        let equal = true;
        for (let j = 0; j < m; j++) {
            if (word[i + j] !== str2[j]) {
                equal = false;
                break;
            }
        }

        if (!equal) continue;

        // Need to break this window.
        // Choose the rightmost non-forced position in [i, i+m-1].
        let chosen = -1;
        for (let pos = i + m - 1; pos >= i; pos--) {
            if (!forced[pos]) {
                chosen = pos;
                break;
            }
        }

        if (chosen === -1) {
            // all forced, and equal => impossible
            return "";
        }

        const offset = chosen - i;
        const need = str2[offset];

        // Choose lexicographically smallest character different from `need`
        // Usually 'a', unless need is 'a', then 'b'
        word[chosen] = need === 'a' ? 'b' : 'a';
        changed[chosen] = true;
    }

    // Final validation (safe and simple)
    const ans = word.join("");

    for (let i = 0; i < n; i++) {
        const sub = ans.substring(i, i + m);
        if (str1[i] === 'T') {
            if (sub !== str2) return "";
        } else {
            if (sub === str2) return "";
        }
    }

    return ans;
}


// -------------------- Tests --------------------

console.log(generateString("TFTF", "ab"));   // expected: "ababa"
console.log(generateString("TFTF", "abc"));  // expected: ""
console.log(generateString("F", "d"));       // expected: "a"

console.log(generateString("T", "a"));       // expected: "a"
console.log(generateString("F", "a"));       // expected: "b"
console.log(generateString("FF", "a"));      // expected: "bb" or lexicographically smallest valid => "bb"
console.log(generateString("TT", "ab"));     // expected: "" because overlap conflicts: "ab" and "ab" at shift 1 => b must equal a
console.log(generateString("TF", "ab"));     // expected: "aba"
console.log(generateString("FT", "ab"));     // expected: "aab"
console.log(generateString("FFF", "aa"));    // one valid lexicographically small answer