// IOCE
// Input: fruits = [[1,2,3,4],[5,6,8,7],[9,10,11,12],[13,14,15,16]]
// Output: 100

function maxFruitsCollected(fruits: number[][]): number {
    const n = fruits.length;

    // Directions for each child: [rowDelta, colDelta]
    // Child 1: from (0,0): (i+1,j+1), (i+1,j), (i,j+1)
    const moves1 = [
        [1, 1],   // diag down-right
        [1, 0],   // down
        [0, 1],   // right
    ];
    // Child 2: from (0,n-1): (i+1,j-1), (i+1,j), (i+1,j+1)
    const moves2 = [
        [1, -1],  // diag down-left
        [1, 0],   // down
        [1, 1],   // diag down-right
    ];
    // Child 3: from (n-1,0): (i-1,j+1), (i, j+1), (i+1, j+1)
    const moves3 = [
        [-1, 1],   // diag up-right
        [0, 1],    // right
        [1, 1],    // diag down-right
    ];

    // Memoization cache
    const memo = new Map<string, number>();

    /**
     * DP function:
     * @param step Current step (0-based)
     * @param p1 [r1, c1] of child1
     * @param p2 [r2, c2] of child2
     * @param p3 [r3, c3] of child3
     * @returns maximum fruits collectable from this state
     */
    function dp(
        step: number,
        r1: number, c1: number,
        r2: number, c2: number,
        r3: number, c3: number
    ): number {
        // If any child is out of bounds, this path is invalid
        if (
            r1 < 0 || r1 >= n || c1 < 0 || c1 >= n ||
            r2 < 0 || r2 >= n || c2 < 0 || c2 >= n ||
            r3 < 0 || r3 >= n || c3 < 0 || c3 >= n
        ) return -Infinity;

        // Base case: if step == n-1, all must be at (n-1, n-1)
        if (step === n-1) {
            if (
                r1 === n-1 && c1 === n-1 &&
                r2 === n-1 && c2 === n-1 &&
                r3 === n-1 && c3 === n-1
            ) {
                // Only collect fruits in final cell once
                return fruits[n-1][n-1];
            } else {
                return -Infinity;
            }
        }

        // Memoize state: order positions to avoid duplicates;
        // However, order matters (they are distinct kids), so we do not sort.
        const key = `${step},${r1},${c1},${r2},${c2},${r3},${c3}`;
        if (memo.has(key)) return memo.get(key)!;

        // Fruits collected in this step:
        // If multiple kids at same cell, only count once.
        let fruitsHere = 0;
        const seen = new Set<string>();
        // For each kid, add cell if not already visited this step
        const pos = [[r1, c1], [r2, c2], [r3, c3]];
        for (let k = 0; k < 3; ++k) {
            const [x, y] = pos[k];
            const str = `${x},${y}`;
            if (!seen.has(str)) {
                fruitsHere += fruits[x][y];
                seen.add(str);
            }
        }

        let maxNext = -Infinity;
        // Iterate all possible next moves for all 3 kids
        for (const [dr1, dc1] of moves1) {
            const nr1 = r1 + dr1, nc1 = c1 + dc1;
            for (const [dr2, dc2] of moves2) {
                const nr2 = r2 + dr2, nc2 = c2 + dc2;
                for (const [dr3, dc3] of moves3) {
                    const nr3 = r3 + dr3, nc3 = c3 + dc3;
                    const next = dp(step + 1, nr1, nc1, nr2, nc2, nr3, nc3);
                    if (next > maxNext) maxNext = next;
                }
            }
        }

        const total = fruitsHere + maxNext;
        memo.set(key, total);
        return total;
    }

    // Start states:
    // Child1: (0, 0)
    // Child2: (0, n-1)
    // Child3: (n-1, 0)

    return dp(0, 0, 0, 0, n-1, n-1, 0);
}

// ------- Example 1 -------
const fruits1 = [
    [1,2,3,4],
    [5,6,8,7],
    [9,10,11,12],
    [13,14,15,16]
];
console.log(maxFruitsCollected(fruits1)); // Output: 100

// ------- Example 2 -------
const fruits2 = [
    [1,1],
    [1,1]
];
console.log(maxFruitsCollected(fruits2)); // Output: 4

/*

EXPLANATION:

- The function explores all possible paths recursively that the three kids can walk to reach the destination.
- At each step, it tries all 3 moves for each child (in total 3*3*3=27 combinations per step).
- It keeps a memoization cache to avoid recomputation of already seen position triples.
- It takes care to count fruits in a cell only once per step, even if more than one kid is on the same cell.
- The process continues until all reach the bottom-right cell at step n-1.

This DP will work for n up to 10 for sure and likely up to n=20, but for n>=100, it may TLE.

*/