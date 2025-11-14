// Function to update submatrices efficiently using 2D prefix sum (difference array) method
function rangeAddQueries(n: number, queries: number[][]): number[][] {
    // Initialize n x n matrix filled with 0s
    const mat: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
    
    // Use a 2D difference array to mark increments efficiently
    for (const [r1, c1, r2, c2] of queries) {
        mat[r1][c1] += 1;
        if (r2 + 1 < n) mat[r2 + 1][c1] -= 1;
        if (c2 + 1 < n) mat[r1][c2 + 1] -= 1;
        if (r2 + 1 < n && c2 + 1 < n) mat[r2 + 1][c2 + 1] += 1;
    }
    
    // First, prefix sum for rows
    for (let r = 0; r < n; r++) {
        for (let c = 1; c < n; c++) {
            mat[r][c] += mat[r][c - 1];
        }
    }

    // Then, prefix sum for columns
    for (let c = 0; c < n; c++) {
        for (let r = 1; r < n; r++) {
            mat[r][c] += mat[r - 1][c];
        }
    }

    return mat;
}

/*
IOCE (Input-Output-Corner-Example):
Input:
    n = 3
    queries = [[1,1,2,2],[0,0,1,1]]
Output:
    [[1,1,0],[1,2,1],[0,1,1]]

Explanation:
- The code uses a 2D difference matrix to efficiently apply each query so that after processing all queries,
  the prefix sums reconstruct the final matrix. This handles all overlapping queries correctly and fast.
*/