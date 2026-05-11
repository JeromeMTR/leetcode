/**
 * IOCE
 *
 * Inputs:
 * - nums: number[]
 *   - An array of positive integers.
 *
 * Output:
 * - number[]
 *   - A flattened array containing the digits of each number in nums,
 *     preserving the original order of numbers and digits.
 *
 * Constraints:
 * - 1 <= nums.length <= 1000
 * - 1 <= nums[i] <= 10^5
 *
 * Edge Cases:
 * - Single element array: [7] -> [7]
 * - All single-digit numbers: [7,1,3] -> [7,1,3]
 * - Numbers containing zero inside them: [10921] -> [1,0,9,2,1]
 * - Maximum valid value: [100000] -> [1,0,0,0,0,0]
 */

function separateDigits(nums: number[]): number[] {
    const answer: number[] = [];

    for (const num of nums) {
        // Convert number to string, then push each character as a digit
        for (const ch of num.toString()) {
            answer.push(Number(ch));
        }
    }

    return answer;
}

// Console log tests
console.log(separateDigits([13, 25, 83, 77])); // [1,3,2,5,8,3,7,7]
console.log(separateDigits([7, 1, 3, 9]));     // [7,1,3,9]
console.log(separateDigits([10921]));          // [1,0,9,2,1]
console.log(separateDigits([100000]));         // [1,0,0,0,0,0]
console.log(separateDigits([5]));              // [5]
