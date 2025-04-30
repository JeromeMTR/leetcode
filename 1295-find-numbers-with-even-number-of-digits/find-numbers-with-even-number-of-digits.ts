/**
 * Function to count numbers with an even number of digits.
 * @param nums - An array of integers.
 * @returns The number of integers with an even number of digits.
 */
function findNumbersWithEvenDigits(nums: number[]): number {
    let countEvenDigits = 0;

    for (const num of nums) {
        // Convert the number to a string and get its length
        const digitCount = num.toString().length;

        // Check if the number of digits is even
        if (digitCount % 2 === 0) {
            countEvenDigits++;
        }
    }

    return countEvenDigits;
}

// Example Usage
const nums1 = [12, 345, 2, 6, 7896];
console.log(findNumbersWithEvenDigits(nums1)); // Output: 2

const nums2 = [555, 901, 482, 1771];
console.log(findNumbersWithEvenDigits(nums2)); // Output: 1

// IOCE
// Input: An array `nums` where 1 <= nums.length <= 500 and 1 <= nums[i] <= 10^5
// Output: Number of integers in the array with an even number of digits
// Constraints: 1 <= nums.length <= 500, 1 <= nums[i] <= 10^5
// Examples:
// 1. Input: [12, 345, 2, 6, 7896], Output: 2
// 2. Input: [555, 901, 482, 1771], Output: 1