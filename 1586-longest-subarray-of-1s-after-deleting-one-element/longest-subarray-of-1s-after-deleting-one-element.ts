/**
 * Finds the length of the longest subarray of 1's after deleting one element.
 * @param nums - Binary array (containing only 0 and 1)
 * @returns the size of the longest subarray containing only 1's after deleting one element
 */
function longestSubarray(nums: number[]): number {
    // Initialize sliding window
    let left = 0;
    let zeroCount = 0;
    let maxLen = 0;

    // Traverse the array using right pointer
    for (let right = 0; right < nums.length; right++) {
        // If current number is 0, increment zero count
        if (nums[right] === 0) zeroCount++;

        // If more than one zero in window, shift left pointer right
        while (zeroCount > 1) {
            if (nums[left] === 0) zeroCount--;
            left++;
        }

        // Update maxLen (window size minus 1, because we must delete one element)
        // Subtracting 1 simulates the deletion
        maxLen = Math.max(maxLen, right - left);
    }

    // Edge case: If all are 1's, we must delete one anyway, so maxLen = nums.length - 1
    return maxLen;
}