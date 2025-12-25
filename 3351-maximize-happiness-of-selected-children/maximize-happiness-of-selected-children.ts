/**
 * LeetCode 3075: Maximize Happiness of Selected Children
 *
 * IOCE:
 * Input:
 *  - happiness: number[]
 *  - k: number
 * Output:
 *  - number (maximum possible sum)
 *
 * Core idea:
 *  - Sort happiness descending.
 *  - On the i-th pick (0-based), all unpicked children have been decremented i times.
 *    So if we pick the i-th largest original happiness value h, its effective value is max(h - i, 0).
 *  - Sum for i = 0..k-1.
 *
 * Complexity:
 *  - Time: O(n log n) due to sorting
 *  - Space: O(1) extra (ignoring sort's internal usage)
 */
function maximumHappinessSum(happiness: number[], k: number): number {
  // Sort descending to pick the largest happiness values first (greedy is optimal)
  happiness.sort((a, b) => b - a);

  let sum = 0;
  for (let i = 0; i < k; i++) {
    const val = happiness[i] - i; // decremented i times before this pick
    if (val <= 0) break;          // further values will be <= 0 as well (sorted desc)
    sum += val;
  }
  return sum;
}

// If you need the exported signature for platforms using module system
// Example test cases
console.log(maximumHappinessSum([1, 2, 3], 2)); // Expected: 4 (3 + 1)
console.log(maximumHappinessSum([10, 9, 8, 7], 3)); // Expected: 24 (10 + 8 + 6)
console.log(maximumHappinessSum([5, 5, 5, 5], 4)); // Expected: 14 (5 + 4 + 3 + 2)
console.log(maximumHappinessSum([1, 1, 1, 1], 3)); // Expected: 3 (1 + 1 + 1)
console.log(maximumHappinessSum([7, 6, 5, 4, 3], 5)); // Expected: 15 (7 + 5 + 3 + 0 + 0)
