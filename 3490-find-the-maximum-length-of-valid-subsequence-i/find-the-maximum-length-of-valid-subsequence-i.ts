/**
 * IOCE
 * Input:
 *   nums (number[]): Array of positive integers (2 <= nums.length <= 2e5, 1 <= nums[i] <= 1e7)
 * Output:
 *   number: The length of the longest valid subsequence
 *
 * Explanation:
 *   - For pairs (a, b) in the chosen subsequence, (a+b)%2 must be equal for all adjacent pairs.
 *   - Longest valid subsequence is the longer of:
 *        * most frequent parity (all odds OR all evens)
 *        * longest possible alternating parity (odd-even-odd-even...)
 */

function longestValidSubsequence(nums: number[]): number {
    // Count number of odds and evens
    let oddCount = 0, evenCount = 0;
    for (const num of nums) {
        if (num % 2 === 0) evenCount++;
        else oddCount++;
    }

    // Find the longest possible alternating parity subsequence
    // We can start with either parity, but the answer is oddCount + evenCount if |oddCount - evenCount| <= 1, or 2*min(oddCount, evenCount)+1 otherwise.
    // Actually, for any sequence, the maximal "alternating length" is 2*min(odd, even) + (odd==even?0:1)
    // Let's try both starting with odd and starting with even, and take the maximum.

    function maxAlternatingLength(startParity: number): number {
        let expect = startParity;
        let length = 0;
        for (const num of nums) {
            if (num % 2 === expect) {
                length++;
                expect ^= 1; // toggle expectation
            }
        }
        return length;
    }

    // Try both starting parities
    let alt1 = maxAlternatingLength(0); // start with even
    let alt2 = maxAlternatingLength(1); // start with odd

    // The answer is the best of alternating or all odds or all evens
    return Math.max(alt1, alt2, oddCount, evenCount);
}

// ====== EXAMPLES ======

console.log(longestValidSubsequence([1,2,3,4])); // Output: 4
console.log(longestValidSubsequence([1,2,1,1,2,1,2])); // Output: 6
console.log(longestValidSubsequence([1,3])); // Output: 2

/*
EXPLANATION:

Example 1: [1,2,3,4]
    Parities: [1,0,1,0]
    Longest alternating: 4 ([1,2,3,4])
    All odds: 2, All evens: 2; Answer: 4

Example 2: [1,2,1,1,2,1,2]
    Parities: [1,0,1,1,0,1,0]
    Longest alternating: [1,2,1,2,1,2] (or others) => 6
    All odds: 4, All evens: 3; Answer: 6

Example 3: [1,3]
    Parities: [1,1]; All odds: 2
    Alternating: [1] or [3] => length 1
    Best is all odds: 2
*/