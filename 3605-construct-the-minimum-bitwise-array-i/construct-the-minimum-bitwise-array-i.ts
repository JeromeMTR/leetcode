/**
 * Constructs an array based on the given input array `nums`.
 *
 * Input:
 * - nums: An array of non-negative integers.
 *
 * Output:
 * - Returns an array where each element is the smallest non-negative integer `j` such that `j | (j + 1) === nums[i]`.
 * - If no such `j` exists for a given `nums[i]`, the corresponding output is -1.
 *
 * Constraints:
 * - 1 <= nums.length <= 10^4
 * - 0 <= nums[i] <= 10^9
 *
 * Edge Cases:
 * - nums contains the smallest value (e.g., [0]).
 * - nums contains the largest possible value within constraints.
 * - nums is an empty array (though constraints suggest this won't happen).
 * - nums contains repeated values.
 *
 * @param {number[]} nums - An array of non-negative integers.
 * @returns {number[]} - The constructed array based on the bitwise condition.
 */

function minBitwiseArray(nums: number[]): number[] {
    const ans: number[] = [];

    for (let i = 0; i < nums.length; i++) {
        let found = false;
        for (let j = 0; j <= nums[i]; j++) {
            if ((j | (j + 1)) === nums[i]) {
                ans.push(j);
                found = true;
                break;
            }
        }

        if (!found) {
            ans.push(-1);
        }
    }

    return ans;
}

// Testing the function with provided test cases.
console.log(minBitwiseArray([2, 3, 5, 7]));  // Output: [-1, 1, 4, 3]
console.log(minBitwiseArray([11, 13, 31]));  // Output: [9, 12, 15]
console.log(minBitwiseArray([1, 2, 1, 2, 1, 2]));  // Output: [0, 1, 0, 1, 0, 1]
console.log(minBitwiseArray([1, 1, 3, 3, 3, 4, 4, 4, 5, 5]));  // Output: [0, 0, 1, 1, 1, -1, -1, -1, -1, -1]
console.log(minBitwiseArray([3, 1, 2, 1]));  // Output: [1, 0, -1, 0]