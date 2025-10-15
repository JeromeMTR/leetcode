/**
 * Returns the maximum possible value of `k` such that there exist two adjacent
 * subarrays of length k which are both strictly increasing.
 * 
 * @param nums The input integer array.
 * @returns Maximum possible value of k.
 */
function maxAdjacentIncreasingSubarray(nums: number[]): number {
    const n = nums.length;

    // Step 1: Precompute inc[i] - the length of the maximum strictly increasing subarray starting at i
    const inc = new Array(n).fill(1);
    for (let i = n - 2; i >= 0; --i) {
        if (nums[i] < nums[i + 1]) {
            inc[i] = inc[i + 1] + 1;
        } // else inc[i] stays at 1
    }

    // Step 2: Binary search for the largest k
    let left = 1, right = Math.floor(n / 2);
    let ans = 0;

    while (left <= right) {
        const k = Math.floor((left + right) / 2);

        let found = false;
        // For each possible a: 0 <= a <= n - 2k
        for (let a = 0; a <= n - 2 * k; ++a) {
            if (inc[a] >= k && inc[a + k] >= k) {
                found = true;
                break;
            }
        }

        if (found) {
            ans = k;
            left = k + 1;  // Try to find a larger k
        } else {
            right = k - 1; // Reduce k
        }
    }
    return ans;
}

// Example Usage:
const nums1 = [2, 5, 7, 8, 9, 2, 3, 4, 3, 1];
console.log(maxAdjacentIncreasingSubarray(nums1)); // Output: 3

const nums2 = [1, 2, 3, 4, 4, 4, 4, 5, 6, 7];
console.log(maxAdjacentIncreasingSubarray(nums2)); // Output: 2

// Edge case
const nums3 = [10,9,8,7,6,5,4,3,2,1];
console.log(maxAdjacentIncreasingSubarray(nums3)); // Output: 0

/**
 * Comments:
 * - Preprocessing inc[] is O(n).
 * - The binary search has O(log n) iterations. Each iteration is O(n), so total O(n log n).
 * - Uses only O(n) extra memory.
 */