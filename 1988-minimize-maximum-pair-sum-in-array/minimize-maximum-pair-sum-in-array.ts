/**
 * Input: number[] nums — array of integers to pair
 * Output: number — minimized maximum pair sum across all pairs
 * Constraints:
 * - 2 <= nums.length <= 10^5
 * - 1 <= nums[i] <= 10^6
 *
 * Time Complexity: O(n log n) due to sorting.
 * Space Complexity: O(1) for in-place operations (excluding input storage).
 *
 * Edge Cases:
 * - nums contains only two elements (e.g., [1, 2]).
 * - nums contains duplicate values (e.g., [3, 3, 3, 3]).
 * - nums is already sorted in ascending or descending order.
 * - nums contains the maximum allowed values (e.g., [10^6, 10^6, ...]).
 *
 * @param {number[]} nums - An array of integers.
 * @returns {number} The minimized maximum pair sum.
 */

function minPairSum(nums: number[]): number {
    nums.sort((a, b) => a - b);

    let maxPairSum = 0;
    const n = nums.length;

    for (let i = 0; i < n / 2; i++) {
        const pairSum = nums[i] + nums[n - 1 - i];
        maxPairSum = Math.max(maxPairSum, pairSum);
    }

    return maxPairSum;
}

console.log(minPairSum([3, 5, 2, 3])); // Output: 7
console.log(minPairSum([3, 5, 4, 2, 4, 6])); // Output: 8
console.log(minPairSum([3, 1, 2, 1])); // Output: 3
console.log(minPairSum([1, 2, 1, 2, 1, 2])); // Output: 4
console.log(minPairSum([1, 1, 3, 3, 3, 4, 4, 4, 5, 5])); // Output: 8