// IOCE: Input Output Constraints Example provided below
function longestVSegment(grid: number[][]): number {
    const n = grid.length;
    const m = grid[0].length;

    // 4 diagonal directions and their clockwise turns
    // dirIdx: 0 (↘), 1 (↙), 2 (↖), 3 (↗)
    const dirs: [number, number][] = [
        [1, 1],   // ↘
        [1, -1],  // ↙
        [-1, -1], // ↖
        [-1, 1],  // ↗
    ];
    // For each of the above, the clockwise turn:
    // ↘ => ↙, ↙ => ↖, ↖ => ↗, ↗ => ↘
    const cwTurn = [1, 2, 3, 0];

    // The sequence to be matched is 1,2,0,2,0,2...
    // So, seq[0] = 1, seq[1] = 2, seq[2] = 0, seq[3] = 2, seq[4] = 0,...
    function expectedValueAt(step: number): number {
        if (step === 0) return 1;
        return step % 2 === 1 ? 2 : 0;
    }

    // Memoization to avoid redundant work
    // Let’s memoize: dp[x][y][dir][turned][stepMod4] = length
    // stepMod4 is enough because after the first 1, the sequence becomes [2,0,2,0,...]
    type DPEntry = { [key: string]: number };
    const dp: DPEntry = {};

    // Recursive DP
    function dfs(
        x: number,
        y: number,
        dir: number,        // current direction index 0-3
        turned: boolean,    // has made clockwise turn
        step: number        // which element of sequence are we on (0:1, 1:2, 2:0, 3:2, 4:0, ..)
    ): number {
        // Memoization key: x,y,dir,turned,step%4
        const key = `${x},${y},${dir},${turned ? 1 : 0},${step % 4}`;
        if (key in dp) return dp[key];

        // Out of bounds
        if (x < 0 || y < 0 || x >= n || y >= m) {
            dp[key] = 0;
            return 0;
        }
        // Must match sequence
        if (grid[x][y] !== expectedValueAt(step)) {
            dp[key] = 0;
            return 0;
        }

        // Extend in this direction
        let maxLen = 1;

        // Try to go forward in current direction
        const [dx, dy] = dirs[dir];
        const nextX = x + dx;
        const nextY = y + dy;
        const len1 = dfs(nextX, nextY, dir, turned, step + 1);
        if (len1 > 0) maxLen = Math.max(maxLen, 1 + len1);

        // Try to turn (if not turned yet)
        if (!turned) {
            const nextDir = cwTurn[dir];
            const [tdx, tdy] = dirs[nextDir];
            const tx = x + tdx;
            const ty = y + tdy;
            const len2 = dfs(tx, ty, nextDir, true, step + 1);
            if (len2 > 0) maxLen = Math.max(maxLen, 1 + len2);
        }

        dp[key] = maxLen;
        return maxLen;
    }

    let result = 0;
    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < m; ++j) {
            if (grid[i][j] === 1) {
                for (let dir = 0; dir < 4; ++dir) {
                    result = Math.max(result, dfs(i, j, dir, false, 0));
                }
            }
        }
    }
    return result;
}

// IOCE: INPUT / OUTPUT / CONSTRAINTS / EXAMPLE

// Example 1
console.log(
  longestVSegment([
    [2,2,1,2,2],
    [2,0,2,2,0],
    [2,0,1,1,0],
    [1,0,2,2,2],
    [2,0,0,2,2]
  ])
); // => 5

// Example 2
console.log(
  longestVSegment([
    [2,2,2,2,2],
    [2,0,2,2,0],
    [2,0,1,1,0],
    [1,0,2,2,2],
    [2,0,0,2,2]
  ])
); // => 4

// Example 3
console.log(
  longestVSegment([
    [1,2,2,2,2],
    [2,2,2,2,0],
    [2,0,0,0,0],
    [0,0,2,2,2],
    [2,0,0,2,0]
  ])
); // => 5

// Example 4
console.log(longestVSegment([[1]])); // => 1

// Example 5 (no valid segment)
console.log(longestVSegment([[0,2],[2,0]])); // => 0