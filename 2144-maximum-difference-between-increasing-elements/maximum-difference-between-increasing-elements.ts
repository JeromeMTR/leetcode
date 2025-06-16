function maximumDifference(nums: number[]): number {
    // IOCE: Input
    // nums: number[], n: length of nums, 2 <= n <= 1000, 1 <= nums[i] <= 1e9

    let minSoFar = nums[0];          // Keeps track of the minimum value seen so far from the left
    let maxDiff = -1;                // Initialize maximum difference as -1 (in case no valid pair exists)

    // Traverse the array from left to right, starting at index 1
    for (let j = 1; j < nums.length; ++j) {
        if (nums[j] > minSoFar) {    // Check if the current value is greater than minSoFar (valid i, j)
            maxDiff = Math.max(maxDiff, nums[j] - minSoFar);  // Update maxDiff if this difference is larger
        } else {
            minSoFar = Math.min(minSoFar, nums[j]);  // Keep tracking the new minimum (for future j)
        }
    }
    return maxDiff;
}