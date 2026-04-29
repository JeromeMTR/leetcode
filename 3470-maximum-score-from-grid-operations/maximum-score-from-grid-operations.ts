/**
 * IOCE
 *
 * Input:
 * - grid: n x n matrix where grid[r][c] is the value at row r, column c.
 *
 * Output:
 * - Maximum score after any number of column paint operations.
 *
 * Constraints:
 * - 1 <= n <= 100
 * - grid.length == grid[i].length == n
 * - 0 <= grid[i][j] <= 1e9
 *
 * Edge cases:
 * - n = 1 => no horizontal neighbor exists, score is 0.
 * - all zeros => score is 0.
 * - choosing no operations is allowed.
 *
 * @param {number[][]} grid - n x n matrix of cell values.
 * @returns {number} Maximum achievable score.
 */

function create2D(rows: number, cols: number, initial = 0): number[][] {
    return Array.from({ length: rows }, () => new Array<number>(cols).fill(initial));
}

function create3D(depth: number, rows: number, cols: number, initial = 0): number[][][] {
    return Array.from({ length: depth }, () => create2D(rows, cols, initial));
}

function maximumScore(grid: number[][]): number {
    const n = grid.length;
    if (n === 1) {
        return 0;
    }

    const dp = create3D(n, n + 1, n + 1);
    const prevMax = create2D(n + 1, n + 1);
    const prevSuffixMax = create2D(n + 1, n + 1);
    const colPrefixSum = create2D(n, n + 1);

    for (let col = 0; col < n; col++) {
        for (let row = 1; row <= n; row++) {
            colPrefixSum[col][row] = colPrefixSum[col][row - 1] + grid[row - 1][col];
        }
    }

    for (let col = 1; col < n; col++) {
        for (let currH = 0; currH <= n; currH++) {
            for (let prevH = 0; prevH <= n; prevH++) {
                if (currH <= prevH) {
                    const extraScore = colPrefixSum[col][prevH] - colPrefixSum[col][currH];
                    dp[col][currH][prevH] = Math.max(
                        dp[col][currH][prevH],
                        prevSuffixMax[prevH][0] + extraScore,
                    );
                    continue;
                }

                const extraScore = colPrefixSum[col - 1][currH] - colPrefixSum[col - 1][prevH];
                dp[col][currH][prevH] = Math.max(
                    dp[col][currH][prevH],
                    prevSuffixMax[prevH][currH],
                    prevMax[prevH][currH] + extraScore,
                );
            }
        }

        for (let currH = 0; currH <= n; currH++) {
            prevMax[currH][0] = dp[col][currH][0];
            for (let prevH = 1; prevH <= n; prevH++) {
                const penalty = prevH > currH ? colPrefixSum[col][prevH] - colPrefixSum[col][currH] : 0;
                prevMax[currH][prevH] = Math.max(
                    prevMax[currH][prevH - 1],
                    dp[col][currH][prevH] - penalty,
                );
            }

            prevSuffixMax[currH][n] = dp[col][currH][n];
            for (let prevH = n - 1; prevH >= 0; prevH--) {
                prevSuffixMax[currH][prevH] = Math.max(
                    prevSuffixMax[currH][prevH + 1],
                    dp[col][currH][prevH],
                );
            }
        }
    }

    let answer = 0;
    for (let h = 0; h <= n; h++) {
        answer = Math.max(answer, dp[n - 1][n][h], dp[n - 1][0][h]);
    }

    return answer;
}

// ----------------------
// Console log tests
// ----------------------

console.log(maximumScore([[0, 0, 0, 0, 0],[0, 0, 3, 0, 0],[0, 1, 0, 0, 0],[5, 0, 0, 3, 0],[0, 0, 0, 0, 2]]), "expected:", 11);
console.log(maximumScore([[0, 0, 0],[0, 0, 0],[0, 0, 0]]), "expected:", 0);
console.log(maximumScore([[0, 0],[0, 0]]), "expected:", 0);
console.log(maximumScore([[1, 1],[1, 1]]), "expected:", 0);
console.log(maximumScore([[0, 1],[0, 1]]), "expected:", 2);
console.log(maximumScore([[0, 1],[1, 1]]), "expected:", 1);
