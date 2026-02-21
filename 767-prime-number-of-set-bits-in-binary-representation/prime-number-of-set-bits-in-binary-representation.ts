/**
 * IOCE
 * Inputs:
 *  - left: number (1 <= left <= right <= 1e6)
 *  - right: number (0 <= right-left <= 1e4)
 *
 * Output:
 *  - number: count of integers x in [left, right] whose popcount(x) is prime
 *
 * Constraints / Complexity:
 *  - Range length <= 10^4, each popcount is O(#bits) <= ~20 (since right <= 1e6)
 *  - Space: O(1)
 *
 * Edge cases:
 *  - left == right (single number)
 *  - popcount == 0 or 1 (not prime)
 *  - maximum values near 1e6
 */

// Count set bits using Brian Kernighan's algorithm: repeatedly clears lowest set bit.
function popcount(n: number): number {
  let count = 0;
  while (n !== 0) {
    n &= n - 1;
    count++;
  }
  return count;
}

function countPrimeSetBits(left: number, right: number): number {
  // For numbers up to 1e6 (< 2^20), popcount ranges 0..20.
  // Prime popcounts in [0..20]: 2,3,5,7,11,13,17,19.
  const primeSet = new Set<number>([2, 3, 5, 7, 11, 13, 17, 19]);

  let ans = 0;
  for (let x = left; x <= right; x++) {
    const bits = popcount(x);
    if (primeSet.has(bits)) ans++;
  }
  return ans;
}

/* ----------------- Console log tests ----------------- */
console.log(countPrimeSetBits(6, 10), "expected:", 4);
console.log(countPrimeSetBits(10, 15), "expected:", 5);

// Edge tests
console.log(countPrimeSetBits(1, 1), "expected:", 0); // 1 -> 1 set bit (not prime)
console.log(countPrimeSetBits(7, 7), "expected:", 1); // 7 -> 111 (3 set bits, prime)
console.log(countPrimeSetBits(8, 8), "expected:", 0); // 8 -> 1000 (1 set bit, not prime)

// Additional sanity
console.log(countPrimeSetBits(1, 20), "expected:", "?", "(manual/spot-check)");