/*
IOCE

Inputs:
- robots: number[]       -> positions of robots
- distance: number[]     -> maximum shooting distance for each robot
- walls: number[]        -> positions of walls

Output:
- number -> maximum number of unique walls that can be destroyed

Constraints:
- 1 <= robots.length == distance.length <= 1e5
- 1 <= walls.length <= 1e5
- 1 <= robots[i], walls[j] <= 1e9
- 1 <= distance[i] <= 1e5
- robot positions are unique
- wall positions are unique

Edge Cases:
- One robot only
- No wall reachable by any robot
- Wall at same position as a robot
- Right shot blocked immediately by next robot
- Left shot blocked immediately by previous robot
- Large distances but blocked by nearby robots
- Overlap only between adjacent previous-right and current-left
*/

function maxWallsDestroyed(
    robots: number[],
    distance: number[],
    walls: number[]
): number {
    const n = robots.length;
    const m = walls.length;

    // Pair and sort robots by position
    const arr: [number, number][] = [];
    for (let i = 0; i < n; i++) arr.push([robots[i], distance[i]]);
    arr.sort((a, b) => a[0] - b[0]);

    const sortedWalls = [...walls].sort((a, b) => a - b);

    // lowerBound: first index >= target
    function lowerBound(a: number[], target: number): number {
        let l = 0, r = a.length;
        while (l < r) {
            const mid = (l + r) >> 1;
            if (a[mid] >= target) r = mid;
            else l = mid + 1;
        }
        return l;
    }

    // upperBound: first index > target
    function upperBound(a: number[], target: number): number {
        let l = 0, r = a.length;
        while (l < r) {
            const mid = (l + r) >> 1;
            if (a[mid] > target) r = mid;
            else l = mid + 1;
        }
        return l;
    }

    // Count walls in [L, R]
    function countWallsInRange(L: number, R: number): number {
        if (L > R) return 0;
        return upperBound(sortedWalls, R) - lowerBound(sortedWalls, L);
    }

    // Save left/right intervals as actual coordinate ranges
    const leftL = new Array<number>(n);
    const leftR = new Array<number>(n);
    const rightL = new Array<number>(n);
    const rightR = new Array<number>(n);
    const leftCnt = new Array<number>(n).fill(0);
    const rightCnt = new Array<number>(n).fill(0);
    const overlapPrev = new Array<number>(n).fill(0);

    for (let i = 0; i < n; i++) {
        const pos = arr[i][0];
        const dist = arr[i][1];

        const prevRobot = i > 0 ? arr[i - 1][0] : -Infinity;
        const nextRobot = i + 1 < n ? arr[i + 1][0] : Infinity;

        // Left shot range:
        // bullet can travel down to pos - dist, but if it hits prevRobot first, it stops there.
        // So walls strictly beyond prevRobot are reachable, and wall at pos itself is reachable.
        let l1 = Math.max(pos - dist, prevRobot + 1);
        let r1 = pos;

        // Right shot range:
        // bullet can travel up to pos + dist, but if it hits nextRobot first, it stops there.
        // So only walls strictly before nextRobot are reachable, and wall at pos itself is reachable.
        let l2 = pos;
        let r2 = Math.min(pos + dist, nextRobot - 1);

        leftL[i] = l1;
        leftR[i] = r1;
        rightL[i] = l2;
        rightR[i] = r2;

        leftCnt[i] = countWallsInRange(l1, r1);
        rightCnt[i] = countWallsInRange(l2, r2);

        if (i > 0) {
            const ol = Math.max(leftL[i], rightL[i - 1]);
            const orr = Math.min(leftR[i], rightR[i - 1]);
            overlapPrev[i] = countWallsInRange(ol, orr);
        }
    }

    // DP initialization
    let dp0 = 0;               // previous robot does not shoot right
    let dp1 = Number.NEGATIVE_INFINITY; // previous robot shoots right

    for (let i = 0; i < n; i++) {
        // current robot does not shoot right:
        // - skip robot
        // - shoot left
        let ndp0 = Math.max(
            dp0,                                // skip
            dp0 + leftCnt[i],                   // left after previous not-right
            dp1 + leftCnt[i] - overlapPrev[i]   // left after previous right, subtract duplicated walls
        );

        // current robot shoots right
        let ndp1 = Math.max(
            dp0 + rightCnt[i],
            dp1 + rightCnt[i]
        );

        dp0 = ndp0;
        dp1 = ndp1;
    }

    return Math.max(dp0, dp1);
}


// -------------------- Tests --------------------

console.log(maxWallsDestroyed([4], [3], [1, 10])); // 1
console.log(maxWallsDestroyed([10, 2], [5, 1], [5, 2, 7])); // 3
console.log(maxWallsDestroyed([1, 2], [100, 1], [10])); // 0

// Additional tests
console.log(maxWallsDestroyed([5], [10], [5, 6, 7, 1])); // 4
console.log(maxWallsDestroyed([3, 8], [10, 10], [1, 2, 3, 4, 8, 9, 10])); // likely 7
console.log(maxWallsDestroyed([5, 6], [10, 10], [4, 5, 6, 7])); // 4
console.log(maxWallsDestroyed([10, 20, 30], [15, 15, 15], [5, 10, 15, 20, 25, 30, 35]));
