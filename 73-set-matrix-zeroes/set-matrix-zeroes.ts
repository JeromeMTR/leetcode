/**
 * Sets entire row and column to 0 wherever a 0 appears, in place.
 * 
 * @param matrix - 2D array of numbers (m x n)
 * @returns void (matrix is modified in-place)
 */
function setZeroes(matrix: number[][]): void {
    const m = matrix.length;
    const n = matrix[0].length;

    // IOCE: In/Out/Constraints/Example
    // In: matrix: number[][]
    // Out: void (modifies matrix in-place)
    // Constraints: 1 <= m, n <= 200
    // Example: input [[1,1,1],[1,0,1],[1,1,1]] => [[1,0,1],[0,0,0],[1,0,1]]

    // First mark if first row/column need to be zero
    let zeroFirstRow = false;
    let zeroFirstCol = false;

    for (let i = 0; i < m; i++) {
        if (matrix[i][0] === 0) zeroFirstCol = true;
    }
    for (let j = 0; j < n; j++) {
        if (matrix[0][j] === 0) zeroFirstRow = true;
    }

    // Use first row/col to mark rows/cols that should be zero
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = 0;   // mark the row
                matrix[0][j] = 0;   // mark the column
            }
        }
    }

    // Zero cells based on marks (excluding the first row/col)
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                matrix[i][j] = 0;
            }
        }
    }

    // Zero the first row if needed
    if (zeroFirstRow) {
        for (let j = 0; j < n; j++) {
            matrix[0][j] = 0;
        }
    }

    // Zero the first column if needed
    if (zeroFirstCol) {
        for (let i = 0; i < m; i++) {
            matrix[i][0] = 0;
        }
    }
}

/* Example usage: */
const matrix1 = [
  [1,1,1],
  [1,0,1],
  [1,1,1]
];
setZeroes(matrix1);
console.log(matrix1); // [[1,0,1],[0,0,0],[1,0,1]]

const matrix2 = [
  [0,1,2,0],
  [3,4,5,2],
  [1,3,1,5]
];
setZeroes(matrix2);
console.log(matrix2); // [[0,0,0,0],[0,4,5,0],[0,3,1,0]]