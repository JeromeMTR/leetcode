function maxDistance(side: number, points: number[][], k: number): number {
    const L = 4 * side;

    function perimeterPos(x: number, y: number): number {
        if (x === 0) return y;                  // left side: (0,0) -> (0,side)
        if (y === side) return side + x;        // top side: (0,side) -> (side,side)
        if (x === side) return 3 * side - y;    // right side: (side,side) -> (side,0)
        return 4 * side - x;                    // bottom side: (side,0) -> (0,0)
    }

    const arr = points.map(([x, y]) => perimeterPos(x, y)).sort((a, b) => a - b);
    const n = arr.length;
    const arr2 = new Array<number>(2 * n);
    for (let i = 0; i < n; i++) {
        arr2[i] = arr[i];
        arr2[i + n] = arr[i] + L;
    }

    function can(D: number): boolean {
        const next = new Array<number>(2 * n).fill(2 * n);

        // Two pointers: earliest next point whose perimeter gap is at least D
        let j = 0;
        for (let i = 0; i < 2 * n; i++) {
            if (j < i + 1) j = i + 1;
            while (j < 2 * n && arr2[j] - arr2[i] < D) j++;
            next[i] = j;
        }

        // Binary lifting over "next"
        const LOG = 6; // enough since k <= 25, 2^5 = 32
        const up: number[][] = Array.from({ length: LOG }, () => new Array<number>(2 * n + 1).fill(2 * n));
        for (let i = 0; i < 2 * n; i++) up[0][i] = next[i];
        up[0][2 * n] = 2 * n;

        for (let p = 1; p < LOG; p++) {
            for (let i = 0; i <= 2 * n; i++) {
                up[p][i] = up[p - 1][up[p - 1][i]];
            }
        }

        // Try every original point as the first selected point
        for (let start = 0; start < n; start++) {
            let cur = start;
            let need = k - 1; // remaining selections after the first point
            let bit = 0;

            while (need > 0 && cur < 2 * n) {
                if (need & 1) cur = up[bit][cur];
                need >>= 1;
                bit++;
            }

            // cur is the index of the k-th chosen point
            if (cur >= start + n || cur >= 2 * n) continue;

            // Need wrap-around gap from last back to first to be at least D
            // i.e. perimeter span from first to last <= L - D
            if (arr2[cur] - arr2[start] <= L - D) {
                return true;
            }
        }

        return false;
    }

    let lo = 0, hi = 2 * side;
    while (lo < hi) {
        const mid = Math.floor((lo + hi + 1) / 2);
        if (can(mid)) lo = mid;
        else hi = mid - 1;
    }

    return lo;
}

// Console log tests
console.log(maxDistance(2, [[0,2],[2,0],[2,2],[0,0]], 4)); // 2
console.log(maxDistance(2, [[0,0],[1,2],[2,0],[2,2],[2,1]], 4)); // 1
console.log(maxDistance(2, [[0,0],[0,1],[0,2],[1,2],[2,0],[2,2],[2,1]], 5)); // 1
console.log(maxDistance(10, [[0,0],[0,10],[10,0],[10,10]], 4)); // 10
console.log(maxDistance(3, [[0,0],[0,1],[0,2],[0,3],[1,3],[2,3],[3,3],[3,2],[3,1],[3,0]], 4));
console.log(maxDistance(5, [[0,0],[0,5],[5,0],[5,5],[0,2],[2,5],[5,3],[3,0]], 5));