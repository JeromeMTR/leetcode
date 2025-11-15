/**
 * Returns the number of substrings with dominant ones.
 * A substring has dominant ones if ones_count >= zeros_count^2
 * 
 * @param s binary string consisting of only '0' and '1'
 * @returns number of substrings with dominant ones
 * 
 * IOCE
 * Input: "00011"
 * Output: 5
 * 
 * Input: "101101"
 * Output: 16
 * 
 * Approach:
 *  - For each possible starting point, we only need to consider up-to 200 zeros in a substring
 *    (since with more than 200 zeros, zeros^2 > 4e4 so ones_count will never catch up within string length constraint)
 *  - For each substring starting at i, try up to next 200 zeros and count ones as we go
 *  - Use this as an efficient check, total time O(n * 200) == 8e6
 */

function countDominantOnesSubstrings(s: string): number {
    const n = s.length;
    let total = 0;
    const MAX_ZEROS = 200; // sqrt(4e4) ~ 200

    for (let i = 0; i < n; i++) {
        let zeros = 0, ones = 0;
        for (let j = i; j < n; j++) {
            if (s[j] === '0') {
                zeros++;
            } else {
                ones++;
            }
            // If zeros exceed MAX_ZEROS, zeros^2 would exceed string length, break early
            if (zeros > MAX_ZEROS) break;
            if (ones >= zeros * zeros) {
                total++;
            }
        }
    }
    return total;
}

// Simple IOCE checks for sanity
console.log(countDominantOnesSubstrings("00011")); // 5
console.log(countDominantOnesSubstrings("101101")); // 16

// Edge cases and stress test
// console.log(countDominantOnesSubstrings("1".repeat(40000))); // maximal ones case
// console.log(countDominantOnesSubstrings("0".repeat(40000))); // maximal zeros case