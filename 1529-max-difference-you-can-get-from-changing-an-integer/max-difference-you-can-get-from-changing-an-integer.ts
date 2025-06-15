/**
 * Helper to replace all `x` digits in the number `numStr` by `y`.
 * Returns -1 if the result has a leading zero or is 0.
 */
function replaceDigits(numStr: string, x: string, y: string): number {
    let replaced = '';
    for (let ch of numStr) {
        replaced += (ch === x) ? y : ch;
    }
    // Check for leading zero or zero number
    if (replaced[0] === '0') return -1;
    const asNum = parseInt(replaced, 10);
    if (asNum === 0) return -1;
    return asNum;
}

/**
 * Find the max difference between two numbers
 * formed by the described digit replacement operation.
 *
 * @param num - the input integer
 * @returns the maximum difference
 */
function maxDiff(num: number): number {
    const numStr = num.toString();
    let maxVal = -1, minVal = Number.MAX_SAFE_INTEGER;

    // Try all ways to get the maximum number
    for (let x = 0; x <= 9; x++) {
        for (let y = 0; y <= 9; y++) {
            let newNum = replaceDigits(numStr, x.toString(), y.toString());
            if (newNum !== -1) {
                if (newNum > maxVal) maxVal = newNum;
                if (newNum < minVal) minVal = newNum;
            }
        }
    }

    return maxVal - minVal;
}

// IOCE

// Example 1
console.log(maxDiff(555)); // Output: 888

// Example 2
console.log(maxDiff(9)); // Output: 8

// Additional: Edge case with 100
console.log(maxDiff(100)); // 900 - 1 = 899

// Edge case: 12345
console.log(maxDiff(12345)); // Should print the maximum possible difference

/* 
Explanation:
- For max: replace smallest digit with 9.
- For min: replace highest (but not first) with 0 or 1, but not leading zero.
Since constraints are small (number up to 8 digits), brute force is fine.
*/