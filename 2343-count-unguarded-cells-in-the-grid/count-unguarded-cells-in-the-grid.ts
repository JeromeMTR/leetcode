/**
 * Find the number of unguarded unoccupied cells in a grid.
 *
 * @param m number of rows
 * @param n number of columns
 * @param guards positions of guards [row, col]
 * @param walls positions of walls [row, col]
 * @returns number of unguarded, unoccupied cells
 */
function countUnguarded(m: number, n: number, guards: number[][], walls: number[][]): number {
    // Helper to encode (r, c) as a unique string key
    function posKey(r: number, c: number): string {
        return `${r},${c}`;
    }

    // Sets to store walls and guards for O(1) lookup
    const wallSet = new Set<string>();
    for (const [r, c] of walls) wallSet.add(posKey(r, c));

    const guardSet = new Set<string>();
    for (const [r, c] of guards) guardSet.add(posKey(r, c));

    // Set to store guarded cells (excluding walls and guards)
    const guardedSet = new Set<string>();

    // Four directions: [dr, dc]
    const dirs = [
        [0, 1],   // east
        [0, -1],  // west
        [1, 0],   // south
        [-1, 0],  // north
    ];

    // For each guard, shoot rays in 4 directions
    for (const [gr, gc] of guards) {
        for (const [dr, dc] of dirs) {
            let nr = gr + dr;
            let nc = gc + dc;
            // Continue as long as we are in range,
            // and hit neither a wall nor another guard
            while (
                nr >= 0 && nr < m &&
                nc >= 0 && nc < n &&
                !wallSet.has(posKey(nr, nc)) &&
                !guardSet.has(posKey(nr, nc))
            ) {
                guardedSet.add(posKey(nr, nc));
                nr += dr;
                nc += dc;
            }
        }
    }

    // Count unguarded, unoccupied cells
    let unguarded = 0;
    for (let r = 0; r < m; ++r) {
        for (let c = 0; c < n; ++c) {
            const key = posKey(r, c);
            // if NOT guard, NOT wall, and NOT guarded
            if (!guardSet.has(key) && !wallSet.has(key) && !guardedSet.has(key)) {
                ++unguarded;
            }
        }
    }
    return unguarded;
}

// ========== Sample Usage / IOCE TEST ==========

const example1 = countUnguarded(
    4, 6,
    [[0,0],[1,1],[2,3]],
    [[0,1],[2,2],[1,4]]
); // Expected: 7

const example2 = countUnguarded(
    3, 3,
    [[1,1]],
    [[0,1],[1,0],[2,1],[1,2]]
); // Expected: 4

console.log(example1); // 7
console.log(example2); // 4

/*
IOCE EXAMPLES:

Input:
m = 4, n = 6
guards = [[0,0],[1,1],[2,3]]
walls = [[0,1],[2,2],[1,4]]
Output: 7

Input:
m = 3, n = 3
guards = [[1,1]]
walls = [[0,1],[1,0],[2,1],[1,2]]
Output: 4
*/