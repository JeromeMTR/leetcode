/**
 * Find the minimum distance between `start` and any index `i`
 * such that nums[i] === target.
 *
 * IOCE
 * ----
 * Inputs:
 * - nums: number[]         -> 0-indexed integer array
 * - target: number         -> value we want to find in nums
 * - start: number          -> starting index
 *
 * Output:
 * - number                 -> minimum value of abs(i - start)
 *                            where nums[i] === target
 *
 * Constraints:
 * - 1 <= nums.length <= 1000
 * - 1 <= nums[i] <= 10^4
 * - 0 <= start < nums.length
 * - target is guaranteed to exist in nums
 *
 * Time Complexity:
 * - O(n)
 * Space Complexity:
 * - O(1)
 *
 * Edge Cases:
 * - Array has only one element
 * - start itself points to target, answer is 0
 * - target appears multiple times
 * - target appears only once
 * - target appears on both sides of start
 */

function getMinDistance(nums: number[], target: number, start: number): number {
    // Initialize answer with a very large value.
    let minDistance = Number.MAX_SAFE_INTEGER;

    // Check every index in the array.
    for (let i = 0; i < nums.length; i++) {
        // If current value matches target,
        // compute its distance from start.
        if (nums[i] === target) {
            const distance = Math.abs(i - start);

            // Update minimum distance if smaller.
            if (distance < minDistance) {
                minDistance = distance;
            }
        }
    }

    return minDistance;
}


// -------------------------
// Console log tests
// -------------------------

console.log(getMinDistance([1, 2, 3, 4, 5], 5, 3)); // Expected: 1
console.log(getMinDistance([1], 1, 0)); // Expected: 0
console.log(getMinDistance([1,1,1,1,1,1,1,1,1,1], 1, 0)); // Expected: 0
console.log(getMinDistance([5, 3, 6, 1, 3], 3, 2)); // Expected: 1
console.log(getMinDistance([2, 4, 6, 8, 6], 6, 0)); // Expected: 2
