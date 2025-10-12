// IOCE = Inclusion-Exclusion, Odd Compositions Enumeration
const MOD = 1_000_000_007;

// Precompute factorials and inverse factorials up to 50*2 (as m <= 30)
function initFactorials(max: number): {fac: number[], ifac: number[]} {
    const fac = [1], ifac = [1];
    for (let i = 1; i <= max; ++i) fac.push(fac[i-1] * i % MOD);
    // Compute ifac[n] = fac[n]^{-1} % MOD using Fermat's Little Theorem
    ifac[max] = powmod(fac[max], MOD-2, MOD);
    for (let i = max-1; i >= 1; --i) ifac[i] = ifac[i+1] * (i+1) % MOD;
    return {fac, ifac};
}
function powmod(a: number, e: number, mod: number): number {
    let r = 1, b = a % mod;
    while (e > 0) {
        if (e & 1) r = r * b % mod;
        b = b * b % mod;
        e >>= 1;
    }
    return r;
}

// Enumerate all k-size indices from 0..n-1
function kSubsets(n: number, k: number, callback: (idx: number[]) => void) {
    const subset: number[] = [];
    function dfs(start: number, remain: number) {
        if (remain === 0) {
            callback([...subset]);
            return;
        }
        for (let i = start; i <= n - remain; ++i) {
            subset.push(i);
            dfs(i + 1, remain - 1);
            subset.pop();
        }
    }
    dfs(0, k);
}

// Generate all k-length odd compositions such that sum c_j = m, all c_j odd ≥ 1
function oddCompositions(k: number, totalOdd: number, callback: (counts: number[]) => void) {
    // c_j = 2 * x_j + 1, sum x_j = t = (totalOdd - k)/2
    const t = (totalOdd - k) / 2;
    const x: number[] = Array(k).fill(0);
    function dfs(pos: number, left: number) {
        if (pos === k - 1) {
            x[pos] = left;
            callback(x.map(v => 2 * v + 1));
            return;
        }
        for (let i = 0; i <= left; ++i) {
            x[pos] = i;
            dfs(pos + 1, left - i);
        }
    }
    if (t >= 0 && Number.isInteger(t)) {
        dfs(0, t);
    }
}

// Main function
function magicalSequencesSum(m: number, k: number, nums: number[]): number {
    const n = nums.length;
    // Precompute factorials
    const {fac, ifac} = initFactorials(m);

    let result = 0;
    // For all k-subsets of [0..n-1] (these are the set bits of mask)
    kSubsets(n, k, (indices) => {
        // Only possible if m >= k and (m - k) even
        if (m < k || ((m - k) & 1)) return;
        // odd compositions
        oddCompositions(k, m, (counts) => {
            // multinomial coefficient: m! / (c1! * ... * ck!)
            let comb = fac[m];
            for (let i = 0; i < k; ++i) comb = comb * ifac[counts[i]] % MOD;
            // product
            let prod = 1;
            for (let i = 0; i < k; ++i) prod = prod * powmod(nums[indices[i]], counts[i], MOD) % MOD;
            result = (result + comb * prod) % MOD;
        });
    });
    return result;
}

// =============== Example IOCE ===============

// Example 1:
console.log(magicalSequencesSum(5, 5, [1,10,100,10000,1000000])); // Output: 991600007

// Example 2:
console.log(magicalSequencesSum(2, 2, [5,4,3,2,1])); // Output: 170

// Example 3:
console.log(magicalSequencesSum(1, 1, [28])); // Output: 28

// ============================================

/*
    IOCE Summary:
    1. For every k-element subset of indices, generate all "odd compositions" of m.
    2. Each composition gives counts of appearances for each index. 
    3. Only these sequences produce binary sum with exactly k set bits.
    4. For each, count arrangements (multinomial), multiply products, add to answer.
    5. Return modulo 10^9+7.
*/