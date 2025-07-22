/**
 * Returns the maximum sum of any subarray with unique elements.
 * Uses sliding window + Set for O(N) time.
 * @param nums Array of positive integers
 * @returns Maximum score by erasing one unique-element subarray
 */
function maximumUniqueSubarray(nums: number[]): number {
    let seen = new Set<number>();      // Set to record unique elements in the current window
    let maxSum = 0;                    // Maximum sum found
    let currentSum = 0;                // Sum of current window
    let left = 0;                      // Left pointer of window

    // Extend the window using the right pointer
    for (let right = 0; right < nums.length; right++) {
        // If nums[right] is a duplicate, move the left pointer to the right,
        // removing elements from set and sum until duplicate is removed
        while (seen.has(nums[right])) {
            seen.delete(nums[left]);
            currentSum -= nums[left];
            left++;
        }
        // add nums[right] to window
        seen.add(nums[right]);
        currentSum += nums[right];
        maxSum = Math.max(maxSum, currentSum); // Update max sum found
    }
    return maxSum;
}

/* IOCE (Input Output Constraint Example) */

// Example 1
const ex1 = [4,2,4,5,6];
// Explanation: [2,4,5,6] is optimal, sum = 17
console.log(maximumUniqueSubarray(ex1)); // Output: 17

// Example 2
const ex2 = [5,2,1,2,5,2,1,2,5];
// Any of [5,2,1], [2,1,5], [1,2,5] => sum = 8
console.log(maximumUniqueSubarray(ex2)); // Output: 8

// Edge Case: all unique
const ex3 = [1,2,3,4,5];
console.log(maximumUniqueSubarray(ex3)); // Output: 15

// Edge Case: all same
const ex4 = [7,7,7,7];
console.log(maximumUniqueSubarray(ex4)); // Output: 7

// Large input (test performance)
const ex5 = Array(1e5).fill(1).map((x, i) => i + 1);
console.log(maximumUniqueSubarray(ex5)); // Output: 5000050000

/* 
Constraints:
1 <= nums.length <= 1e5
1 <= nums[i] <= 1e4
*/