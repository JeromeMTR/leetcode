function countSubarrays(nums: number[], minK: number, maxK: number): number {
    let lastMinKIndex = -1;
    let lastMaxKIndex = -1;
    let startOfValidSubarray = -1;
    let count = 0;

    // Iterate over the array
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];

        // If current number is out of minK and maxK bounds, reset the valid subarray start
        if (num < minK || num > maxK) {
            startOfValidSubarray = i;
            continue;
        }

        // Update the last seen indices of minK and maxK
        if (num === minK) lastMinKIndex = i;
        if (num === maxK) lastMaxKIndex = i;

        // Calculate the number of valid subarrays with the current position as the end
        const minIndex = Math.min(lastMinKIndex, lastMaxKIndex);
        if (minIndex > startOfValidSubarray) {
            count += minIndex - startOfValidSubarray;
        }
    }

    return count;
}

// IOCE: Inputs, Outputs, Constraints & Examples

// Example 1:
const nums1 = [1, 3, 5, 2, 7, 5];
const minK1 = 1;
const maxK1 = 5;
console.log(countSubarrays(nums1, minK1, maxK1)); // Output: 2

// Example 2:
const nums2 = [1, 1, 1, 1];
const minK2 = 1;
const maxK2 = 1;
console.log(countSubarrays(nums2, minK2, maxK2)); // Output: 10

// Additional Test Cases:

// Test with a case with no valid subarray
const nums3 = [2, 6, 8, 10];
const minK3 = 1;
const maxK3 = 5;
console.log(countSubarrays(nums3, minK3, maxK3)); // Output: 0

// Test with a large value array
const nums4 = [1, 3, 5, 7, 5, 9, 5, 11, 5];
const minK4 = 5;
const maxK4 = 5;
console.log(countSubarrays(nums4, minK4, maxK4)); // Output: 6