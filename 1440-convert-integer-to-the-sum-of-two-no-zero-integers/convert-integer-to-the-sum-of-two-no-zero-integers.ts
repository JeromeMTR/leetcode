/**
 * Check if a number is a No-Zero integer (i.e., does not contain the digit '0')
 * @param x number to check
 * @returns true if x is a No-Zero integer
 */
function isNoZero(x: number): boolean {
    return !x.toString().includes('0');
}

/**
 * Find two No-Zero integers that sum to n
 * @param n the target number
 * @returns an array of two No-Zero integers [a, b] such that a + b === n
 */
function getNoZeroIntegers(n: number): [number, number] {
    for (let a = 1; a < n; a++) {
        let b = n - a;
        if (isNoZero(a) && isNoZero(b)) {
            return [a, b];
        }
    }
    // As per constraints, there is always a solution, so we do not need to return anything else
    throw new Error("No solution found");
}

/*
IOCE Examples:

Example 1:
Input: n = 2
Output: [1, 1]

Example 2:
Input: n = 11
Output: [2, 9] // or any other valid such as [3, 8]
*/

// Test cases with console.log
console.log(getNoZeroIntegers(2));   // Output: [1, 1]
console.log(getNoZeroIntegers(11));  // Output: [2, 9] OR [3, 8] etc.
console.log(getNoZeroIntegers(100)); // Output: [1, 99] OR [11, 89] etc.
console.log(getNoZeroIntegers(101)); // Output: [11, 90] OR similar