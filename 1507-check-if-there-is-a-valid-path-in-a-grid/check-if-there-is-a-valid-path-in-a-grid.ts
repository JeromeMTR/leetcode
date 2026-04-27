/*
IOCE

Inputs:
- grid: number[][]
  - grid is an m x n matrix
  - each cell has a street type from 1 to 6

Outputs:
- boolean
  - true if there exists a valid path from (0, 0) to (m - 1, n - 1)
  - false otherwise

Constraints:
- 1 <= m, n <= 300
- 1 <= grid[i][j] <= 6

Edge Cases:
- 1x1 grid => always true, since start == end
- starting cell has no valid outgoing connection => false
- path exists only if both current cell and neighbor cell connect to each other
- disconnected cycles should not cause infinite loops because of visited tracking
*/

function hasValidPath(grid: number[][]): boolean {
    const m = grid.length;
    const n = grid[0].length;

    // Direction indices:
    // 0 = left, 1 = right, 2 = up, 3 = down
    const dirs = [
        [0, -1], // left
        [0, 1],  // right
        [-1, 0], // up
        [1, 0],  // down
    ];

    // Opposite direction mapping
    const opposite = [1, 0, 3, 2];

    // For each street type, store which directions are allowed
    const streetDirs: number[][] = [
        [],         // dummy for 0-index alignment
        [0, 1],     // type 1: left, right
        [2, 3],     // type 2: up, down
        [0, 3],     // type 3: left, down
        [1, 3],     // type 4: right, down
        [0, 2],     // type 5: left, up
        [1, 2],     // type 6: right, up
    ];

    // visited[r][c] = whether cell has been processed
    const visited: boolean[][] = Array.from({ length: m }, () => Array(n).fill(false));

    // BFS queue
    const queue: [number, number][] = [[0, 0]];
    visited[0][0] = true;

    while (queue.length > 0) {
        const [r, c] = queue.shift()!;

        // If we reached destination, valid path exists
        if (r === m - 1 && c === n - 1) {
            return true;
        }

        const type = grid[r][c];

        // Try all directions allowed by current street
        for (const d of streetDirs[type]) {
            const nr = r + dirs[d][0];
            const nc = c + dirs[d][1];

            // Check boundaries
            if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;
            if (visited[nr][nc]) continue;

            const nextType = grid[nr][nc];

            if (streetDirs[nextType].includes(opposite[d])) {
                visited[nr][nc] = true;
                queue.push([nr, nc]);
            }
        }
    }

    return false;
}

// --------------------
// Console log tests
// --------------------

console.log(hasValidPath([[2, 4, 3], [6, 5, 2]])); // true
console.log(hasValidPath([[1, 2, 1], [1, 2, 1]])); // false
console.log(hasValidPath([[1, 1, 2]])); // false
console.log(hasValidPath([[1]])); // true
console.log(hasValidPath([[2], [2], [2]])); // true
console.log(hasValidPath([[1, 1], [1, 1]])); // false