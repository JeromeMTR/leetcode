// TypeScript solution: Alice's possible original string count (with repeated keys)
// Input: word - string with possible repeated runs; k - minimum intended length
// Output: number of ways Alice could have intended strings >= k

const MOD = 1_000_000_007;

/**
 * Returns the number of possible original intended strings Alice could have typed,
 * that could expand (by holding keys) into the observed output `word`, and of length at least `k`.
 */
function possibleStringCount(word: string, k: number): number {
    // Step 1: Get run lengths
    const runs: number[] = [];
    let i = 0;
    while (i < word.length) {
        let j = i + 1;
        while (j < word.length && word[j] === word[i]) j++;
        runs.push(j - i);
        i = j;
    }

    // DP: dp[len] = number of ways to form a string of length 'len' so far
    let dp = new Uint32Array(word.length + 1);
    dp[0] = 1; // 1 way to form an empty string

    // For each run, do DP update
    for (const runLen of runs) {
        // prefix-sum array for efficient range sum
        const prefixSum = new Uint32Array(word.length + 2); // one extra for easier math
        for (let l = 0; l <= word.length; ++l) {
            prefixSum[l + 1] = (prefixSum[l] + dp[l]) % MOD;
        }

        // Next dp array
        const nextDp = new Uint32Array(word.length + 1);

        // For each possible new total length
        for (let l = 1; l <= word.length; ++l) {
            // We can add from 1 up to runLen to some existing value
            // That is, for len = 1..runLen, dp[l - len] -> dp[l]
            const left = Math.max(0, l - runLen);
            const right = l - 1; // inclusive
            if (left <= right) {
                // sum dp[left .. right]
                nextDp[l] = (prefixSum[right + 1] - prefixSum[left] + MOD) % MOD;
            }
        }

        dp = nextDp;
    }

    // Sum up all lengths >= k and <= word.length
    let res = 0;
    for (let l = k; l <= word.length; ++l) {
        res = (res + dp[l]) % MOD;
    }
    return res;
}

/**
 * IOCE: Input/Output/Constraints/Examples
 */


/* Additional Comments:
   - The algorithm works by dynamic programming over the runs of repeated letters.
   - At each step it considers the contribution to all possible string lengths by
     efficiently sliding over a window of prior results (using prefix sums).
   - It works in O(n*k) time, where n = number of runs, and k = max allowed string length (≤ word.length).
   - The use of modulo 10^9+7 is standard for such counting problems.
*/