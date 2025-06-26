/**
 * Find the length of the longest subsequence of s
 * that is a binary number <= k.
 * 
 * @param s binary string
 * @param k positive integer
 * @returns length of the longest subsequence <= k
 */
function longestSubsequence(s: string, k: number): number {
    const n = s.length;
    let zeroCount = 0;

    // First, count all zeros; we can always take them
    for (let ch of s) {
        if (ch === '0') zeroCount++;
    }

    // Try to add '1's from the right as long as the value remains <= k
    let value = 0;
    let addedOnes = 0;
    let power = 1;

    for (let i = n - 1; i >= 0; i--) {
        if (s[i] === '1') {
            // See what happens if we include this '1'
            if (power > k) break; // next inclusion will always overflow
            if (value + power <= k) {
                value += power;
                addedOnes++;
            }
        }
        // Prepare next bit (leftward = one power higher)
        power *= 2;
        // For large string, be careful not to let 'power' overflow max int
        // Since k <= 10^9, power > k means any higher bit can't be included anymore.
        if (power > k) break; 
    }

    // Total is the zeros plus ones we've been able to include
    return zeroCount + addedOnes;
}

// =======================
// IOCE (Input/Output + Explanation)
// =======================

// Example 1
const s1 = "1001010";
const k1 = 5;
console.log(longestSubsequence(s1, k1)); // Output: 5
// Explanation: "00010", "00101", or "00100" are valid - all length 5

// Example 2
const s2 = "00101001";
const k2 = 1;
console.log(longestSubsequence(s2, k2)); // Output: 6
// Explanation: "000001" is valid (binary 1); length 6.

// Additional test (all zeros)
const s3 = "00000";
const k3 = 5;
console.log(longestSubsequence(s3, k3)); // Output: 5
// Explanation: All zeros can be included. Value = 0 <= 5