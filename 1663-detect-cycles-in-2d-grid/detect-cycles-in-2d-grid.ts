/**
 * Detect Cycles in 2D Grid
 *
 * IOCE
 * ----
 * Inputs:
 * - grid: character matrix of size m x n
 *   - grid[i][j] is a lowercase English letter
 *
 * Output:
 * - boolean
 *   - true  -> if there exists a cycle made of the same character
 *   - false -> otherwise
 *
 * Constraints:
 * - 1 <= m, n <= 500
 * - grid consists only of lowercase English letters
 *
 * Edge Cases:
 * - 1x1 grid -> false
 * - Single row / single column -> false (cannot form cycle of length >= 4)
 * - Grid with all same characters -> often true if dimensions allow a loop
 * - Multiple disconnected components of same character
 * - Revisiting the immediate parent should NOT be considered a cycle
 */

function containsCycle(grid: string[][]): boolean {
    const m = grid.length;
    const n = grid[0].length;

    const visited: boolean[][] = Array.from({ length: m }, () => Array(n).fill(false));
    const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];

    function dfs(row: number, col: number, parentRow: number, parentCol: number, char: string): boolean {
        visited[row][col] = true;

        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;

            // Out of bounds
            if (newRow < 0 || newRow >= m || newCol < 0 || newCol >= n) continue;

            // Must have the same character
            if (grid[newRow][newCol] !== char) continue;

            // Ignore the cell we came from
            if (newRow === parentRow && newCol === parentCol) continue;

            // If already visited and it's not the parent, cycle exists
            if (visited[newRow][newCol]) return true;

            // Continue DFS
            if (dfs(newRow, newCol, row, col, char)) return true;
        }

        return false;
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (!visited[i][j]) {
                if (dfs(i, j, -1, -1, grid[i][j])) {
                    return true;
                }
            }
        }
    }

    return false;
}

// -------------------------
// Console log tests
// -------------------------

console.log(
    containsCycle([
        ["a", "a", "a", "a"],
        ["a", "b", "b", "a"],
        ["a", "b", "b", "a"],
        ["a", "a", "a", "a"],
    ]),
    "=> expected true"
);

console.log(
    containsCycle([
        ["c", "c", "c", "a"],
        ["c", "d", "c", "c"],
        ["c", "c", "e", "c"],
        ["f", "c", "c", "c"],
    ]),
    "=> expected true"
);

console.log(
    containsCycle([
        ["a", "b", "b"],
        ["b", "z", "b"],
        ["b", "b", "a"],
    ]),
    "=> expected false"
);

console.log(
    containsCycle([["a"]]),
    "=> expected false"
);

console.log(
    containsCycle([
        ["a", "a"],
        ["a", "a"],
    ]),
    "=> expected true"
);

console.log(
    containsCycle([
        ["a", "b", "c"],
        ["d", "e", "f"],
        ["g", "h", "i"],
    ]),
    "=> expected false"
);