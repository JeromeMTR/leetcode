/*
IOCE

Inputs:
- robot: number[]
  - robot[i] is the position of the i-th robot
- factory: number[][]
  - factory[j] = [positionj, limitj]
  - positionj is the factory position
  - limitj is the maximum number of robots that factory can repair

Output:
- number
  - minimum total distance traveled by all robots so every robot gets repaired

Constraints:
- 1 <= robot.length, factory.length <= 100
- factory[j].length == 2
- -1e9 <= robot[i], positionj <= 1e9
- 0 <= limitj <= robot.length
- It is guaranteed that all robots can be repaired

Edge Cases:
- A robot already stands on a factory position => distance 0
- Some factories may have limit 0
- Only one robot or one factory
- Negative positions
- All robots on one side of all factories
- Multiple robots assigned to the same factory up to its limit
*/

function minimumTotalDistance(robot: number[], factory: number[][]): number {
    robot.sort((a, b) => a - b);
    factory.sort((a, b) => a[0] - b[0]);

    const R = robot.length;
    const F = factory.length;
    const INF = Number.MAX_SAFE_INTEGER;

    // memo[i][j] = min cost to fix robots from i..R-1 using factories from j..F-1
    const memo: number[][] = Array.from({ length: R + 1 }, () =>
        Array(F + 1).fill(-1)
    );

    function dfs(i: number, j: number): number {
        // All robots are repaired
        if (i === R) return 0;

        // No factories left but robots remain => impossible
        if (j === F) return INF;

        if (memo[i][j] !== -1) return memo[i][j];

        let ans = dfs(i, j + 1); // Option 1: skip this factory entirely

        const [pos, limit] = factory[j];
        let cost = 0;

        // Option 2: assign k consecutive robots starting from i to this factory
        for (let k = 1; k <= limit && i + k - 1 < R; k++) {
            cost += Math.abs(robot[i + k - 1] - pos);
            const next = dfs(i + k, j + 1);
            if (next !== INF) {
                ans = Math.min(ans, cost + next);
            }
        }

        memo[i][j] = ans;
        return ans;
    }

    return dfs(0, 0);
}


// -------------------- Tests --------------------

console.log(
    minimumTotalDistance([0, 4, 6], [[2, 2], [6, 2]]),
    "expected:",
    4
);

console.log(
    minimumTotalDistance([1, -1], [[-2, 1], [2, 1]]),
    "expected:",
    2
);

console.log(
    minimumTotalDistance([3], [[3, 1]]),
    "expected:",
    0
);

console.log(
    minimumTotalDistance([1, 2, 3], [[2, 3]]),
    "expected:",
    2
);

console.log(
    minimumTotalDistance([-5, -2, 0, 7], [[-3, 2], [6, 2]]),
    "expected:",
    7
);