/**
 * Finds a subsequence of length k with the largest sum.
 * @param nums Input array of integers.
 * @param k Length of the subsequence.
 * @returns Subsequence of length k (in original order) with the largest sum.
 */
function maxSubsequence(nums: number[], k: number): number[] {
    // Step 1: Pair each number with its original index
    const pairs: Array<{ value: number, index: number }> = nums.map((value, idx) => ({
        value, index: idx
    }));

    // Step 2: Sort pairs descendingly by value
    pairs.sort((a, b) => b.value - a.value);

    // Step 3: Take the first k elements (largest k values)
    const selected = pairs.slice(0, k);

    // Step 4: Sort selected pairs by their original index
    selected.sort((a, b) => a.index - b.index);

    // Step 5: Extract the values (restoring original order -> makes a valid subsequence)
    return selected.map(pair => pair.value);
}

/* ---------------- TEST CASES (Examples) ---------------- */

console.log(maxSubsequence([2,1,3,3], 2));       // Output: [3, 3]
console.log(maxSubsequence([-1,-2,3,4], 3));     // Output: [-1,3,4]
console.log(maxSubsequence([3,4,3,3], 2));       // Output: [3, 4] (or [4, 3])

// Additional edge case
console.log(maxSubsequence([5,5,5,5], 3));       // Output: [5,5,5]