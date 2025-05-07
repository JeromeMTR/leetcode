function minTimeToReachEnd(moveTime: number[][]): number {
    const n = moveTime.length;
    const m = moveTime[0].length;
    
    const directions = [
        [1, 0],  // down
        [0, 1],  // right
        [-1, 0], // up
        [0, -1]  // left
    ];
    
    // Queue for BFS, initialized with starting point (0, 0) and time 0
    const queue: Array<[number, number, number]> = [];
    queue.push([0, 0, 0]);
    
    // Matrix to keep track of the minimum time to reach each cell
    const minTime = Array.from({ length: n }, () => Array.from({ length: m }, () => Infinity));
    minTime[0][0] = 0;
    
    while (queue.length > 0) {
        const [x, y, currTime] = queue.shift()!;
        
        // Check all four possible directions
        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;
            
            // Check that the new position is within bounds
            if (newX >= 0 && newX < n && newY >= 0 && newY < m) {
                // The earliest time we can move to this position
                const waitTime = Math.max(currTime + 1, moveTime[newX][newY]);

                // If the new waitTime is less than the previously recorded time, update it and enqueue
                if (waitTime < minTime[newX][newY]) {
                    minTime[newX][newY] = waitTime;
                    queue.push([newX, newY, waitTime]);
                }
            }
        }
    }
    
    return minTime[n-1][m-1];
}

// IOCE
const moveTime1 = [
    [0, 4],
    [4, 4]
];
console.log(minTimeToReachEnd(moveTime1)); // Expected output: 6

const moveTime2 = [
    [0, 0, 0],
    [0, 0, 0]
];
console.log(minTimeToReachEnd(moveTime2)); // Expected output: 3

const moveTime3 = [
    [0, 1],
    [1, 2]
];
console.log(minTimeToReachEnd(moveTime3)); // Expected output: 3