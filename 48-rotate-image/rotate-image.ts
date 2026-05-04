/**
 * Rotate Image - In-place 90 degrees clockwise
 *
 * IOCE
 * ----
 * Input:
 * - matrix: number[][], an n x n square matrix
 *
 * Output:
 * - void
 * - Modify the given matrix in-place so it becomes rotated 90 degrees clockwise
 *
 * Constraints:
 * - n == matrix.length == matrix[i].length
 * - 1 <= n <= 20
 * - -1000 <= matrix[i][j] <= 1000
 *
 * Edge Cases:
 * - n = 1 -> matrix remains the same
 * - matrix with negative values
 * - matrix with repeated values
 * - even-sized matrix
 * - odd-sized matrix
 */

function rotate(matrix: number[][]): void {
    const n = matrix.length;

    // Step 1: Transpose the matrix
    // Swap matrix[i][j] with matrix[j][i] for j > i
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }

    // Step 2: Reverse each row
    for (let i = 0; i < n; i++) {
        let left = 0;
        let right = n - 1;

        while (left < right) {
            const temp = matrix[i][left];
            matrix[i][left] = matrix[i][right];
            matrix[i][right] = temp;
            left++;
            right--;
        }
    }
}

// ----------------------
// Console log tests
// ----------------------

console.log("Test 1 Output:", ((matrix: number[][]) => (rotate(matrix), JSON.stringify(matrix)))([[1, 2, 3], [4, 5, 6], [7, 8, 9]])); // Expected: [[7,4,1],[8,5,2],[9,6,3]]
console.log("Test 2 Output:", ((matrix: number[][]) => (rotate(matrix), JSON.stringify(matrix)))([[1]])); // Expected: [[1]]
console.log("Test 3 Output:", ((matrix: number[][]) => (rotate(matrix), JSON.stringify(matrix)))([[-1, -2], [-3, -4]])); // Expected: [[-3,-1],[-4,-2]]
console.log("Test 4 Output:", ((matrix: number[][]) => (rotate(matrix), JSON.stringify(matrix)))([[1, 2], [3, 4]])); // Expected: [[3,1],[4,2]]
