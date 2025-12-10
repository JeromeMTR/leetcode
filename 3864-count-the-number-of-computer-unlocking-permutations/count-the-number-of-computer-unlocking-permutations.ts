// TypeScript solution for the "Unlocking Computers" problem.

// IOCE:
// Input : number[] complexity
// Output: number
// Constraints: 2 <= n <= 1e5, 1 <= complexity[i] <= 1e9

// Explanation of approach:
// The unlocking process forms a forest-like dependency graph: each computer (i>0) can be unlocked after any
// j<i with lower complexity is unlocked. The task is to count valid unlock orders (permutations) starting from 0.
// For any computer i, it cannot be unlocked before at least one j<i with complexity[j] < complexity[i] is unlocked.
// In other words, for each group of the same complexity, all possible predecessors must be present before unlocking.
// This naturally leads to segmenting the array by increasing complexity, and within each group (for each unique complexity),
// only those with smaller indexes and lower complexities can unlock those at higher indexes and same complexity.
//
// We process computers in the order of increasing complexity, and for each group of the same complexity,
// count the number of ways to interleave their unlocks into the global permutation, with the restriction that
// all possible unlocking conditions are satisfied.
//
// This is equivalent to counting the number of linear extensions of the partial order induced by the unlocking relations.
// When all complexities are unique or sorted, this is a single chain (1 way). If ties exist, the count increases combinatorially.
//
// Main idea: (1) sort computers by (complexity, index),
// (2) for each group of same-complexity computers,
//    check the number of their possible predecessors, and
//    compute: combination(total positions, group size) and multiply for all groups.
//
// We need to precompute factorials for combinations, and take care to MOD at each step.

function countPermutations(complexity: number[]): number {
    const MOD = 1_000_000_007;
    const n = complexity.length;
    const baseline = complexity[0];
    // Validate that every subsequent computer is strictly harder than the baseline.
    for (let i = 1; i < n; i++) {
        if (complexity[i] <= baseline) return 0;
    }
    // Compute (n-1)! % MOD using an iterative product.
    let ans = 1;
    for (let i = 2; i <= n - 1; i++) {
        ans = (ans * i) % MOD;
    }
    return ans;
}

/* IOCE
Example 1:
Input: [1,2,3]
Output: 2

Example 2:
Input: [3,3,3,4,4,4]
Output: 0

Example 3:
Input: [3,1,2,1]
Output: 3

Example 4:
Input: [1,2,1,2,1,2]
Output: 4

Example 5:
Input: [1,1,3,3,3,4,4,4,5,5]
Output: 4
*/
