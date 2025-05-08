function minimumTimeToReachBottomRight(moveTime: number[][]): number {
    // Inputs validation
    if (moveTime.length < 2 || moveTime[0].length < 2) {
        throw new Error("Invalid input dimensions, must be at least 2x2.");
    }

    const directions = [
        [1, 0],  // Move down
        [0, 1],  // Move right
        [-1, 0], // Move up
        [0, -1]  // Move left
    ];

    const n = moveTime.length;
    const m = moveTime[0].length;

    // A matrix to track the earliest time to reach each cell
    const earliestTime = Array.from({ length: n }, () => Array(m).fill(Infinity));
    // BFS queue
    const queue: Array<[number, number, number]> = [[0, 0, 0]];

    // Initialize the starting cell
    earliestTime[0][0] = 0;

    while (queue.length > 0) {
        const [x, y, currentTime] = queue.shift()!;
        
        for (let di = 0; di < directions.length; di++) {
            const [dx, dy] = directions[di];
            const nx = x + dx;
            const ny = y + dy;

            // Check if the new position is within bounds
            if (nx >= 0 && nx < n && ny >= 0 && ny < m) {
                // Determine time to move
                const moveDuration = currentTime % 2 === 0 ? 1 : 2;
                const newTime = currentTime + moveDuration;

                // Check if we can move to the new position at the calculated new time
                if (newTime >= moveTime[nx][ny] && newTime < earliestTime[nx][ny]) {
                    earliestTime[nx][ny] = newTime;
                    queue.push([nx, ny, newTime]);
                }
            }
        }
    }

    // Return the minimum time required to reach the bottom-right corner
    return earliestTime[n - 1][m - 1];
}

// IOCE
// Inputs:
// 1. 2D matrix moveTime of size n x m
// Outputs:
// 1. Minimum time to reach the bottom-right corner (n - 1, m - 1) starting from (0, 0)
// Constraints:
// 1. 2 <= n, m <= 750
// 2. 0 <= moveTime[i][j] <= 10^9
// Edge Cases:
// 1. Move time is zero everywhere except potentially the destination
// 2. High move time requirements making some spots unreachable early on

// Example Usage
console.log(minimumTimeToReachBottomRight([[0, 4], [4, 4]])); // Expected Output: 7
console.log(minimumTimeToReachBottomRight([[0, 0, 0, 0], [0, 0, 0, 0]])); // Expected Output: 6
console.log(minimumTimeToReachBottomRight([[0, 1], [1, 2]])); // Expected Output: 4