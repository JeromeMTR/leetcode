// IOCE (Input Output Constraints Example)
// Example 1:
// Input: grid = [[5,2,4],[3,0,5],[0,7,2]], k = 3
// Output: 2

// Example 2:
// Input: grid = [[0,0]], k = 5
// Output: 1

// Example 3:
// Input: grid = [[7,3,4,9],[2,3,6,2],[2,3,7,0]], k = 1
// Output: 10

// Constraints:
// 1 <= m, n <= 5 * 10^4
// 1 <= m*n <= 5 * 10^4
// 0 <= grid[i][j] <= 100
// 1 <= k <= 50

function numberOfPaths(grid: number[][], k: number): number {
    const MOD = 1_000_000_007;
    const m = grid.length;
    const n = grid[0].length;

    // dp[i][j][rem]: the number of ways to reach (i,j) with sum % k == rem
    // Space optimization: Only two rows needed at once (previous and current)
    let prev = Array.from({ length: n }, () => new Array(k).fill(0));
    let cur = Array.from({ length: n }, () => new Array(k).fill(0));

    // Initialize for (0,0)
    prev[0][grid[0][0]%k] = 1;

    for (let i = 0; i < m; i++) {
        // for each row, swap current and previous and clear current
        if (i>0) {
            // Reset cur
            for (let j = 0; j < n; j++)
                for (let r = 0; r < k; r++)
                    cur[j][r] = 0;
            // Move first column from above only
            let num = grid[i][0];
            for (let r = 0; r < k; r++) {
                const from_above = prev[0][r];
                // if any way to reach (i-1,0) with sum%k = r
                if (from_above) {
                    const sum = (r + num)%k;
                    cur[0][sum] = (cur[0][sum] + from_above) % MOD;
                }
            }
        }
        for (let j = (i>0?1:0); j < n; j++) {
            let num = grid[i][j];
            for (let r = 0; r < k; r++) {
                let cnt = 0;
                // from left
                if (j>0) {
                    const from_left = (i>0 ? cur : prev)[j-1][r];
                    if (from_left) {
                        const sum = (r + num)%k;
                        const target = i>0 ? cur : prev;
                        target[j][sum] = (target[j][sum] + from_left) % MOD;
                    }
                }
                // from top
                if (i>0) {
                    const from_top = prev[j][r];
                    if (from_top) {
                        const sum = (r + num)%k;
                        cur[j][sum] = (cur[j][sum] + from_top) % MOD;
                    }
                }
            }
        }
        if (i>0) {
            // After row done, prev = cur, cur will be cleared on next row
            [prev, cur] = [cur, prev];
        }
    }

    // m-1, n-1 position
    return prev[n-1][0];
}