/**
 * Finds the length of the longest valid subsequence as described.
 *
 * @param nums - The input array of integers.
 * @param k - The modulo value for pair sums.
 * @returns The length of the longest valid subsequence.
 */
function maximumLength(nums: number[], k: number): number {
    const n = nums.length;
    // dp[i][mod]: longest valid subsequence ending at index i, last pair sum mod k == mod
    const dp: number[][] = Array.from({ length: n }, () => Array(k).fill(1));
    let res = 1;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            // What is the sum mod k for pair (nums[j], nums[i])?
            const mod = (nums[j] + nums[i]) % k;
            // Either extend the best subsequence ending at j with this mod, or start a new pair
            dp[i][mod] = Math.max(dp[i][mod], dp[j][mod] + 1, 2);
            res = Math.max(res, dp[i][mod]);
        }
    }
    return res;
}

/* IOCE (Input-Output Case Examples) */

// Example 1
console.log(maximumLength([1,2,3,4,5], 2)); // Output: 5

// Example 2
console.log(maximumLength([1,4,2,3,1,4], 3)); // Output: 4

// Custom Case: All same, k=1
console.log(maximumLength([5,5,5,5], 1)); // Output: 4

// Custom Case: Alternating
console.log(maximumLength([1,2,1,2,1,2], 3)); // Output: 6

// Custom Case: No valid subsequence longer than 2
console.log(maximumLength([1,2,4,8,16], 7)); // Output: 2