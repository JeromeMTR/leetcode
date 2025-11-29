/**
 * Returns the minimum number of operations to make the sum of nums divisible by k.
 * For each operation, you can decrease any nums[i] by 1.
 * 
 * IOCE:
 * Input: nums = [3,9,7], k = 5
 * Output: 4
 * 
 * Input: nums = [4,1,3], k = 4
 * Output: 0
 * 
 * Input: nums = [3,2], k = 6
 * Output: 5
 * 
 * Input: nums = [3,1,2,1], k = 3
 * Output: 3
 * 
 * Input: nums = [1,2,1,2,1,2], k = 3
 * Output: 4
 * 
 * Input: nums = [1,1,3,3,3,4,4,4,5,5], k = 4
 * Output: 4
 */

function minOperations(nums: number[], k: number): number {
    // Calculate the initial sum
    let sum = nums.reduce((a, b) => a + b, 0);

    // If sum is already divisible by k, 0 operations needed
    let rem = sum % k;
    if (rem === 0) {
        return 0;
    }

    // For each element, compute how much reducing we can do, which is nums[i] itself
    // For each possible residue, get the minimal reductions we can apply by distributing operations per element

    // Create an array representing all possible residues and the minimal number of operations needed to cover the remainder 
    // Use a boolean array for residues to use DP (like subset sum)
    const dp = new Array(k).fill(Infinity);
    dp[0] = 0; // zero operations yield residue 0

    // For each number, for all possible decreases, update dp (classic bounded knapsack)
    for (let num of nums) {
        // We need to loop over the possible subtractions (1..num)
        // We can only afford to update from high to low to avoid overwriting
        // For big k and max nums[i]=1000, for len=1000 and k=100, it's feasible
        const ndp = dp.slice();
        for (let r = 0; r < k; r++) {
            // For x from 1 to num, try (r - x + k) % k
            // Instead of trying every possible x (which is slow for nums[i] big), 
            // notice that the set of increments by 1 mod k are a complete residue system, so only k residues to check
            for (
                let sub = 1;
                sub <= num && sub < k;
                sub++
            ) {
                const prev = (r - sub + k) % k;
                ndp[r] = Math.min(ndp[r], dp[prev] + sub);
            }
            // For sub >= k, the residue repeats, so their minimal is covered already by residues < k
        }
        // There is a cleverer optimization, but with small constraints just use this
        for (let j = 0; j < k; j++) dp[j] = ndp[j];
    }

    // The answer is the minimal operations such that the final residue is reduced by 'rem'
    // But, since all decreases will reduce the sum, and make its modulo move towards zero,
    // we need to decrease (rem) modulo k from the current sum

    return dp[rem];
}