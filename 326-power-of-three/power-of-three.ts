/**
 * Determines if the provided integer is a power of three
 * @param n - integer to check
 * @returns true if n is a power of three, else false
 */
function isPowerOfThree(n: number): boolean {
    // Edge case: powers of 3 must be positive integers > 0
    if (n < 1) return false;

    // Keep dividing n by 3
    while (n % 3 === 0) {
        n = n / 3;
    }

    // If n becomes 1, it was power of 3
    return n === 1;
}

// Usage examples
console.log(isPowerOfThree(27)); // true
console.log(isPowerOfThree(0));  // false
console.log(isPowerOfThree(-1)); // false