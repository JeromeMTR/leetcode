/**
 * Pacific Atlantic Water Flow Problem Solution in TypeScript
 * 
 * Given "heights" matrix, returns all coordinates [r, c] where water can flow to both oceans.
 */

function pacificAtlantic(heights: number[][]): number[][] {
    // --- Input Validation ---
    if (!heights.length || !heights[0].length) return [];

    // --- Helper / Declarations ---
    const m = heights.length;
    const n = heights[0].length;
    // For directions: up, down, left, right
    const dirs = [[1,0], [-1,0], [0,1], [0,-1]];

    // Reachable matrices for both oceans
    const pacific = Array.from({length: m}, () => Array(n).fill(false));
    const atlantic = Array.from({length: m}, () => Array(n).fill(false));

    // --- Depth-First Search marking reachable cells ---
    function dfs(r: number, c: number, visited: boolean[][], prevHeight: number) {
        // If out of bounds or already visited or the next cell is lower than previous
        if (
            r < 0 || r >= m ||
            c < 0 || c >= n ||
            visited[r][c] ||
            heights[r][c] < prevHeight
        ) {
            return;
        }
        visited[r][c] = true;
        for(const [dr, dc] of dirs) {
            dfs(r + dr, c + dc, visited, heights[r][c]);
        }
    }

    // --- Pacific DFS from first row and first column ---
    for(let i = 0; i < m; i++) dfs(i, 0, pacific, heights[i][0]);       // Left edge (Pacific)
    for(let j = 0; j < n; j++) dfs(0, j, pacific, heights[0][j]);       // Top edge (Pacific)

    // --- Atlantic DFS from last row and last column ---
    for(let i = 0; i < m; i++) dfs(i, n - 1, atlantic, heights[i][n - 1]); // Right edge (Atlantic)
    for(let j = 0; j < n; j++) dfs(m - 1, j, atlantic, heights[m - 1][j]); // Bottom edge (Atlantic)

    // --- Collect results: cells reachable for both oceans ---
    const result: number[][] = [];
    for(let r = 0; r < m; r++) {
        for(let c = 0; c < n; c++) {
            if (pacific[r][c] && atlantic[r][c]) {
                result.push([r, c]);
            }
        }
    }
    return result;
}

// --- IOCE (Input, Output, Constraints, Example) ---

// Example 1:
const heights1 = [
    [1,2,2,3,5],
    [3,2,3,4,4],
    [2,4,5,3,1],
    [6,7,1,4,5],
    [5,1,1,2,4]
];
console.log("Example 1 Output:", pacificAtlantic(heights1));
// Expected: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]

// Example 2:
const heights2 = [[1]];
console.log("Example 2 Output:", pacificAtlantic(heights2));
// Expected: [[0,0]]

// Constraints are handled by the approach and bounds checking above