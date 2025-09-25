// IOCE (Input/Output/Constraints/Edge Cases)
// Input: triangle: number[][], where triangle.length >= 1, triangle[i].length == i + 1, values can be negative
// Output: number, the minimum path sum from top to bottom
// Constraints: 1 <= triangle.length <= 200, values in range [-10^4, 10^4]
// Edge cases: single row, all-negative values

function minimumTotal(triangle: number[][]): number {
    // Edge case: triangle has only one row
    if (triangle.length === 1) return triangle[0][0];

    // dp will store the minimum path sum for each index (initialize with last row)
    const dp = [...triangle[triangle.length - 1]];

    // Start from the second last row and iterate upwards
    for (let row = triangle.length - 2; row >= 0; row--) {
        for (let col = 0; col <= row; col++) {
            // Choose the smaller of the two reachable numbers in the row below, add current value
            dp[col] = triangle[row][col] + Math.min(dp[col], dp[col + 1]);
        }
    }

    // The result is at the top of the triangle, dp[0]
    return dp[0];
}

// Example usage:
const triangle1 = [[2],[3,4],[6,5,7],[4,1,8,3]];
console.log(minimumTotal(triangle1)); // Output: 11

const triangle2 = [[-10]];
console.log(minimumTotal(triangle2)); // Output: -10