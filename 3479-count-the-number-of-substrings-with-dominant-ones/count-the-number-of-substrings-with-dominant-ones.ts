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
    function numberOfSubstrings(s: string): number {
    const n = s.length;
    // Create prefix array to track positions of zeros
    // pre[i] stores the rightmost position where a zero appears before position i
    const pre: number[] = new Array(n + 1);
    pre[0] = -1; // Initialize with -1 (no zero before start)

    // Build the prefix array
    for (let i = 0; i < n; i++) {
        // If this is the first character or the previous character is '0'
        if (i === 0 || (i > 0 && s[i - 1] === "0")) {
            pre[i + 1] = i; // Set current position as the latest zero position
        } else {
            pre[i + 1] = pre[i]; // Inherit the previous zero position
        }
    }

    let res = 0; // Result counter for valid substrings

    // Iterate through each possible ending position (1-indexed)
    for (let i = 1; i <= n; i++) {
        // Count zeros: if current character is '0', start with 1, else 0
        let cnt0 = s[i - 1] === "0" ? 1 : 0;
        let j = i; // Start from current ending position

        // Optimization: only consider up to n zeros (since cnt0^2 <= n for efficiency)
        while (j > 0 && cnt0 * cnt0 <= n) {
            // Calculate number of ones in substring from pre[j]+1 to i
            // Total length is (i - pre[j]), minus zeros gives us ones
            const cnt1 = i - pre[j] - cnt0;

            // Check if substring has dominant ones: ones >= zeros^2
            if (cnt0 * cnt0 <= cnt1) {
                // Add valid substrings: either all possible starting positions
                // or limited by the dominance condition
                res += Math.min(j - pre[j], cnt1 - cnt0 * cnt0 + 1);
            }

            // Move to the next zero position backwards
            j = pre[j];
            cnt0++; // Increment zero count for next iteration
        }
    }
    return res;
}
    return numberOfSubstrings(s);
}

// Simple IOCE checks for sanity
console.log(countDominantOnesSubstrings("00011")); // 5
console.log(countDominantOnesSubstrings("101101")); // 16

// Edge cases and stress test
// console.log(countDominantOnesSubstrings("1".repeat(40000))); // maximal ones case
// console.log(countDominantOnesSubstrings("0".repeat(40000))); // maximal zeros case