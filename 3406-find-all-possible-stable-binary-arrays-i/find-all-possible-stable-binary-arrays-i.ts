/**
 * IOCE
 * Inputs:
 *  - zero: number of 0s to place (1..200)
 *  - one:  number of 1s to place (1..200)
 *  - limit: maximum allowed run length of identical values (1..200)
 *
 * Output:
 *  - number of stable binary arrays with exactly `zero` zeros and `one` ones,
 *    where every consecutive run length <= limit,
 *    returned modulo 1e9+7.
 *
 * Complexity:
 *  - Time:  O(zero * one)
 *  - Space: O(zero * one)
 */

const MOD = 1_000_000_007;
const END_WITH_ZERO = 0;
const END_WITH_ONE = 1;

function normalizeModulo(value: number): number {
    return ((value % MOD) + MOD) % MOD;
}

function numberOfStableArrays(
    zero: number,
    one: number,
    limit: number,
): number {
    const dp: number[][][] = Array.from({ length: zero + 1 }, () =>
        Array.from({ length: one + 1 }, () => [0, 0]),
    );

    for (let zeroCount = 0; zeroCount <= Math.min(zero, limit); zeroCount++) {
        dp[zeroCount][0][END_WITH_ZERO] = 1;
    }
    for (let oneCount = 0; oneCount <= Math.min(one, limit); oneCount++) {
        dp[0][oneCount][END_WITH_ONE] = 1;
    }

    for (let zeroCount = 1; zeroCount <= zero; zeroCount++) {
        for (let oneCount = 1; oneCount <= one; oneCount++) {
            let endWithZero =
                dp[zeroCount - 1][oneCount][END_WITH_ZERO] +
                dp[zeroCount - 1][oneCount][END_WITH_ONE];
            if (zeroCount > limit) {
                endWithZero -= dp[zeroCount - limit - 1][oneCount][END_WITH_ONE];
            }
            dp[zeroCount][oneCount][END_WITH_ZERO] = normalizeModulo(endWithZero);

            let endWithOne =
                dp[zeroCount][oneCount - 1][END_WITH_ONE] +
                dp[zeroCount][oneCount - 1][END_WITH_ZERO];
            if (oneCount > limit) {
                endWithOne -= dp[zeroCount][oneCount - limit - 1][END_WITH_ZERO];
            }
            dp[zeroCount][oneCount][END_WITH_ONE] = normalizeModulo(endWithOne);
        }
    }

    return normalizeModulo(dp[zero][one][END_WITH_ZERO] + dp[zero][one][END_WITH_ONE]);
}

/***********************
 * Console log tests
 ***********************/
console.log(numberOfStableArrays(1, 1, 2), "expected", 2);
console.log(numberOfStableArrays(1, 2, 1), "expected", 1);
console.log(numberOfStableArrays(3, 3, 2), "expected", 14);

// Additional sanity checks:
console.log(numberOfStableArrays(2, 2, 1), "expected", 2); // 0101, 1010
console.log(numberOfStableArrays(2, 1, 1), "expected", 1); // 010 only
console.log(numberOfStableArrays(3, 1, 1), "expected", 0); // cannot alternate enough
console.log(numberOfStableArrays(3, 1, 3), "expected", 4); // C(4,3)=4
