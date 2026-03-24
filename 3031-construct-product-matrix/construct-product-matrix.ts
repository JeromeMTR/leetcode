/**
 * Input
 * grid: number[][] - 2D array of integers representing the input grid (n x m)
 *
 * Output
 * number[][] - Product matrix where each cell p[i][j] contains the product of all
 *              grid elements except grid[i][j], computed in flattened row-major order,
 *              all values mod 12345
 *
 */

function constructProductMatrix(grid: number[][]): number[][] {
    const MOD: number = 12345;
    const n: number = grid.length,
        m: number = grid[0].length;
    const res: number[][] = Array.from({ length: n }, () => new Array(m).fill(0));

    let suffix: number = 1;
    for (let i = n - 1; i >= 0; i--) {
        for (let j = m - 1; j >= 0; j--) {
            p[i][j] = suffix;
            suffix = (suffix * grid[i][j]) % MOD;
        }
    }

    let prefix: number = 1;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            p[i][j] = (p[i][j] * prefix) % MOD;
            prefix = (prefix * grid[i][j]) % MOD;
        }
    }

    return res;
}

// Test cases
console.log(constructProductMatrix([[1, 2], [3, 4]])); // Output: [[24, 12], [8, 6]]
console.log(constructProductMatrix([[12345], [2], [1]])); // Output: [[2], [0], [0]]
console.log(productMatrix([[1, 0], [3, 4]])); // Output: [[0, 12], [0, 0]]