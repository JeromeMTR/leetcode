// ================== IOCE (Input / Output / Constraints / Edge cases) ==================
// Input:
// - grid: m x n matrix of non-negative costs; moving to a neighbor adds that neighbor's cost.
// - k: maximum number of teleportations allowed.
//
// Teleportation model assumed by this solution:
// - You may teleport between any two cells that share the same grid value.
// - Each teleport uses 1 from k and does not add movement cost itself.
//
// Output:
// - Minimum total cost to reach (m-1, n-1) from (0, 0) using right/down moves and up to k teleports.
//
// Constraints (updated):
// - 1 <= m, n <= 1000 (actual limits depend on the problem statement).
// - 0 <= grid[i][j] <= 10^9.
// - 0 <= k <= 10^6 (practical bounds vary; algorithm handles any integer k >= 0).
//
// Edge cases:
// - Single cell grid (m = n = 1): cost is 0 (already at target).
// - Empty grid: treated as 0.
// - k = 0: behaves like standard DP with no teleportation.
// - All cells same value: teleports can propagate minimal costs widely.
//
// Complexity:
// - Preprocessing sort: O((m*n) log (m*n)).
// - For each teleport iteration t in [0..k]: O(m*n) to propagate group mins + DP relaxations.
// - Total: O((m*n) log (m*n) + k * m * n); Space: O(m*n).
// =============================================================================

function minCost(grid: number[][], k: number): number {
    const m = grid.length;
    const n = m > 0 ? grid[0].length : 0;

    if (m === 0 || n === 0) return 0;

    // Flatten cells and sort by value to identify equal-value groups.
    const cells: [number, number][] = [];
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            cells.push([r, c]);
        }
    }
    cells.sort((a, b) => grid[a[0]][a[1]] - grid[b[0]][b[1]]);

    // Costs matrix initialized to INF.
    const INF = Number.MAX_SAFE_INTEGER;
    const costs: number[][] = Array.from({ length: m }, () => Array(n).fill(INF));

    // Perform k+1 passes: each pass allows one more level of teleportation
    // by propagating the minimal cost across equal-value groups, then relax via DP.
    for (let t = 0; t <= k; t++) {
        let groupMin = INF;
        for (let i = 0, groupStart = 0; i < cells.length; i++) {
            const [r, c] = cells[i];
            groupMin = Math.min(groupMin, costs[r][c]);

            const isGroupEnd =
                i + 1 === cells.length ||
                grid[r][c] !== grid[cells[i + 1][0]][cells[i + 1][1]];

            if (!isGroupEnd) continue;

            // Propagate the minimum cost to all cells in this equal-value group.
            for (let idx = groupStart; idx <= i; idx++) {
                const [gr, gc] = cells[idx];
                costs[gr][gc] = groupMin;
            }
            groupStart = i + 1;
        }

        // Backward DP relaxation: from bottom-right toward top-left.
        for (let r = m - 1; r >= 0; r--) {
            for (let c = n - 1; c >= 0; c--) {
                if (r === m - 1 && c === n - 1) {
                    costs[r][c] = 0; // Destination has zero additional cost.
                    continue;
                }
                if (r + 1 < m) {
                    costs[r][c] = Math.min(costs[r][c], costs[r + 1][c] + grid[r + 1][c]);
                }
                if (c + 1 < n) {
                    costs[r][c] = Math.min(costs[r][c], costs[r][c + 1] + grid[r][c + 1]);
                }
            }
        }
    }
    return costs[0][0];
}

const exampleGrid = [
  [1, 3, 3],
  [2, 3, 1],
  [3, 1, 1],
];
const exampleK = 2;
console.log("Minimum cost:", minCost(exampleGrid, exampleK)); // Expected output: 4
