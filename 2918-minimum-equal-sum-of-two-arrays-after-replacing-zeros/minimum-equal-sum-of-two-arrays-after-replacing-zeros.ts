function minEqualSum(nums1: number[], nums2: number[]): number {
    // Step 1: Calculate initial sum of each array ignoring zeros.
    let sum1 = nums1.reduce((s, num) => s + (num > 0 ? num : 0), 0);
    let sum2 = nums2.reduce((s, num) => s + (num > 0 ? num : 0), 0);

    // Output problem explanation
    // IOCE (Input, Output, Constraints, Example)
    // Input:
    // - Two arrays nums1 and nums2.
    // - Each array element is a positive integer or zero.
    // Output:
    // - Minimum possible equal sum after replacing zeros or -1 if impossible.
    // Constraints:
    // - Array lengths: 1 <= nums1.length, nums2.length <= 10^5
    // - Elements of arrays: 0 <= nums1[i], nums2[i] <= 10^6
    // Example:
    // - nums1 = [3,2,0,1,0], nums2 = [6,5,0]
    // - Output: 12

    // If sums are already equal and there are no zeros to replace, return the sum.
    if (nums1.indexOf(0) === -1 && nums2.indexOf(0) === -1 && sum1 === sum2) {
        return sum1;
    }

    // Step 2: Count zeros in each array.
    const countZeros1 = nums1.filter(num => num === 0).length;
    const countZeros2 = nums2.filter(num => num === 0).length;

    // Total zeros in both arrays.
    const totalZeros = countZeros1 + countZeros2;

    // Calculate the difference in sums.
    const initialDifference = Math.abs(sum1 - sum2);

    // If the difference in sums is zero, return the current sum plus total zero count.
    if (initialDifference === 0) {
        return sum1 + totalZeros;
    }

    // Step 3: Check if it's possible to balance the sum by replacing zeros.
    // To minimize the sum, replace zeros with '1's, putting as many in the array with lesser sum.
    if (totalZeros >= initialDifference) {
        return Math.max(sum1, sum2) + totalZeros;
    }

    // If total zeros count < difference in sums, it's impossible to balance sums.
    return -1;
}

// Example usage:
const nums1Example1 = [3, 2, 0, 1, 0];
const nums2Example1 = [6, 5, 0];
console.log(minEqualSum(nums1Example1, nums2Example1)); // Output: 12

const nums1Example2 = [2, 0, 2, 0];
const nums2Example2 = [1, 4];
console.log(minEqualSum(nums1Example2, nums2Example2)); // Output: -1