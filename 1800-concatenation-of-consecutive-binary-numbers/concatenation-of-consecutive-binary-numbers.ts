/**
 * IOCE
 * Inputs:
 *  - n: integer (1 <= n <= 1e5)
 *
 * Outputs:
 *  - integer: decimal value of the binary string formed by concatenating
 *    binaries of 1..n, modulo 1e9+7
 *
 * Constraints (time/space):
 *  - Time: O(n)
 *  - Space: O(1)
 *
 * Edge cases:
 *  - n = 1
 *  - when i hits powers of two (bit-length increases)
 *  - large n near 1e5 (must mod each step; use BigInt to avoid overflow)
 *
 * Approach:
 *  Maintain running answer ans. When appending binary of i with length L bits:
 *    ans = (ans << L) + i
 *  modulo MOD.
 *  Track L by increasing it whenever i is a power of two.
 */

const MOD = 1000000007n;

function concatenatedBinary(n: number): number {
  let ans = 0n;
  let bitLen = 0n;

  for (let i = 1n; i <= BigInt(n); i++) {
    // If i is a power of two, its bit length increases by 1.
    // Power of two test: i & (i - 1) == 0
    if ((i & (i - 1n)) === 0n) bitLen++;

    // Shift left by bitLen and add i, all modulo MOD
    ans = ((ans << bitLen) + i) % MOD;
  }

  return Number(ans);
}

/************* Console log tests *************/
console.log(concatenatedBinary(1));   // expected 1
console.log(concatenatedBinary(3));   // expected 27
console.log(concatenatedBinary(12));  // expected 505379714

// Additional quick checks
console.log(concatenatedBinary(2));   // "1" + "10" = "110" => 6
console.log(concatenatedBinary(4));   // "1""10""11""100" = "11011100" => 220