// IOCE: Input/Output/Constraints/Example provided above.

const MOD = 1_000_000_007;

// Precompute factorials and inverse factorials up to maxN
function precomputeFactorials(maxN: number, MOD: number) {
    const fac = Array(maxN + 1).fill(1);
    const ifac = Array(maxN + 1).fill(1);

    for (let i = 1; i <= maxN; ++i) {
        fac[i] = fac[i - 1] * i % MOD;
    }

    // Compute modular inverse using Fermat's little theorem
    ifac[maxN] = powMod(fac[maxN], MOD - 2, MOD);
    for (let i = maxN - 1; i > 0; --i) {
        ifac[i] = ifac[i + 1] * (i + 1) % MOD;
    }
    return { fac, ifac };
}

// Fast exponentiation a^b % MOD
function powMod(a: number, b: number, MOD: number): number {
    let res = 1;
    a = a % MOD;
    while (b > 0) {
        if (b % 2 === 1) res = (res * a) % MOD;
        a = (a * a) % MOD;
        b = Math.floor(b / 2);
    }
    return res;
}

// nCk mod MOD
function comb(n: number, k: number, fac: number[], ifac: number[]): number {
    if (k < 0 || k > n) return 0;
    return fac[n] * ifac[k] % MOD * ifac[n - k] % MOD;
}

// Main function
function countGoodArrays(n: number, m: number, k: number): number {
    // Precompute up to n
    const { fac, ifac } = precomputeFactorials(n, MOD);

    // C(n-1, k)
    const choose = comb(n - 1, k, fac, ifac);

    // m * (m-1)^k
    let ways = choose * m % MOD;
    ways = ways * powMod(m - 1, k, MOD) % MOD;

    return ways;
}

// Examples to test (IOCE)
// Example 1
console.log(countGoodArrays(3, 2, 1));  // Output: 4

// Example 2
console.log(countGoodArrays(4, 2, 2));  // Output: 6

// Example 3
console.log(countGoodArrays(5, 2, 0));  // Output: 2

// For custom input (you can replace values here)
function runIO(): void {
    // Read input [Replace as needed]
    // Example: const [n, m, k] = [Number(prompt()), Number(prompt()), Number(prompt())];
    const n = 3, m = 2, k = 1;
    console.log(countGoodArrays(n, m, k));
}