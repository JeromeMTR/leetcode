/*
IOCE
- Input: `points` — array of integer coordinates: number[][] where each `points[i]` is `[x, y]`.
- Output: number — minimum time to visit all points in order using 8-direction moves; time between two points is `max(|dx|, |dy|)`.
- Constraints: `1 <= points.length <= 10^4`, `points[i].length = 2`, and `-10^7 <= points[i][j] <= 10^7`.
- Edge Cases: single point → 0; consecutive duplicate points add 0; negative coordinates; large deltas; empty moves (dx=dy=0).
- Complexity: Time O(n), Space O(1).
- Approach: Sum `max(Math.abs(x2 - x1), Math.abs(y2 - y1))` for each consecutive pair.
*/

function minTimeToVisitAllPoints(points: number[][]): number {
    let totalTime = 0;

    for (let i = 1; i < points.length; i++) {
        const [x1, y1] = points[i - 1];
        const [x2, y2] = points[i];

        const dx = Math.abs(x2 - x1);
        const dy = Math.abs(y2 - y1);

        totalTime += Math.max(dx, dy);
    }

    return totalTime;
}

// Test cases to verify the solution
console.log(minTimeToVisitAllPoints([[1, 1], [3, 4], [-1, 0]])); // Expected output: 7
console.log(minTimeToVisitAllPoints([[3, 2], [-2, 2]]));        // Expected output: 5

// Additional test cases for authentication:
console.log(minTimeToVisitAllPoints([[3, 1], [2, 1]]));           // Expected output: 1
console.log(minTimeToVisitAllPoints([[1, 2], [1, 2], [1, 2]]));   // Expected output: 0
console.log(minTimeToVisitAllPoints([[1, 1], [3, 3], [3, 4], [4, 4], [5, 5]])); // Expected output: 4