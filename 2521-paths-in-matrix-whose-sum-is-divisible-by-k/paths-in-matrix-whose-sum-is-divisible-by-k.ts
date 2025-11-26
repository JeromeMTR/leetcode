// IOCE (Input, Output, Constraints, Examples)
//
// Problem:
// Count paths from (0,0) to (m-1,n-1) moving only right or down such that
// the sum of visited cells is divisible by k. Return count modulo 1e9+7.
//
// Approach:
// Dynamic Programming with modulus states.
// dp[i][j][r] = number of paths to cell (i-1, j-1) with sum % k == r.
// Transition uses top (i-1, j) and left (i, j-1) states by adding grid[i-1][j-1].
//
// Time:  O(m * n * k)
// Space: O(m * n * k)  (can be optimized to O(n * k) with rolling rows)
//
// Examples:
// Input: grid = [[5,2,4],[3,0,5],[0,7,2]], k = 3 -> Output: 2
// Input: grid = [[0,0]], k = 5 -> Output: 1
// Input: grid = [[7,3,4,9],[2,3,6,2],[2,3,7,0]], k = 1 -> Output: 10
// Constraints:
// - 1 <= m, n
// - 1 <= m*n <= 5e4
// - 0 <= grid[i][j] <= 100
// - 1 <= k <= 50

const MOD = 1e9 + 7;

/**
 * Returns the number of paths from top-left to bottom-right where
 * the sum of visited cells is divisible by k. Moves allowed: right or down.
 * Uses 3D DP: dp[i][j][r] = number of paths to (i-1, j-1) with sum % k == r.
 */
function numberOfPaths(grid: number[][], k: number): number {
    const m = grid.length;
    const n = grid[0].length;

    // dp has dimensions (m+1) x (n+1) x k to simplify boundary handling.
    const dp: number[][][] = [];

    for (let i = 0; i <= m; i++) {
        dp[i] = [];
        for (let j = 0; j <= n; j++) {
            dp[i][j] = new Array(k).fill(0);

            // Initialize starting cell (1,1) which maps to grid[0][0]
            if (i === 1 && j === 1) {
                dp[i][j][grid[0][0] % k] = 1;
                continue;
            }

            // Fill transitions only for valid grid cells (i>=1 && j>=1)
            if (i >= 1 && j >= 1) {
                const valueMod = grid[i - 1][j - 1] % k;

                // For each remainder r at (i, j),
                // previous remainder must be (r - valueMod + k) % k
                for (let r = 0; r < k; r++) {
                    const prevRem = (r - valueMod + k) % k;

                    // Paths from top cell (i-1, j) and left cell (i, j-1)
                    dp[i][j][r] = (dp[i - 1][j][prevRem] + dp[i][j - 1][prevRem]) % MOD;
                }
            }
        }
    }

    // Number of paths ending with remainder 0 at bottom-right
    return dp[m][n][0];
}

/** Testcases (IOCE) */
function test(name: string, grid: number[][], k: number, expected: number) {
    const result = numberOfPaths(grid, k);
    console.log(`${name}: got=${result}, expected=${expected}`);
}

// LeetCode examples
test("Example 1", [[5,2,4],[3,0,5],[0,7,2]], 3, 2);
test("Example 2", [[0,0]], 5, 1);
test("Example 3", [[7,3,4,9],[2,3,6,2],[2,3,7,0]], 1, 10);

// Edge cases
test("Single cell divisible", [[6]], 3, 1);
test("Single cell not divisible", [[1]], 2, 0);
test("All zeros grid", [[0,0],[0,0]], 4, 6); // All paths sum to 0, C(2+2,2)=6
test("k=1 always divisible", [[1,2],[3,4]], 1, 6);

// Small random
test("Small 2x2", [[1,2],[3,4]], 3, numberOfPaths([[1,2],[3,4]], 3)); // sanity