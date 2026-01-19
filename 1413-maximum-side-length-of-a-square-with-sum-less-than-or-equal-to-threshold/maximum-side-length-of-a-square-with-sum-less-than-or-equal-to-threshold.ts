// IOCE (Input / Output / Constraints / Edge cases)
// Input:
//   - mat: number[][] - 2D array representing the matrix values.
//   - threshold: number - maximum allowed sum for any square.
// Output:
//   - number - maximum side length of a square with sum <= threshold.
// Constraints (Time / Space):
//   - Time: O(m * n * log(min(m, n))) due to binary search and prefix sum.
//   - Space: O(m * n) for the prefix sum matrix.
// Edge cases:
//   - Empty matrix or single cell matrix.
//   - Threshold smaller than the smallest element in the matrix.
//   - Large matrices with uniform values.

/**
 * Finds the maximum side length of a square with sum less than or equal to the threshold.
 * @param mat - 2D integer matrix where mat[i][j] is the cell value.
 * @param threshold - Maximum allowed sum for any square.
 * @returns The maximum side length of a square with sum <= threshold.
 */

function maxSideLength(mat: number[][], threshold: number): number {
    const m = mat.length;
    const n = mat[0].length;

    // Create a prefix sum matrix
    const prefixSum: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            prefixSum[i][j] = mat[i - 1][j - 1] +
                              prefixSum[i - 1][j] +
                              prefixSum[i][j - 1] -
                              prefixSum[i - 1][j - 1];
        }
    }

    // Function to get the sum of the square with top-left at (i,j) and with side length `k`
    const getSquareSum = (i: number, j: number, k: number): number => {
        return prefixSum[i + k][j + k] -
               prefixSum[i][j + k] -
               prefixSum[i + k][j] +
               prefixSum[i][j];
    };

    // Binary search for the maximum side length
    let low = 0;
    let high = Math.min(m, n);

    while (low < high) {
        const mid = Math.floor((low + high + 1) / 2);
        let found = false;

        for (let i = 0; i + mid <= m; i++) {
            for (let j = 0; j + mid <= n; j++) {
                if (getSquareSum(i, j, mid) <= threshold) {
                    found = true;
                    break;
                }
            }
            if (found) break;
        }

        if (found) {
            low = mid;
        } else {
            high = mid - 1;
        }
    }

    return low;
}

// Test cases
console.log(maxSideLength([[1,1,3,2,4,3,2],[1,1,3,2,4,3,2],[1,1,3,2,4,3,2]], 4)); // Output: 2
console.log(maxSideLength([[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2]], 1)); // Output: 0
console.log(maxSideLength([[3,1,2,1]], 3)); // Expected: 1
console.log(maxSideLength([[1,2,1,2,1,2]], 4)); // Expected: 2
console.log(maxSideLength([[1,1,3,3,3,4,4,4,5,5]], 15)); // Expected: 4