/**
 * Computes the triangular sum of the input nums array, by repeatedly summing adjacent elements
 * modulo 10 until only one element remains.
 *
 * @param nums - Array of digits (each 0-9, array length 1 to 1000)
 * @returns The triangular sum as described in the problem
 */
function triangularSum(nums: number[]): number {
    // If only 1 element, return it as the answer.
    if (nums.length === 1) return nums[0];

    // Copy array to avoid mutating input for friendliness.
    let arr = nums.slice();

    // Continue reducing array until one element remains
    while (arr.length > 1) {
        const next: number[] = [];
        for (let i = 0; i < arr.length - 1; ++i) {
            next.push((arr[i] + arr[i + 1]) % 10);
        }
        arr = next; // Move to next shorter array
    }
    return arr[0];
}

// --- IOCE (Input, Output, Constraints, Example) ---

// Input: nums = [1,2,3,4,5]
// Expected output: 8
console.log(triangularSum([1, 2, 3, 4, 5])); // Output: 8

// Input: nums = [5]
// Expected output: 5
console.log(triangularSum([5])); // Output: 5

// Constraint test: single step, length = 2
console.log(triangularSum([7, 2])); // Output: (7 + 2)%10 = 9

// Larger input test
console.log(triangularSum([4,7,6,3,2,1,8,9,0])); // Output: 1

/*
Constraints:
- 1 <= nums.length <= 1000
- 0 <= nums[i] <= 9
*/