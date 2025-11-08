/**
 * Minimum Operations to Make Integer 0
 *  - Use Gray code recursive approach
 *  - Flip the highest bit, then flip the next one down, etc.
 * 
 * @param n Input integer n
 * @returns Minimum number of operations to reduce n to 0
 */

// IOCE Example Input/Output
// Input:  n = 3    (binary: 11)
// Output: 2
//
// Input:  n = 6    (binary: 110)
// Output: 4

function minimumOneBitOperations(n: number): number {
    // Recursive Gray Code Method
    if (n === 0) return 0;
    
    // Find the position of the highest bit set
    // For example: if n = 6 (110), highestBit = 2
    let highestBit = 0;
    while ((1 << (highestBit + 1)) <= n) highestBit++;

    /*
      The pattern:
      f(n) = 2^k - 1 - f(n ^ (1 << k))
      where k = highest bit's position
    */

    // Calculate mask to flip the highest bit
    const mask = 1 << highestBit;

    // The main operation:
    // Reduce n by flipping the highest bit, then subtract recursively
    return (1 << (highestBit + 1)) - 1 - minimumOneBitOperations(n ^ mask);
}

// ------ Example / Test Cases ------

// Example 1:
const n1 = 3; // binary 11
console.log(`Input: n = ${n1}\nOutput: ${minimumOneBitOperations(n1)}\n`);
// Expected Output: 2

// Example 2:
const n2 = 6; // binary 110
console.log(`Input: n = ${n2}\nOutput: ${minimumOneBitOperations(n2)}\n`);
// Expected Output: 4

// Custom Test - Large Input
const n3 = 123456789;
console.log(`Input: n = ${n3}\nOutput: ${minimumOneBitOperations(n3)}\n`);

// Custom Test - Zero
const n0 = 0;
console.log(`Input: n = ${n0}\nOutput: ${minimumOneBitOperations(n0)}\n`);
// Expected Output: 0

/*
Commentary:

- The function uses recursion based on Gray code properties.
- At each step, it flips the highest set bit, and then recurses on the rest.
- Very efficient for n <= 10^9, as recursion depth is at most ~30.
*/