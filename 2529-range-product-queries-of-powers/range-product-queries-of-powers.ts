// IOCE: Input Output Code Example at the bottom

// Function to compute modular inverse using Fermat's little theorem
function modInv(a: number, MOD: number): number {
    let res = 1, p = MOD - 2;
    a %= MOD;
    while (p > 0) {
        if (p % 2 === 1) res = (res * a) % MOD;
        a = (a * a) % MOD;
        p >>= 1;
    }
    return res;
}

/**
 * Computes the answers for the given queries on the minimal power-of-2 decomposition of n.
 * @param n - The positive integer to decompose.
 * @param queries - The index-range queries.
 * @returns The answers to each query, modulo 1e9+7.
 */
function queryPowersProduct(n: number, queries: number[][]): number[] {
    const MOD = 1_000_000_007;

    // Step 1: Build the powers array in non-decreasing order
    const powers: number[] = [];
    for (let i = 0; (1 << i) <= n; i++) {
        if ((n & (1 << i)) !== 0) {
            powers.push(1 << i);
        }
    }
    // Now, powers is sorted in non-decreasing order by construction.

    // Step 2: Build prefix product array
    // prod[i] = powers[0] * ... * powers[i-1] (prod[0] = 1)
    const prod: number[] = [1];
    for (let i = 0; i < powers.length; i++) {
        prod.push((prod[i] * powers[i]) % MOD);
    }

    // Step 3: Answer each query using modular division (with modular inverse)
    const answers: number[] = [];
    for (const [left, right] of queries) {
        // product = prod[right + 1] / prod[left] mod MOD
        //        = (prod[right + 1] * modInv(prod[left], MOD)) % MOD
        const numerator = prod[right + 1];
        const denominator = prod[left];
        const answer = (numerator * modInv(denominator, MOD)) % MOD;
        answers.push(answer);
    }

    return answers;
}

// IOCE: Sample Inputs and Outputs
// Example 1
const n1 = 15;
const queries1 = [[0,1],[2,2],[0,3]];
console.log(queryPowersProduct(n1, queries1)); // Output: [2,4,64]

// Example 2
const n2 = 2;
const queries2 = [[0,0]];
console.log(queryPowersProduct(n2, queries2)); // Output: [2]

// Example 3
const n3 = 31; // 11111 => [1,2,4,8,16]
const queries3 = [[0,4],[1,3],[2,2]];
console.log(queryPowersProduct(n3, queries3)); // Output: [1024,64,4]

/*
--- EXPLANATION ---
For n=31, powers = [1,2,4,8,16]
queries:
[0,4] -> 1*2*4*8*16 = 1024
[1,3] -> 2*4*8 = 64
[2,2] -> 4
*/

// The code runs in O(number of bits in n + number of queries)