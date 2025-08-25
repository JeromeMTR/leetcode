/**
 * Given an m x n matrix mat, return all elements of the matrix in diagonal order.
 *
 * @param mat - m x n 2D number array
 * @returns number[] - elements in diagonal order
 */
function findDiagonalOrder(mat: number[][]): number[] {
    const m = mat.length;
    const n = mat[0].length;
    const result: number[] = [];

    // Each diagonal index is i + j
    for (let d = 0; d < m + n - 1; d++) {
        // Temporary array to store elements of one diagonal
        const intermediate: number[] = [];

        // Find the starting row and column for this diagonal
        // If d < n, col starts at d, else col starts at n - 1
        let row = d < n ? 0 : d - n + 1;
        let col = d < n ? d : n - 1;
        
        // Collect all elements in this diagonal
        while (row < m && col >= 0) {
            intermediate.push(mat[row][col]);
            row++;
            col--;
        }

        // Even diagonals need to be reversed
        if (d % 2 === 0) {
            intermediate.reverse();
        }

        result.push(...intermediate);
    }

    return result;
}

// ---------------- IOCE ----------------

// Input 1
const mat1 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
// Output 1
console.log(findDiagonalOrder(mat1)); // [1,2,4,7,5,3,6,8,9]

// Input 2
const mat2 = [
    [1, 2],
    [3, 4]
];
// Output 2
console.log(findDiagonalOrder(mat2)); // [1,2,3,4]

// Input 3 (edge case: 1x1 matrix)
const mat3 = [
    [42]
];
console.log(findDiagonalOrder(mat3)); // [42]

/*
Explanation:
- For each diagonal (grouped by i+j index), collect elements and reverse if needed.
- Push to result array in order.
*/