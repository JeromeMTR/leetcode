/**
 * Problem: LeetCode 66 — Plus One
 *
 * IOCE:
 * - Input:  digits = [1, 2, 3]
 * - Output: [1, 2, 4]
 *
 * Complexity:
 * - Time: O(n) worst case when the carry propagates through all digits.
 * - Space: O(1) extra space (in-place), plus a possible leading insertion.
 *
 * Edge Cases:
 * - [0] → [1]
 * - [2, 9, 9] → [3, 0, 0]
 * - [9, 9, 9] → [1, 0, 0, 0]
 *
 *  * Approach:
 * - Traverse from right (least significant) to left.
 * - If a digit < 9, increment it and return (no further carry).
 * - If a digit is 9, set it to 0 and keep propagating the carry.
 * - If all digits were 9, prepend 1 at the end to form the final carry (e.g., [9,9,9] → [1,0,0,0]).
 */

/**
 * Increment a large integer represented as an array of digits by one.
 * @param {number[]} digits
 * @return {number[]}
 */

function plusOne(digits: number[]): number[] {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i]++;
      return digits;
    }
    digits[i] = 0;
  }
  digits.unshift(1);
  return digits;
}

// Test cases
console.log(plusOne([1, 2, 3])); // [1, 2, 4]
console.log(plusOne([4, 3, 2, 1])); // [4, 3, 2, 2]
console.log(plusOne([9])); // [1, 0]
console.log(plusOne([9, 9, 9])); // [1, 0, 0, 0]
console.log(plusOne([0])); // [1]
console.log(plusOne([2, 9, 9])); // [3, 0, 0]
