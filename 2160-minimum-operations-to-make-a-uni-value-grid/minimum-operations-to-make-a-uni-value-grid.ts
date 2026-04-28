/*
IOCE

1) Inputs
- grid: number[][] -> 2D integer grid of size m x n
- x: number -> in one operation, we can add x or subtract x from any one cell

2) Output
- number -> minimum number of operations needed to make all grid values equal
- return -1 if it is impossible

3) Constraints
- 1 <= m, n <= 1e5
- 1 <= m * n <= 1e5
- 1 <= x, grid[i][j] <= 1e4

5) Time Complexity
- O(k log k)

6) Space Complexity
- O(k)

7) Edge Cases
- Single cell grid -> already uni-value, answer = 0
- All values already equal -> answer = 0
- Impossible due to modulo mismatch -> answer = -1
- Even number of elements -> either middle median works; using arr[Math.floor(k / 2)] is enough
*/

function minOperations(grid: number[][], x: number): number {
    const arr: number[] = [];

    // Flatten the grid into a 1D array
    for (const row of grid) {
        for (const val of row) {
            arr.push(val);
        }
    }

    // Check feasibility:
    // All elements must have the same remainder modulo x
    const remainder = arr[0] % x;
    for (const val of arr) {
        if (val % x !== remainder) {
            return -1;
        }
    }

    // Sort to find median
    arr.sort((a, b) => a - b);

    // Median minimizes sum of absolute differences
    const median = arr[Math.floor(arr.length / 2)];

    // Compute minimum operations
    let operations = 0;
    for (const val of arr) {
        operations += Math.abs(val - median) / x;
    }

    return operations;
}


// -------------------
// Console log tests
// -------------------

console.log(minOperations([[2, 4], [6, 8]], 2)); // Expected: 4
console.log(minOperations([[1, 5], [2, 3]], 1)); // Expected: 5
console.log(minOperations([[1, 2], [3, 4]], 2)); // Expected: -1
console.log(minOperations([[5]], 3)); // Expected: 0
console.log(minOperations([[1, 1], [1, 1]], 2)); // Expected: 0
console.log(minOperations([[3, 7, 11]], 4)); // Expected: 2
console.log(minOperations([[1, 2, 3], [4, 5, 6]], 1)); // Expected: 9
