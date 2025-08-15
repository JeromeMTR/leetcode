/**
 * Returns true if n is a power of four, else false.
 * @param n - The integer to check
 * @returns boolean
 */
function isPowerOfFour(n: number): boolean {
    // 1. Must be positive
    if (n <= 0) return false;

    // 2. Must be power of two: only one bit set
    if ((n & (n - 1)) !== 0) return false;

    // 3. The only set bit must be in even position (0, 2, 4, ...)
    // 0x55555555 = 0b0101... pattern (32 bits)
    if ((n & 0x55555555) === 0) return false;

    // All conditions met: n is a power of four
    return true;
}

// --- Test cases (Examples) ---
console.log(isPowerOfFour(16)); // true
console.log(isPowerOfFour(5));  // false
console.log(isPowerOfFour(1));  // true
console.log(isPowerOfFour(64)); // true
console.log(isPowerOfFour(32)); // false