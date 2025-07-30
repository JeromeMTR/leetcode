/**
 * Finds the length of the longest subarray whose bitwise AND equals the max element.
 * @param nums Input integer array
 * @returns Length of the longest qualifying subarray
 */
function longestSubarray(nums: number[]): number {
    // Find the maximum value in nums (k)
    let k = Math.max(...nums);

    let maxLen = 0; // The answer
    let currLen = 0; // Current run of k's

    for (let n of nums) {
        if (n === k) {
            currLen += 1;
            if (currLen > maxLen) maxLen = currLen;
        } else {
            currLen = 0;
        }
    }

    return maxLen;
}

/* IOCE — Input, Output, Constraints, Example */

// Example 1:
console.log(longestSubarray([1,2,3,3,2,2])); 
// Output: 2
// Explanation: Longest run of 3's is two ([3,3]), and max AND is 3

// Example 2:
console.log(longestSubarray([1,2,3,4])); 
// Output: 1
// Explanation: Max is 4, only appears once

// Edge: All same
console.log(longestSubarray([7,7,7,7])); 
// Output: 4

// Edge: No consecutive max
console.log(longestSubarray([1,5,2,5,3,5])); 
// Output: 1

// Edge: All decreasing
console.log(longestSubarray([5,4,3,2,1])); 
// Output: 1

// Edge: Max at start and end
console.log(longestSubarray([9,2,1,9])); 
// Output: 1

// Large input check (see constraints)
const big = Array(100_000).fill(123456);
console.log(longestSubarray(big)); 
// Output: 100000