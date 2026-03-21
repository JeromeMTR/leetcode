function flipSubmatrix(grid: number[][], x: number, y: number, k: number): number[][] {
    // Swap the rows vertically within the submatrix defined by x, y, and k
    for (let i = 0; i < Math.floor(k / 2); i++) {
        // Perform a swap between row `x + i` and `x + k - 1 - i`
        for (let j = 0; j < k; j++) {
            const temp = grid[x + i][y + j];
            grid[x + i][y + j] = grid[x + k - 1 - i][y + j];
            grid[x + k - 1 - i][y + j] = temp;
        }
    }
    return grid;
}

// Test cases
console.log(flipSubmatrix(
    [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]],
    1, 0, 3
)); // Expected output: [[1, 2, 3, 4], [13, 14, 15, 8], [9, 10, 11, 12], [5, 6, 7, 16]]

console.log(flipSubmatrix(
    [[3, 4, 2, 3], [2, 3, 4, 2]],
    0, 2, 2
)); // Expected output: [[3, 4, 4, 2], [2, 3, 2, 3]]