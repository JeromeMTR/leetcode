/*
IOCE

Inputs:
- coins: number[][]
  - m x n grid
  - coins[i][j] >= 0 => gain coins[i][j]
  - coins[i][j] < 0  => lose abs(coins[i][j]) unless neutralized
  - Robot starts at (0, 0), ends at (m - 1, n - 1)
  - Robot can move only right or down
  - Robot can neutralize robbers in at most 2 cells total

Output:
- number
  - Maximum profit the robot can gain on some valid path

Constraints:
- 1 <= m, n <= 500
- -1000 <= coins[i][j] <= 1000

Edge Cases:
- 1x1 grid
  - If single value is negative, we may neutralize it and get 0
- All positive values
  - Best path is regular max-sum path, neutralizations unused
- All negative values
  - Need to optimally use up to 2 neutralizations
- Start or end cell is negative
  - Neutralization may be used there
- Multiple optimal paths
  - Return the maximum profit only
*/

function maximumAmount(coins: number[][]): number {
    const m = coins.length;
    const n = coins[0].length;
    const NEG_INF = Number.NEGATIVE_INFINITY;

    // prev[j][k] => DP for previous row
    let prev: number[][] = Array.from({ length: n }, () => [NEG_INF, NEG_INF, NEG_INF]);

    for (let i = 0; i < m; i++) {
        const curr: number[][] = Array.from({ length: n }, () => [NEG_INF, NEG_INF, NEG_INF]);

        for (let j = 0; j < n; j++) {
            const val = coins[i][j];

            // Helper to relax transitions from a source state array into curr[j]
            const applyTransitions = (source: number[]) => {
                for (let used = 0; used <= 2; used++) {
                    if (source[used] === NEG_INF) continue;

                    // Option 1: do not neutralize this cell
                    curr[j][used] = Math.max(curr[j][used], source[used] + val);

                    // Option 2: neutralize this robber if negative and still have capacity
                    if (val < 0 && used < 2) {
                        curr[j][used + 1] = Math.max(curr[j][used + 1], source[used]);
                    }
                }
            };

            if (i === 0 && j === 0) {
                // Base case: starting cell
                // Take value normally
                curr[j][0] = Math.max(curr[j][0], val);

                // If negative, can neutralize at start
                if (val < 0) {
                    curr[j][1] = Math.max(curr[j][1], 0);
                }
            } else {
                // From top
                if (i > 0) {
                    applyTransitions(prev[j]);
                }

                // From left
                if (j > 0) {
                    applyTransitions(curr[j - 1]);
                }
            }
        }

        prev = curr;
    }

    return Math.max(prev[n - 1][0], prev[n - 1][1], prev[n - 1][2]);
}


// -------------------- Tests --------------------

console.log(
    maximumAmount([[0, 1, -1], [1, -2, 3], [2, -3, 4]]),
    "expected:",
    8
);

console.log(
    maximumAmount([[10, 10, 10], [10, 10, 10]]),
    "expected:",
    40
);

console.log(
    maximumAmount([[-5]]),
    "expected:",
    0
);

console.log(
    maximumAmount([[5]]),
    "expected:",
    5
);

console.log(
    maximumAmount([[-1, -2, -3]]),
    "expected:",
    -1
);

console.log(
    maximumAmount([
        [1, -10, 3],
        [2, -5, 10],
        [4, 2, 1]
    ]),
    "expected:",
    14
);