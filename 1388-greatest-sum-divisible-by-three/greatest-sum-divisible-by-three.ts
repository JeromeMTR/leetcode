/**
 * Finds the maximum sum of a subset of nums such that the sum is divisible by 3.
 * @param nums Array of integers
 * @returns Maximum possible sum that is divisible by 3
 */
function maxSumDivThree(nums: number[]): number {
    // dp[i]: max sum with mod 3 == i
    let dp: number[] = [0, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY];

    for (let num of nums) {
        // Copy previous state to avoid overwriting values in same iteration
        const prev = [...dp];
        for (let i = 0; i < 3; i++) {
            // Try adding num to previous sum with mod 3 == i
            const newMod = (i + num % 3) % 3;
            dp[newMod] = Math.max(dp[newMod], prev[i] + num);
        }
    }

    // dp[0] will contain the largest sum divisible by 3
    return dp[0];
}

/* IOCE (Input, Output, Constraints, Examples):

Input: nums: number[]

Output: number (maximum sum divisible by 3)

Constraints:
  - 1 <= nums.length <= 4*10^4
  - 1 <= nums[i] <= 10^4

Examples:
  maxSumDivThree([3,6,5,1,8]) -> 18
  maxSumDivThree([4]) -> 0
  maxSumDivThree([1,2,3,4,4]) -> 12
  maxSumDivThree([3,1,2,1]) -> 6
  maxSumDivThree([1,2,1,2,1,2]) -> 9
  maxSumDivThree([1,1,3,3,3,4,4,4,5,5]) -> 27
*/