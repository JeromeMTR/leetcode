/**
 * Count the number of submatrices with all 1s in a binary matrix
 * 
 * @param mat binary matrix (0s and 1s)
 * @returns number of submatrices consisting of only 1s
 */
function numSubmat(mat: number[][]): number {
    const m = mat.length;
    const n = mat[0].length;

    // heights[j]: for column j, the current count of continuous 1s up to row i
    const heights: number[] = new Array(n).fill(0);
    let count = 0;

    // For each row in the matrix
    for (let i = 0; i < m; i++) {

        // Update heights for this row
        for (let j = 0; j < n; j++) {
            if (mat[i][j] === 0) {
                heights[j] = 0;
            } else {
                heights[j] += 1;
            }
        }
        
        // For each column, look back to count rectangles ending at this cell
        for (let j = 0; j < n; j++) {
            // Only consider if there are any 1s (height > 0)
            if (heights[j] === 0) continue;
            let minHeight = heights[j];
            // For all rectangles ending at (i, j), with left edge at k
            for (let k = j; k >= 0 && heights[k] > 0; k--) {
                minHeight = Math.min(minHeight, heights[k]);
                count += minHeight;
            }
        }
    }
    return count;
}