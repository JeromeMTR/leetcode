/**
 * IOCE
 * I: integer array nums
 * O: sum of divisors of numbers that have exactly 4 positive divisors
 * C: 1 <= nums.length <= 1e4, 1 <= nums[i] <= 1e5
 * E: duplicates allowed; if none have exactly 4 divisors => 0
 */

/**
 * A number has exactly 4 divisors iff it is:
 * 1) p^3 where p is prime  => divisors: 1, p, p^2, p^3 (sum = 1 + p + p^2 + p^3)
 * 2) p*q where p and q are distinct primes => divisors: 1, p, q, pq (sum = 1 + p + q + pq)
 *
 * For each n, find its smallest prime factorization info in O(sqrt(n)).
 * nums[i] <= 1e5 so sqrt is at most 316; with 1e4 elements it's fine.
 */

function sumFourDivisors(nums: number[]): number {
  let total = 0;

  for (const n of nums) {
    total += sumIfExactlyFourDivisors(n);
  }

  return total;
}

/** Returns sum of divisors if n has exactly 4 divisors; otherwise 0. */
function sumIfExactlyFourDivisors(n: number): number {
  if (n < 6) return 0; // 1..5 cannot have 4 divisors

  // Find the smallest divisor d >= 2
  let d = 2;
  const limit = Math.floor(Math.sqrt(n));
  while (d <= limit && n % d !== 0) d++;

  // If no divisor found, n is prime => only 2 divisors
  if (d > limit) return 0;

  const a = d;
  const b = n / d;

  // Case A: n = p^3 (a == p, b == p^2)
  // That happens when b % a == 0 and (b/a) == a (i.e., b == a^2)
  if (b === a * a && isPrime(a)) {
    // sum = 1 + p + p^2 + p^3
    return 1 + a + a * a + n;
  }

  // Case B: n = p*q with distinct primes p != q
  // Here a is a divisor; need both a and b to be prime and a != b
  if (a !== b && isPrime(a) && isPrime(b)) {
    return 1 + a + b + n;
  }

  return 0;
}

/** Primality test for x <= 1e5 (fast enough). */
function isPrime(x: number): boolean {
  if (x < 2) return false;
  if (x === 2) return true;
  if (x % 2 === 0) return false;
  const r = Math.floor(Math.sqrt(x));
  for (let i = 3; i <= r; i += 2) {
    if (x % i === 0) return false;
  }
  return true;
}