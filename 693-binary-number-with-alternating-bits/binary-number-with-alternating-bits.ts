/**
 * IOCE
 * ----
 * Input:
 *   - n: positive integer (1 <= n <= 2^31 - 1)
 *
 * Output:
 *   - boolean: true if n's binary representation has alternating adjacent bits, else false
 *
 * Constraints / Complexity:
 *   - Time: O(1) since n is bounded by 2^31 - 1 (at most 31 bits)
 *  - Space: O(1) extra
 *
 * Edge cases:
 *   - n = 1 ("1") -> true
 *   - numbers with repeating bits like 3 ("11"), 7 ("111") -> false
 *   - large values near 2^31 - 1
 *
 **/

function hasAlternatingBits(n: number): boolean {
  const x = n ^ (n >> 1);
  return (x & (x + 1)) === 0;
}

/* ------------------- Tests (console logs) ------------------- */
console.log(hasAlternatingBits(5), "expected:", true);
console.log(hasAlternatingBits(7), "expected:", false);
console.log(hasAlternatingBits(11), "expected:", false);

// Additional checks
console.log(hasAlternatingBits(1), "expected:", true);
console.log(hasAlternatingBits(2), "expected:", true);
console.log(hasAlternatingBits(3), "expected:", false);
console.log(hasAlternatingBits(10), "expected:", true);
