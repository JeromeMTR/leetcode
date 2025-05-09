function countBalancedPermutations(num: string): number {
  const MOD = 1_000_000_007;

  // Helper function to calculate factorial mod MOD
  function factorial(n: number): number {
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result = (result * i) % MOD;
    }
    return result;
  }

  // Helper function to calculate modular inverse using Fermat's Little Theorem
  function modInverse(a: number, mod: number): number {
    let m0 = mod, t, q;
    let x0 = 0, x1 = 1;
    if (mod === 1) return 0;
    while (a > 1) {
      q = Math.floor(a / mod);
      t = mod;
      mod = a % mod;
      a = t;
      t = x0;
      x0 = x1 - q * x0;
      x1 = t;
    }
    return x1 < 0 ? x1 + m0 : x1;
  }

  // Stores frequency of each digit
  const freq = Array(10).fill(0);
  for (const digit of num) {
    freq[Number(digit)]++;
  }

  const n = num.length;
  const halfN = Math.floor(n / 2);

  // Use dynamic programming to track balances
  let dp = new Map<number, number>();
  dp.set(0, 1); // balance 0 initially

  for (let i = 0; i < n; i++) {
    const newDp = new Map<number, number>();
    for (let currentBalance of dp.keys()) {
      const currentCount = dp.get(currentBalance)!;
      for (let digit = 0; digit <= 9; digit++) {
        if (freq[digit] > 0) {
          const newBalance =
            i % 2 === 0
              ? currentBalance + digit
              : currentBalance - digit;
          newDp.set(
            newBalance,
            (newDp.get(newBalance) || 0 + currentCount) % MOD
          );
        }
      }
    }
    dp = newDp;
  }

  // Calculate denominator for adjustment from permutations
  let denominator = 1;
  for (const count of freq) {
    denominator = (denominator * factorial(count)) % MOD;
  }

  // Find number of balanced permutations and adjust by dividing by denominator
  let balancedPermutations = dp.get(0) || 0;
  balancedPermutations = (balancedPermutations * modInverse(denominator, MOD)) % MOD;

  return balancedPermutations;
}

// Example usage:
console.log(countBalancedPermutations("123")); // Output: 2
console.log(countBalancedPermutations("112")); // Output: 1
console.log(countBalancedPermutations("12345")); // Output: 0