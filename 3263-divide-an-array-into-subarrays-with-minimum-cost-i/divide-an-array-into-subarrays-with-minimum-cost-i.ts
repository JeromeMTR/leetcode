// ----------- IOCE (Input, Output, Constraints, Edge cases) ----------

/*
Input:
    nums: Array<number> - an array of integers
Output:
    number - the minimum possible sum of the first elements of three subarrays

Constraints:
    - The array `nums` must have at least 3 elements.
    - All elements in `nums` are integers.

Edge Cases:
    - The array contains negative numbers.
    - The array contains duplicate values.
    - The array has exactly 3 elements.
*/

/**
 * Given an array, split it into 3 non-empty contiguous subarrays,
 * and return the minimum sum of the first element of each subarray.
 *
 * @param nums Array of integers
 * @returns Minimum possible sum of the costs
 */
function minimumCost(nums: number[]): number {
    const n = nums.length;
    let minSum = Number.MAX_SAFE_INTEGER;

    // The first split point i: end of the first subarray (exclusive), at least 1
    // The second split point j: end of the second subarray (exclusive), at least i+1
    for (let i = 1; i <= n - 2; i++) {
        for (let j = i + 1; j <= n - 1; j++) {
            // Subarrays: [0,i-1], [i,j-1], [j,n-1]
            const cost = nums[0] + nums[i] + nums[j];
            // Debugging: show splits and costs
            // console.log(`Splits: [0,${i-1}] [${i},${j-1}] [${j},${n-1}] -> Cost: ${nums[0]}+${nums[i]}+${nums[j]}=${cost}`);
            minSum = Math.min(minSum, cost);
        }
    }
    return minSum;
}

// ------------------ Tests --------------------

console.log(minimumCost([1, 2, 3, 4, 5])); // Expected: 6 (1+2+3)
console.log(minimumCost([5, 1, 2, 3, 4])); // Expected: 8 (5+1+2)
console.log(minimumCost([10, 20, 30, 40, 50])); // Expected: 100 (10+20+30)
console.log(minimumCost([-1, -2, -3, -4, -5])); // Expected: -9 (-1+-2+-3)
console.log(minimumCost([0, 0, 0, 0, 0])); // Expected: 0 (0+0+0)
console.log(minimumCost([1, 1, 1, 1, 1])); // Expected: 3 (1+1+1)
console.log(minimumCost([1, 2, 3])); // Expected: 6 (1+2+3)