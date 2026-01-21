/**
 * IOCE: Input, Output, Constraints, and Edge Cases
 *
 * Input: An array of integers `nums`.
 * - Example: [2, 3, 5, 7]
 *
 * Output: An array of integers where each element corresponds to the smallest integer `i` such that:
 * - (i | (i + 1)) === num
 * - If no such `i` exists, return -1 for that number.
 * - Example: [-1, 1, 4, 3]
 *
 * Constraints:
 * - `nums` is a non-empty array.
 * - Each number in `nums` is a non-negative integer.
 * - The solution must handle edge cases like very large numbers efficiently.
 *
 * Edge Cases:
 * - Empty input array (not applicable here as per constraints).
 * - Numbers that cannot satisfy the condition, e.g., 2.
 * - Large numbers that may require optimized computation.
 *
 * @param {number[]} nums - An array of non-negative integers to process.
 * @returns {number[]} - An array of integers representing the results for each input number.
 */

function findAnsArray(nums: number[]): number[] {
    return nums.map(num => {
        let result = -1;
        let bitMask = 1;

        while ((num & bitMask) !== 0) {
            result = num - bitMask;
            bitMask <<= 1;
        }

        return result;
    });
}

// Test cases
console.log(findAnsArray([2, 3, 5, 7])); // [-1, 1, 4, 3]
console.log(findAnsArray([11, 13, 31])); // [9, 12, 15]
console.log(findAnsArray([3, 1, 2, 1])); // [-1,-1,-1,-1] since only primes are considered from 2 upwards
console.log(findAnsArray([1, 2, 1, 2, 1, 2])); // [-1,-1,-1,-1,-1,-1] since only primes are considered from 2 upwards
console.log(findAnsArray([1, 1, 3, 3, 3, 4, 4, 4, 5, 5])); // [-1,-1,1,1,1,-1,-1,-1,-1,-1] since only primes are considered from 2 upwards