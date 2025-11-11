/**
 * Find the largest subset of strs such that at most m 0's and n 1's are used in total.
 * Uses 0/1 Knapsack Dynamic Programming.
 *
 * Time: O(L * m * n), where L = strs.length
 * Space: O(m * n)
 */
function findMaxForm(strs: string[], m: number, n: number): number {
    // dp[i][j]: max subset size with i 0s and j 1s (at most)
    // Initialize dp array
    const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    // For each string, try to add it to the knapsack (backwards loop)
    for (const s of strs) {
        // Count 0's and 1's in s
        let zeros = 0, ones = 0;
        for (const ch of s) {
            if (ch === '0') zeros++;
            else ones++;
        }
        // Update dp array from back to avoid multiple counting
        for (let i = m; i >= zeros; i--) {
            for (let j = n; j >= ones; j--) {
                dp[i][j] = Math.max(dp[i][j], dp[i - zeros][j - ones] + 1);
            }
        }
    }
    return dp[m][n];
}

/*
IOCE
---------

Example 1:
Input:
    strs = ["10","0001","111001","1","0"], m = 5, n = 3
Output: 4
Explanation: Max subset is {"10","0001","1","0"}

Example 2:
Input:
    strs = ["10","0","1"], m = 1, n = 1
Output: 2
Explanation: Max subset is {"0","1"}

Counterexamples (problematic cases previously):
Input:
    strs = ["0","1","1","0"], m = 2, n = 2
Output: 4

Input:
    strs = ["1","1","3","3","3","4","4","4","5","5"], m=7, n=2
Output: 4

Countercase explained for the bad old example:
    Input: strs = ["0","0","1","1"], m = 2, n = 2
    Output: 4

--------
*/

// Sample test runs
console.log(findMaxForm(["10","0001","111001","1","0"], 5, 3)); // 4
console.log(findMaxForm(["10","0","1"], 1, 1)); // 2
console.log(findMaxForm(["0","1","1","0"], 2, 2)); // 4
console.log(findMaxForm(["1","1","3","3","3","4","4","4","5","5"], 7, 2)); // 4