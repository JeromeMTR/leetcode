const MOD = 1000000007;

/**
 * Counts stable binary arrays using exactly `zero` zeros and `one` ones,
 * where no consecutive run of equal bits exceeds `limit`.
 *
 * IOCE
 * Input:
 * - `zero`: number of 0s to place
 * - `one`: number of 1s to place
 * - `limit`: maximum allowed length of any consecutive equal-bit segment
 *
 * Output:
 * - Number of valid arrays modulo 1e9+7.
 *
 * Constraints:
 * - `zero`, `one`, `limit` are non-negative integers.
 * - Uses dynamic programming in O(zero * one) states.
 *
 * Example:
 * - `zero = 1`, `one = 1`, `limit = 1`
 * - Valid arrays: `[0,1]`, `[1,0]`
 * - Result: `2`
 *
 * @param zero Count of zeros.
 * @param one Count of ones.
 * @param limit Maximum consecutive equal bits allowed.
 * @returns Number of stable arrays modulo `1000000007`.
 */
function numberOfStableArrays(
    zero: number,
    one: number,
    limit: number,
): number {
    let dp: number[][][] = Array.from({ length: zero + 1 }, () =>
        Array.from({ length: one + 1 }, () => [0, 0]),
    );

    for (let i = 0; i <= zero; i++) {
        for (let j = 0; j <= one; j++) {
            for (let lastBit = 0; lastBit <= 1; lastBit++) {
                if (i === 0) {
                    if (lastBit === 0 || j > limit) {
                        dp[i][j][lastBit] = 0;
                    } else {
                        dp[i][j][lastBit] = 1;
                    }
                } else if (j === 0) {
                    if (lastBit === 1 || i > limit) {
                        dp[i][j][lastBit] = 0;
                    } else {
                        dp[i][j][lastBit] = 1;
                    }
                } else if (lastBit === 0) {
                    dp[i][j][lastBit] = dp[i - 1][j][0] + dp[i - 1][j][1];
                    if (i > limit) {
                        dp[i][j][lastBit] -= dp[i - limit - 1][j][1];
                    }
                } else {
                    dp[i][j][lastBit] = dp[i][j - 1][0] + dp[i][j - 1][1];
                    if (j > limit) {
                        dp[i][j][lastBit] -= dp[i][j - limit - 1][0];
                    }
                }
                dp[i][j][lastBit] %= MOD;
                if (dp[i][j][lastBit] < 0) {
                    dp[i][j][lastBit] += MOD;
                }
            }
        }
    }

    return (dp[zero][one][0] + dp[zero][one][1]) % MOD;
}

console.log(numberOfStableArrays(1, 1, 2)); // Expected: 2
console.log(numberOfStableArrays(1, 2, 1)); // Expected: 1
console.log(numberOfStableArrays(3, 3, 2)); // Expected: 14
console.log(numberOfStableArrays(2, 1, 2)); // Expected: 3
console.log(numberOfStableArrays(2, 2, 1)); // Expected: 2