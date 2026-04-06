/*
IOCE

Inputs:
- commands: number[]
  - commands[i] can be:
    - -2 => turn left 90 degrees
    - -1 => turn right 90 degrees
    - 1..9 => move forward that many units
- obstacles: number[][]
  - obstacles[i] = [x, y], meaning that grid cell is blocked

Output:
- number
  - the maximum squared Euclidean distance from the origin (0, 0)
  - i.e. max(x^2 + y^2) reached at any time during the robot's path

Constraints:
- 1 <= commands.length <= 1e4
- commands[i] is -2, -1, or in [1, 9]
- 0 <= obstacles.length <= 1e4
- -3 * 1e4 <= xi, yi <= 3 * 1e4
- Answer < 2^31

Edge Cases:
- No obstacles
- Obstacle immediately in front of the robot
- Obstacle at (0, 0)
  - allowed by problem statement
  - robot ignores it at start, but cannot step back onto origin later
- Multiple turns in a row
- Commands with only turns
- Robot never moves
- Robot gets blocked partway through a movement command
*/

function robotSim(commands: number[], obstacles: number[][]): number {
    // Store obstacles as strings like "x,y" for O(1) lookup in a Set
    const obstacleSet = new Set<string>();
    for (const [ox, oy] of obstacles) {
        obstacleSet.add(`${ox},${oy}`);
    }

    // Directions in clockwise order:
    // 0 = North, 1 = East, 2 = South, 3 = West
    const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0];

    let dir = 0; // start facing north
    let x = 0;
    let y = 0;
    let maxDist = 0;

    for (const command of commands) {
        if (command === -2) {
            // Turn left: counter-clockwise
            dir = (dir + 3) % 4;
        } else if (command === -1) {
            // Turn right: clockwise
            dir = (dir + 1) % 4;
        } else {
            // Move forward one step at a time
            for (let step = 0; step < command; step++) {
                const nextX = x + dx[dir];
                const nextY = y + dy[dir];

                // If next cell is an obstacle, stop this movement command
                if (obstacleSet.has(`${nextX},${nextY}`)) {
                    break;
                }

                // Otherwise move into the next cell
                x = nextX;
                y = nextY;

                // Update maximum squared distance from origin
                const dist = x * x + y * y;
                if (dist > maxDist) {
                    maxDist = dist;
                }
            }
        }
    }

    return maxDist;
}


// ----------------------
// Console log test cases
// ----------------------

console.log(robotSim([4, -1, 3], [])); // Expected: 25
console.log(robotSim([4, -1, 4, -2, 4], [[2, 4]])); // Expected: 65
console.log(robotSim([6, -1, -1, 6], [[0, 0]])); // Expected: 36

// Additional tests
console.log(robotSim([1, 2, 3], [])); // Expected: 36 -> (0,6)
console.log(robotSim([-2, -2, -2, -2], [])); // Expected: 0
console.log(robotSim([2], [[0, 1]])); // Expected: 0
console.log(robotSim([2, -1, 2, -1, 2, -1, 2], [])); // Expected: 8