// Function to find the final value after repeatedly doubling when found in nums
function findFinalValue(nums: number[], original: number): number {
    // Use a Set for fast lookup (O(1) time for .has)
    const numSet = new Set(nums);

    // Repeat while original is found in nums
    while (numSet.has(original)) {
        original *= 2;
    }

    // Return the value when original is NOT found in nums
    return original;
}

/* IOCE (Input Output Constraints & Examples)

// Example 1:
console.log(findFinalValue([5, 3, 6, 1, 12], 3)); // Output: 24

// Example 2:
console.log(findFinalValue([2, 7, 9], 4)); // Output: 4

// Edge Cases from Previous Attempts:
//
// Input: [3,1,2,1], original: 3
// - 3 found in [3,1,2,1], double -> 6 not in array, stop -> returns 6
console.log(findFinalValue([3,1,2,1], 3)); // Output: 6
//
// Input: [1,2,1,2,1,2], original: 1
// - 1 found -> 2, 2 found -> 4, 4 not found -> returns 4
console.log(findFinalValue([1,2,1,2,1,2], 1)); // Output: 4
//
// Input: [1,1,3,3,3,4,4,4,5,5], original: 3
// - 3 found -> 6, 6 not found -> returns 6
console.log(findFinalValue([1,1,3,3,3,4,4,4,5,5], 3)); // Output: 6

*/

// Constraints:
// 1 <= nums.length <= 1000
// 1 <= nums[i], original <= 1000