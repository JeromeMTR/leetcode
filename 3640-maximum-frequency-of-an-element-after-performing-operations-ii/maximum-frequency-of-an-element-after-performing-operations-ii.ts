/**
 * Finds the maximum possible frequency after up to numOperations,
 * each modifying a different index by at most ±k.
 * @param nums Array of numbers
 * @param k Maximum absolute value you can add/subtract per operation
 * @param numOperations Number of operations you can perform
 * @returns max possible frequency of any element
 */
function maxPossibleFrequency(nums: number[], k: number, numOperations: number): number {
    const n = nums.length;
    nums.sort((a, b) => a - b);

    // Map to count how many times each value appears in nums
    const freq = new Map<number, number>();
    for (const x of nums) freq.set(x, (freq.get(x) ?? 0) + 1);

    let maxFreq = 0;
    let left = 0;

    // Use sliding window to find, for each nums[right], 
    // how many nums in window [left, right] are within k of nums[right] 
    // (i.e. can be converted to nums[right] by adding at most k).
    for (let right = 0; right < n; ++right) {
        // The smallest value in the window must be at least nums[right] - k
        while (nums[right] - nums[left] > k) left++;

        // In window [left, right], all nums can reach nums[right] (target value) in one operation
        const windowSize = right - left + 1;
        const alreadyAtTarget = freq.get(nums[right]) ?? 0;

        // We can change at most numOperations of them (the rest must already be target)
        // So the frequency for nums[right] is:
        // Number already at target + min(numOperations, windowSize - alreadyAtTarget)
        // (because only elements ≠ target need changing)
        const possibleFreq = Math.min(windowSize, alreadyAtTarget + numOperations);

        maxFreq = Math.max(maxFreq, possibleFreq);
    }
    return maxFreq;
}

/*
IOCE - Input Output Commented Examples
*/

// Example 1:
console.log(maxPossibleFrequency([1,4,5], 1, 2)); // Output: 2
// Explanation: Can make two 4's (1,4)--(add 0); (5->4: add -1)

// Example 2:
console.log(maxPossibleFrequency([5,11,20,20], 5, 1)); // Output: 2
// Explanation: Can't make three same number with one change: best possible is two 20's

// Example 3: All same, no operations needed
console.log(maxPossibleFrequency([10,10,10], 100, 0)); // Output: 3

// Example 4: All different, but k is large and can change any single value
console.log(maxPossibleFrequency([1,2,3,4], 100, 3)); // Output: 4

// Example 5: No operations allowed, so answer is freq of most common
console.log(maxPossibleFrequency([7,8,8,10], 2, 0)); // Output: 2

// Example 6: Large k, few ops
console.log(maxPossibleFrequency([1,5,5,5,10], 10, 1)); // Output: 4

/*
Time Complexity: O(N log N) (for sorting + single pass sliding window)
Space Complexity: O(N) for frequency map
*/