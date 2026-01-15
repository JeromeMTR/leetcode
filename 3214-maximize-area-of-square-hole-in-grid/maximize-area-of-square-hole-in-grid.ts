/**
 * IOCE:
 * Input:
 *   - n: number of rows in the grid
 *   - m: number of columns in the grid
 *   - hBars: array of horizontal bar indices removed (1-based)
 *   - vBars: array of vertical bar indices removed (1-based)
 * Output:
 *   - Returns the maximum area of a square hole that can be formed in the grid
 * Constraints:
 *   - 1 <= n, m <= 10^4 (or as per problem statement)
 *   - 1 <= hBars.length <= n, 1 <= vBars.length <= m
 *   - Bar indices are unique and within grid bounds
 * Edge Cases:
 *   - Only one bar removed in each direction
 *   - All bars are consecutive
 *   - Non-consecutive bars
 *   - Empty hBars or vBars (if allowed by problem)
 */

function maxSquare(n: number, m: number, hBars: number[], vBars: number[]): number {
    function maxConsecutive(arr: number[]): number {
        if (arr.length === 0) return 0;
        let maxLen = 1, curLen = 1;
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] === arr[i - 1] + 1) {
                curLen++;
            } else {
                curLen = 1;
            }
            maxLen = Math.max(maxLen, curLen);
        }
        return maxLen;
    }

    hBars.sort((a, b) => a - b);
    vBars.sort((a, b) => a - b);

    const hmax = maxConsecutive(hBars);
    const vmax = maxConsecutive(vBars);
    const side = Math.min(hmax, vmax) + 1;
    return side * side;
}

// Test cases
console.log(maxSquare(2, 1, [2, 3], [2])); // Expected output: 4
console.log(maxSquare(1, 1, [2], [2])); // Expected output: 4
console.log(maxSquare(2, 3, [2, 3], [2, 4])); // Expected output: 4