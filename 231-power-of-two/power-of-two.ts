Sure! Here’s how to solve the problem in TypeScript, with **IOCE** (Input, Output, Constraints, Example) annotations and code with comments.

---

### IOCE

**Input**:  
An integer `n`

**Output**:  
A boolean value: `true` if `n` is a power of two, `false` otherwise.

**Constraints**:  
- `-2^31 <= n <= 2^31 - 1`

**Examples**:  
- Input: `n = 1` &rarr; Output: `true` (since 2⁰ = 1)
- Input: `n = 16` &rarr; Output: `true` (since 2⁴ = 16)
- Input: `n = 3` &rarr; Output: `false`

---

### TypeScript Solution (No Loop/Recursion, Efficient & Well-commented)

/**
 * Determines if the given number is a power of two.
 * @param n - the integer to check
 * @returns true if n is a power of two, false otherwise
 */
function isPowerOfTwo(n: number): boolean {
    // A power of two must be > 0 (since negative powers cycle or become fractions, and 0 isn't a power of two)
    // Property: powers of 2 in binary have only one bit set (e.g., 4: 100, 8: 1000, etc.)
    // n & (n-1) == 0 only for powers of two and zero.
    if (n <= 0) return false;
    return (n & (n - 1)) === 0;
}

// Example usage:
console.log(isPowerOfTwo(1));  // true, since 2^0 = 1
console.log(isPowerOfTwo(16)); // true, since 2^4 = 16
console.log(isPowerOfTwo(3));  // false, 3 isn't a power of two

/* 
Follow-up (no loop/recursion):  
This solution only uses arithmetic and bitwise operations, no loops or recursion.
*/

---

**Explanation**:  
- We check if `n > 0` (since negative numbers and zero are not positive powers of two).
- For a power of two, its binary representation contains only a single `1` bit.  
  Example: `16` is `10000` in binary.
- Subtracting one flips all lower bits:  
  `16 - 1 == 15` ⇨ `10000 - 1 = 01111`  
- Doing an AND (`&`) between `16` and `15` yields zero if and only if `16` was a power of two.

---

Let me know if you'd like more details!