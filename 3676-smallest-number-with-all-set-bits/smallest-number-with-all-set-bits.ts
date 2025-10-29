/**
 * Returns the smallest number >= n whose binary representation is all set bits (1's).
 * 
 * @param n - The lower bound integer (1 <= n <= 1000)
 * @returns The smallest integer x >= n such that x is of the form 2^k - 1
 */
function smallestAllSetBits(n: number): number {
    // Start with k = 1 and increment up to some reasonable upper bound.
    // 2^k - 1 grows very fast, so k will not be large for n <= 1000.
    let k = 1;
    while (true) {
        // Compute 2^k - 1
        const x = (1 << k) - 1;
        if (x >= n) {
            return x;
        }
        k++;
    }
}

// ----- EXAMPLES (IOCE) -----
console.log(smallestAllSetBits(5));  // Output: 7   ('111')
console.log(smallestAllSetBits(10)); // Output: 15  ('1111')
console.log(smallestAllSetBits(3));  // Output: 3   ('11')

// ----- Additional test cases -----
console.log(smallestAllSetBits(1));   // Output: 1 ('1')
console.log(smallestAllSetBits(1000)); // Output: 1023 ('1111111111')