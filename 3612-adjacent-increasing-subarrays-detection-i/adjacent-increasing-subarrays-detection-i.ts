/**
 * Checks if there are two adjacent strictly increasing subarrays of length k.
 * @param nums The input integer array
 * @param k The subarray length
 * @returns true if such subarrays exist, false otherwise
 */
function hasTwoAdjacentIncreasingSubarrays(nums: number[], k: number): boolean {
    // Helper to check if nums[start..start+k-1] is strictly increasing
    function isStrictlyIncreasing(arr: number[], start: number, len: number): boolean {
        for (let i = start; i < start + len - 1; ++i) {
            if (arr[i] >= arr[i + 1]) {
                return false;
            }
        }
        return true;
    }

    // Try every possible start position a for the first subarray
    // a goes from 0 to nums.length - 2*k
    for (let a = 0; a <= nums.length - 2 * k; ++a) {
        const b = a + k; // Second subarray starts immediately after first
        if (
            isStrictlyIncreasing(nums, a, k) &&
            isStrictlyIncreasing(nums, b, k)
        ) {
            return true; // Found valid pair
        }
    }

    return false; // No valid pair found
}

// Examples
console.log(hasTwoAdjacentIncreasingSubarrays([2,5,7,8,9,2,3,4,3,1], 3)); // true
console.log(hasTwoAdjacentIncreasingSubarrays([1,2,3,4,4,4,4,5,6,7], 5)); // false

// Edge case: adjacent at beginning
console.log(hasTwoAdjacentIncreasingSubarrays([1,2,3,4,5,6], 2)); // true ([1,2], [3,4])

// Edge case: only one possible position
console.log(hasTwoAdjacentIncreasingSubarrays([1,2,1,2], 2)); // false