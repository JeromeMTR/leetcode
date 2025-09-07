// IOCE for the problem

// Input: n = 5
// Output: [-2, -1, 0, 1, 2]

// Input: n = 3
// Output: [-1, 0, 1]

// Input: n = 1
// Output: [0]

/**
 * Returns any array of n unique integers that sum up to 0
 * @param {number} n - the number of required elements
 * @returns {number[]} array of n unique integers summing to 0
 */
function sumZero(n: number): number[] {
    const result: number[] = [];

    // For each pair (+i and -i), add to result
    for (let i = 1; i <= Math.floor(n / 2); i++) {
        result.push(i);
        result.push(-i);
    }

    // If n is odd, add 0 to make sum 0 and count correct
    if (n % 2 === 1) {
        result.push(0);
    }

    return result;
}

// -- Example usage and test cases (IOCE) --

console.log(sumZero(5)); // e.g., [-2,-1,0,1,2]
console.log(sumZero(3)); // [-1,0,1]
console.log(sumZero(1)); // [0]
console.log(sumZero(4)); // [-2, -1, 1, 2] (order may differ)