// Function to compute area of triangle given by 3 points
function triangleArea(A: number[], B: number[], C: number[]): number {
    const [x1, y1] = A;
    const [x2, y2] = B;
    const [x3, y3] = C;
    // Shoelace formula
    return Math.abs(
        x1 * (y2 - y3) +
        x2 * (y3 - y1) +
        x3 * (y1 - y2)
    ) / 2;
}

// Main function
function largestTriangleArea(points: number[][]): number {
    let n = points.length;
    let maxArea = 0;

    // Check every combination of 3 different points
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            for (let k = j + 1; k < n; k++) {
                const area = triangleArea(points[i], points[j], points[k]);
                if (area > maxArea) maxArea = area;
            }
        }
    }
    return maxArea;
}

// ----------------------------------------------------------------------------
// IOCE (Input, Output, Constraints, Examples)
// ----------------------------------------------------------------------------

// Input: array of points
// Output: number, the area of the largest triangle that can be formed
// Constraints:
//   - 3 <= points.length <= 50
//   - -50 <= x_i, y_i <= 50
//   - All points are unique

// Examples:

// Example 1
const points1 = [[0,0],[0,1],[1,0],[0,2],[2,0]];
console.log(largestTriangleArea(points1)); // Output: 2.00000

// Example 2
const points2 = [[1,0],[0,0],[0,1]];
console.log(largestTriangleArea(points2)); // Output: 0.50000

// Example 3 - Colinear points
const points3 = [[0,0],[2,0],[4,0],[1,1],[2,2]];
console.log(largestTriangleArea(points3)); // Output: 4.00000

// ----------------------------------------------------------------------------
// Explanation:
// - Shoelace formula is used for area calculation
// - Triple nested loops (since n is small, O(N^3) is acceptable)
// - Updates max area if a larger one is found
// ----------------------------------------------------------------------------