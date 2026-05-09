/*
IOCE

Inputs
- grid: number[][]
  - An m x n integer matrix
- k: number
  - Number of cyclic rotations to apply

Output
- number[][]
  - The matrix after rotating every layer counter-clockwise k times

Constraints
- 2 <= m, n <= 50
- m and n are even
- 1 <= grid[i][j] <= 5000
- 1 <= k <= 1e9

Edge Cases
- Smallest matrix: 2 x 2
- Large k, so we must use k % layerLength
- Multiple layers
- Square and rectangular matrices
- Inner layers with small perimeter (like 2 x 2)

*/

function rotateGrid(grid: number[][], k: number): number[][] {
    const m = grid.length;
    const n = grid[0].length;

    // Result matrix starts as a copy of grid
    const result: number[][] = grid.map(row => [...row]);

    // Number of layers
    const layers = Math.min(m, n) / 2;

    for (let layer = 0; layer < layers; layer++) {
        const top = layer;
        const left = layer;
        const bottom = m - 1 - layer;
        const right = n - 1 - layer;

        const ring: number[] = [];

        // Extract layer in clockwise traversal order:
        // top row: left -> right
        for (let col = left; col <= right; col++) {
            ring.push(grid[top][col]);
        }

        // right column: top+1 -> bottom-1
        for (let row = top + 1; row <= bottom - 1; row++) {
            ring.push(grid[row][right]);
        }

        // bottom row: right -> left
        for (let col = right; col >= left; col--) {
            ring.push(grid[bottom][col]);
        }

        // left column: bottom-1 -> top+1
        for (let row = bottom - 1; row >= top + 1; row--) {
            ring.push(grid[row][left]);
        }

        const len = ring.length;
        const shift = k % len;

        // Counter-clockwise movement on the matrix corresponds to left rotation
        // of this extracted ring order.
        const rotated = ring.slice(shift).concat(ring.slice(0, shift));

        let idx = 0;

        // Write back in the same traversal order

        // top row: left -> right
        for (let col = left; col <= right; col++) {
            result[top][col] = rotated[idx++];
        }

        // right column: top+1 -> bottom-1
        for (let row = top + 1; row <= bottom - 1; row++) {
            result[row][right] = rotated[idx++];
        }

        // bottom row: right -> left
        for (let col = right; col >= left; col--) {
            result[bottom][col] = rotated[idx++];
        }

        // left column: bottom-1 -> top+1
        for (let row = bottom - 1; row >= top + 1; row--) {
            result[row][left] = rotated[idx++];
        }
    }

    return result;
}

// Testcases
console.log(rotateGrid([
    [40, 10],
    [30, 20],
], 1)); // [[10, 20], [40, 30]]

console.log(rotateGrid([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
], 2)); // [[3, 4, 8, 12], [2, 11, 10, 16], [1, 7, 6, 15], [5, 9, 13, 14]]

console.log(rotateGrid([
    [1, 2],
    [3, 4],
    [5, 6],
    [7, 8],
], 3)); // [[8, 7], [6, 5], [4, 3], [2, 1]]
