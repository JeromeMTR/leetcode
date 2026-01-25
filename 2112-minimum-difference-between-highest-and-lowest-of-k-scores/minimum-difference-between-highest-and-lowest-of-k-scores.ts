/**
 * IOCE (Input, Output, Constraints, Edge cases)
 *
 * Input:
 * - `nums`: array of student scores as integers.
 * - `k`: number of students to select (size of the window).
 *
 * Output:
 * - Minimum possible difference between the highest and lowest scores among any group of `k` students.
 *
 * Constraints:
 * - 1 ≤ `k` ≤ `nums.length`.
 * - `nums.length` ≥ 1.
 * - Scores are integers; sorting `nums` is allowed (O(n log n)).
 *
 * Edge cases:
 * - `k` = 1 → answer is 0 (any single score window has diff 0).
 * - All scores equal → answer is 0.
 * - `nums` already sorted or reverse-sorted → logic still holds.
 */
/**
 * Finds the minimum difference between the highest and lowest scores among any contiguous selection of `k` scores
 * after sorting the array.
 *
 * @param {number[]} nums - List of student scores.
 * @param {number} k - The number of students to select in each group.
 * @returns {number} The minimum difference between the highest and lowest scores within any group of size `k`.
 */

function minimumDifference(nums: number[], k: number): number {
    // Sort the array of scores
    nums.sort((a, b) => a - b);

    // Initialize the minimum difference as a large number
    let minDifference = Infinity;

    // Iterate over the sorted array to find the minimum difference in all k-length segments
    for (let i = 0; i <= nums.length - k; i++) {
        // Calculate the difference between the highest and lowest scores in the current segment
        const currentDifference = nums[i + k - 1] - nums[i];

        // Update the minimum difference if the current difference is smaller
        if (currentDifference < minDifference) {
            minDifference = currentDifference;
        }
    }

    return minDifference;
}

// Test cases
console.log(minimumDifference([90], 1)); // Output: 0
console.log(minimumDifference([9, 4, 1, 7], 2)); // Output: 2
console.log(minimumDifference([3, 1, 2, 1], 2)); // Output: 0
console.log(minimumDifference([1, 2, 1, 2, 1, 2], 5)); // Output: 1
console.log(minimumDifference([1, 1, 3, 3, 3, 4, 4, 4, 5, 5], 5)); // Output: 1