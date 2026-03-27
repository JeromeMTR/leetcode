/*
IOCE

Inputs:
- mat: an m x n integer matrix
- k: number of cyclic shift operations

Output:
- Return true if after performing the shifts k times, the final matrix
  is identical to the original matrix; otherwise return false.

Constraints:
- 1 <= m, n <= 25
- 1 <= mat[i][j] <= 25
- 1 <= k <= 50

Edge Cases:
- n = 1: any cyclic shift keeps the row unchanged, so answer is always true.
- k % n = 0: every row returns to original positions, so answer is true.
- Rows with repeated patterns may remain unchanged even when shift is non-zero.
- Matrix with all equal values always remains unchanged.
*/

function areSimilar(mat: number[][], k: number): boolean {
    const m = mat.length;
    const n = mat[0].length;

    // Effective shift after reducing redundant full-row rotations
    const shift = k % n;

    // If effective shift is 0, matrix is definitely unchanged
    if (shift === 0) return true;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            let originalIndex: number;

            if (i % 2 === 0) {
                // Even row: left shift by 'shift'
                // Element at originalIndex moves to j after left shift
                // Final row[j] should equal original[(j + shift) % n]
                originalIndex = (j + shift) % n;
            } else {
                // Odd row: right shift by 'shift'
                // Final row[j] should equal original[(j - shift + n) % n]
                originalIndex = (j - shift + n) % n;
            }

            if (mat[i][j] !== mat[i][originalIndex]) {
                return false;
            }
        }
    }

    return true;
}


// Console log tests
console.log(areSimilar([[1,2,3],[4,5,6],[7,8,9]], 4)); // false
console.log(areSimilar([[1,2,1,2],[5,5,5,5],[6,3,6,3]], 2)); // true
console.log(areSimilar([[2,2],[2,2]], 3)); // true
console.log(areSimilar([[1]], 10)); // true
console.log(areSimilar([[1,2,3,1,2,3]], 3)); // true
console.log(areSimilar([[1,2,3,4]], 1)); // false
