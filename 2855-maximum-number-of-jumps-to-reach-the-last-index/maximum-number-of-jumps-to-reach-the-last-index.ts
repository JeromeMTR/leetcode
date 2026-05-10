/*
IOCE

Inputs:
- nums: number[]
  - 0-indexed array of integers
- target: number
  - allowed absolute difference range for a valid forward jump:
    -target <= nums[j] - nums[i] <= target

Output:
- number
  - maximum number of jumps needed to reach index n - 1 from index 0
  - return -1 if index n - 1 cannot be reached

Constraints:
- 2 <= nums.length <= 1000
- -1e9 <= nums[i] <= 1e9
- 0 <= target <= 2e9

Edge Cases:
- No valid path from index 0 to index n - 1 => return -1
- Direct jump from 0 to n - 1
- target = 0, so only equal-valued transitions are allowed
- Multiple possible paths: we need the path with the maximum number of jumps, not minimum
- Negative values in nums
- Smallest size n = 2

*/

function maximumJumps(nums: number[], target: number): number {
    const n = nums.length;
    const dp: number[] = new Array(n).fill(Number.NEGATIVE_INFINITY);

    // Starting position: index 0 is reachable with 0 jumps
    dp[0] = 0;

    for (let j = 1; j < n; j++) {
        for (let i = 0; i < j; i++) {
            const diff = nums[j] - nums[i];

            // Check whether jump i -> j is valid and i is reachable
            if (dp[i] !== Number.NEGATIVE_INFINITY && diff >= -target && diff <= target) {
                dp[j] = Math.max(dp[j], dp[i] + 1);
            }
        }
    }

    return dp[n - 1] === Number.NEGATIVE_INFINITY ? -1 : dp[n - 1];
}


// ----------------------
// Console log tests
// ----------------------

console.log(maximumJumps([1, 3, 6, 4, 1, 2], 2)); // Expected: 3
console.log(maximumJumps([1, 3, 6, 4, 1, 2], 3)); // Expected: 5
console.log(maximumJumps([1, 3, 6, 4, 1, 2], 0)); // Expected: -1
