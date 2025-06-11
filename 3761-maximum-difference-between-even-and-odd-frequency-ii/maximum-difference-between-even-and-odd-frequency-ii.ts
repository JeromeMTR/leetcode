/**
 * Find the maximum difference freq[a] - freq[b] for a substring of s (len >= k)
 * such that freq[a] is odd, freq[b] even, and a != b
 *
 * I: s = string of digits '0' to '4', k = minimal substring length
 * O: maximum difference
 * C: 3 <= s.length <= 3*10^4; Only '0'..'4' in s; at least one valid substring exists; 1 <= k <= s.length
 * E:
 *   s = "12233", k = 4 → -1
 *   s = "1122211", k = 3 → 1
 *   s = "110", k = 3 → -1
 */

function maxFreqDifference(s: string, k: number): number {
    // Number of possible characters
    const CHARS = 5;
    const n = s.length;
    const digits = s.split('').map(x => Number(x));

    // prefixFreq[i][d] = how many times digit d appears in s[0..i-1]
    let prefixFreq: number[][] = Array(n + 1);
    for (let i = 0; i <= n; i++) {
        prefixFreq[i] = new Array(CHARS).fill(0);
    }
    for (let i = 1; i <= n; i++) {
        for (let d = 0; d < CHARS; d++) {
            prefixFreq[i][d] = prefixFreq[i - 1][d] + (digits[i - 1] === d ? 1 : 0);
        }
    }

    let maxDiff = -Infinity;

    // Try all substrings of length >= k
    for (let len = k; len <= n; len++) {
        for (let l = 0; l + len <= n; l++) {
            let r = l + len - 1;

            // Get freq in substring s[l..r]
            let freq = new Array(CHARS).fill(0);
            for (let d = 0; d < CHARS; d++) {
                freq[d] = prefixFreq[r + 1][d] - prefixFreq[l][d];
            }

            // Try all pairs (a, b), a ≠ b
            for (let a = 0; a < CHARS; a++) {
                if (freq[a] === 0) continue;
                if (freq[a] % 2 !== 1) continue; // a must be odd
                for (let b = 0; b < CHARS; b++) {
                    if (b === a || freq[b] === 0) continue;
                    if (freq[b] % 2 !== 0) continue; // b must be even
                    maxDiff = Math.max(maxDiff, freq[a] - freq[b]);
                }
            }
        }
    }

    // If not updated, return -1
    return maxDiff === -Infinity ? -1 : maxDiff;
}

// -- IOCE Test cases
console.log(maxFreqDifference("12233", 4)); // Output: -1
console.log(maxFreqDifference("1122211", 3)); // Output: 1
console.log(maxFreqDifference("110", 3)); // Output: -1

/*
Explanation:

Test 1: "12233", k=4
  Only substring of length 4 or 5 is the whole string.
  Possible (a, b): freq['1']=1(odd), freq['3']=2(even) → 1-2 = -1

Test 2: "1122211", k=3
  Substring "11222": freq['2']=3(odd), freq['1']=2(even) → 3-2 = 1

Test 3: "110", k=3
  Substring is only "110"; no pairs with odd/even freq as needed. → -1
*/