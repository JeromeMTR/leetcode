// Function to count the number of square triples (a, b, c)
// such that 1 <= a, b, c <= n and a^2 + b^2 = c^2
function countTriples(n: number): number {
    let count = 0;
    // Precompute squares for efficiency
    // Array for quick lookup of perfect squares up to n^2
    const isSquare = new Array(n * n + 1).fill(false);
    for (let i = 1; i <= n; i++) {
        isSquare[i * i] = true;
    }

    // Iterate over all possible c
    for (let c = 1; c <= n; c++) {
        // Iterate all possible a and b (a and b can be equal or different)
        for (let a = 1; a < c; a++) {
            const b2 = c * c - a * a;
            // b^2 must be positive and a valid square in [1, n]
            if (b2 > 0 && isSquare[b2]) {
                // Get b
                const b = Math.sqrt(b2);
                // b is integer and in allowed range
                if (b >= 1 && b <= n && Number.isInteger(b)) {
                    count++;
                }
            }
        }
    }
    // Each triple (a,b,c) and (b,a,c) will be counted separately, which is desired
    return count;
}

// IOCE (Input / Output Commented Example)
// Example 1:
console.log(countTriples(5)); // Output: 2

// Example 2:
console.log(countTriples(10)); // Output: 4