/**
 * Returns the number of non-empty subarrays consisting only of zeros.
 * @param nums Input array of integers.
 * @returns Number of zero-filled subarrays.
 */
function zeroFilledSubarray(nums: number[]): number {
    let count = 0;  // Total count of zero subarrays
    let currZeros = 0; // Current streak of consecutive zeros

    for (const num of nums) {
        if (num === 0) {
            currZeros += 1;  // Extend the current zero streak
            count += currZeros; // Add all subarrays ending at this zero
        } else {
            currZeros = 0; // Reset on non-zero
        }
    }

    return count;
}

// Example usages:
console.log(zeroFilledSubarray([1,3,0,0,2,0,0,4])); // 6
console.log(zeroFilledSubarray([0,0,0,2,0,0]));     // 9
console.log(zeroFilledSubarray([2,10,2019]));       // 0
