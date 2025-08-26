/**
 * Returns the area of the rectangle with the longest diagonal.
 * If there are multiple rectangles with equal diagonal, returns the one with the maximum area.
 *
 * @param dimensions 2D array where each inner array is [length, width]
 * @returns Area of the desired rectangle
 *
 * IOCE:
 * Input: [[9,3],[8,6]]  Output: 48
 * Input: [[3,4],[4,3]]  Output: 12
 */
function areaOfMaxDiagonal(dimensions: number[][]): number {
    // Initialize the max diagonal squared and max area for rectangles with max diagonal
    let maxDiagonalSq = -1; // Square of the max diagonal found so far
    let maxArea = 0;        // Area of the rectangle (with max diagonal and largest area)
    
    for (const [l, w] of dimensions) {
        // Compute diagonal squared
        const diagonalSq = l * l + w * w;
        const area = l * w;
        if (diagonalSq > maxDiagonalSq) {
            // Found a rectangle with a larger diagonal
            maxDiagonalSq = diagonalSq;
            maxArea = area;
        } else if (diagonalSq === maxDiagonalSq) {
            // Same max diagonal, check if this area is larger
            if (area > maxArea) {
                maxArea = area;
            }
        }
    }
    return maxArea;
}

/*
IOCE (Input, Output, Constraints, Examples):

Input: [[9,3],[8,6]]
Output: 48

Input: [[3,4],[4,3]]
Output: 12

Input: [[5,12],[13,5],[6,8]]
Output: 65

Input: [[1,1],[2,2],[3,3]]
Output: 18

Edge case:
Input: [[100,100]]
Output: 10000
*/

// Example usage:
console.log(areaOfMaxDiagonal([[9, 3], [8, 6]])); // 48
console.log(areaOfMaxDiagonal([[3, 4], [4, 3]])); // 12
console.log(areaOfMaxDiagonal([[5, 12], [13, 5], [6, 8]])); // 65
console.log(areaOfMaxDiagonal([[1, 1], [2, 2], [3, 3]])); // 9
console.log(areaOfMaxDiagonal([[100,100]])); // 10000