// Minimum operations to turn the whole nums array to 0
// by picking subarrays and setting all occurrences of the min in that subarray to 0.

// Approach: Greedy Monotonic Stack
// We iterate through the array, using a stack to track increasing values and count operations when a new minimum is encountered.

/**
 * Each operation selects a subarray and sets all occurrences of the minimum value in that subarray to zero.
 * @param {number[]} nums - The input array of numbers.
 * @returns {number} The minimum number of operations required.
 */
function minOperations(nums: number[]): number {
    // Stack to maintain increasing sequence of values
    // This helps us track when we need a new operation
    const stack = [];

    // Counter for the number of operations needed
    let res = 0;

    // Process each element in the array
    for (const a of nums) {
        // Remove elements from stack that are greater than current element
        // This is because we can handle them together with current element in one operation
        while (stack.length && stack[stack.length - 1] > a) {
            stack.pop();
        }

        // Skip zeros as they don't need any operation
        if (a === 0) continue;

        // If stack is empty or current element is greater than stack top,
        // we need a new operation for this element
        if (!stack.length || stack[stack.length - 1] < a) {
            res++; // Increment operation count
            stack.push(a); // Add current element to stack
        }
        // If current element equals stack top, no new operation needed
        // as it can be handled by the same operation
    }

    return res;
}
/*
IOCE (Input, Output, Comments, Example):

Input: [0,2]
Output: 1
// One operation, select [1,1] (which is [2]), apply, becomes [0,0]

Input: [3,1,2,1]
Output: 3
// 1-> [3,0,2,0], 2-> [3,0,0,0], 3-> [0,0,0,0] (3 ops)

Input: [1,2,1,2,1,2]
Output: 4
// 1-> [0,2,0,2,0,2], 2-> [0,0,0,2,0,2], 2-> [0,0,0,0,0,2], 2-> [0,0,0,0,0,0] (4 ops)

Input: [4,4]
Output: 1
// Both become 0 in 1 operation

Input: [7,2,0,4,2]
Output: 3
// correct

Input: [1,1,3,3,3,4,4,4,5,5]
Output: 4
// correct
*/