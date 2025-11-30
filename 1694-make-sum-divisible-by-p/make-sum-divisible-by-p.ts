/**
 * Given an array of positive integers nums, remove the smallest subarray (possibly empty)
 * such that the sum of the remaining elements is divisible by p. It is not allowed to remove the whole array.
 *
 * IOCE: Input: nums (number[]), p (number)
 *       Output: number (length of smallest subarray to remove, or -1 if impossible)
 *
 * Example:
 *   Input: nums = [3,1,4,2], p = 6
 *   Output: 1  (remove [4])
 */
function minSubarray(nums: number[], p: number): number {
    // Calculate total sum modulo p
    let totalSum = 0;
    for (let num of nums) {
        totalSum = (totalSum + num) % p;
    }
    // If already divisible, no removal needed
    if (totalSum === 0) return 0;

    // Map stores prefix_modulo value -> index
    const prefixMods = new Map<number, number>();
    prefixMods.set(0, -1); // Nothing removed, prefix sum 0 before start

    let minLen = nums.length; // Don't allow full array removal
    let prefixSum = 0;

    for (let i = 0; i < nums.length; i++) {
        prefixSum = (prefixSum + nums[i]) % p;

        // The subarray we remove should have sumMod % p == totalSum
        // So, (prefixSum - x + p) % p == totalSum
        // x = (prefixSum - totalSum + p) % p
        const target = (prefixSum - totalSum + p) % p;

        if (prefixMods.has(target)) {
            // Removing the subarray prefixMods[target]+1 ... i (inclusive) would make division work
            const prevIndex = prefixMods.get(target)!;
            // Remove nums[prevIndex+1, ..., i] => length i - prevIndex
            // Don't consider removing the whole array
            const len = i - prevIndex;
            if (len < minLen && len < nums.length) {
                minLen = len;
            }
        }

        // Store the latest index for this modulo value
        prefixMods.set(prefixSum, i);
    }

    return minLen === nums.length ? -1 : minLen;
}

/*
Test cases for manual IOCE verification:

console.log(minSubarray([3,1,4,2], 6)); // 1
console.log(minSubarray([6,3,5,2], 9)); // 2
console.log(minSubarray([1,2,3], 3)); // 0
console.log(minSubarray([3,1,2,1], 3)); // 3
console.log(minSubarray([1,2,1,2,1,2], 3)); // 4
console.log(minSubarray([1,1,3,3,3,4,4,4,5,5], 4)); // 4
*/