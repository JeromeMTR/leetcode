/**
 * LeetCode 1411 - Number of Ways to Paint N × 3 Grid
 *
 * IOCE:
 * I: n (number) - number of rows
 * O: number - count of valid colorings modulo 1e9+7
 * C: 1 <= n <= 5000
 * E: n=1 => 12, large n up to 5000
 *
 * Approach:
 * Each row of 3 cells can be colored with 3 colors with horizontal adjacency constraint.
 * There are only 2 pattern types for a row:
 *  - Type A ("ABA"): first and third same, middle different. Count per row = 3 * 2 = 6
 *  - Type B ("ABC"): all three different. Count per row = 3 * 2 * 1 = 6
 *
 * DP over rows:
 * Let a[i] = ways up to row i where row i is Type A
 *     b[i] = ways up to row i where row i is Type B
 * Transitions (considering vertical adjacency constraints):
 *  a' = 3*a + 2*b
 *  b' = 2*a + 2*b
 *
 * Answer = (a[n] + b[n]) % MOD
 */

function numOfWays(n: number): number {
  const MOD = 1_000_000_007n;

  let a = 6n;
  let b = 6n;

  for (let i = 2; i <= n; i++) {
    const na = (3n * a + 2n * b) % MOD;
    const nb = (2n * a + 2n * b) % MOD;
    a = na;
    b = nb;
  }

  return Number((a + b) % MOD);
}

// Expected: 12 (for n = 1)
console.log('numOfWays(1) =>', numOfWays(1));
// Expected: 54 (for n = 2)
console.log('numOfWays(2) =>', numOfWays(2));
// Expected: 246 (for n = 3)
console.log('numOfWays(3) =>', numOfWays(3));
// A slightly larger value to sanity check performance
console.log('numOfWays(10) =>', numOfWays(10));
