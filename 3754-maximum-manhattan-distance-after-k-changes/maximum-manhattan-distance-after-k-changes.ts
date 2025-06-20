/**
 * IOCE:
 * Input:  s: string, k: number
 * Output: number (max manhattan distance from origin at any time)
 *
 * Example:
 *   Input: s = "NWSE", k = 1
 *   Output: 3
 */

function maxManhattanDistance(s: string, k: number): number {
    // counts of moves so far up to position i
    let N = 0, S = 0, E = 0, W = 0;
    let maxDist = 0;

    for (let i = 0; i < s.length; ++i) {
        // Update move counts
        const ch = s[i];
        if (ch === 'N') N++;
        else if (ch === 'S') S++;
        else if (ch === 'E') E++;
        else if (ch === 'W') W++;

        // Case 1: maximize positive x and y (move to E, N)
        let k1 = k;
        let dx1 = Math.min(W, k1);
        k1 -= dx1;
        let dy1 = Math.min(S, k1);

        let x1 = (E - W) + 2 * dx1;
        let y1 = (N - S) + 2 * dy1;
        let dist1 = Math.abs(x1) + Math.abs(y1);

        // Case 2: maximize negative x and y (move to W, S)
        let k2 = k;
        let dx2 = Math.min(E, k2);
        k2 -= dx2;
        let dy2 = Math.min(N, k2);

        let x2 = (E - W) - 2 * dx2;
        let y2 = (N - S) - 2 * dy2;
        let dist2 = Math.abs(x2) + Math.abs(y2);

        // Update maxManhattanDistance so far
        maxDist = Math.max(maxDist, dist1, dist2);

        // If other combinations are possible (positive x, negative y, etc), 
        // due to triangle inequality, any max will be at one of the axes extremal.
        // So only two main cases needed as above.
    }

    return maxDist;
}

/* Example tests */
console.log(maxManhattanDistance("NWSE", 1)); // 3
console.log(maxManhattanDistance("NSWWEW", 3)); // 6
console.log(maxManhattanDistance("N", 0)); // 1
console.log(maxManhattanDistance("NNNSSS", 3)); // 6
console.log(maxManhattanDistance("EWSN", 2)); // 2