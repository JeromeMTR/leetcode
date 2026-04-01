/*
IOCE

I - Inputs:
- positions: number[] -> unique positions of robots on a line
- healths: number[] -> health of each robot
- directions: string -> directions[i] is 'L' or 'R'

O - Output:
- number[] -> healths of surviving robots in the same original input order

C - Constraints:
- 1 <= n <= 1e5
- 1 <= positions[i], healths[i] <= 1e9
- positions are unique
- Time: O(n log n) because we sort by position
- Space: O(n) for robots array, stack, and survivors

E - Edge Cases:
- All robots move in same direction -> no collisions
- Two robots with equal health collide -> both removed
- One robot survives multiple consecutive collisions
- Positions are unsorted, so we must sort by position first
- No survivors -> return []
- Only one robot -> it survives

*/

function survivedRobotsHealths(
    positions: number[],
    healths: number[],
    directions: string
): number[] {
    type Robot = {
        pos: number;
        health: number;
        dir: string;
        idx: number;
        alive: boolean;
    };

    const n = positions.length;

    // Build robot list with original indices
    const robots: Robot[] = [];
    for (let i = 0; i < n; i++) {
        robots.push({
            pos: positions[i],
            health: healths[i],
            dir: directions[i],
            idx: i,
            alive: true
        });
    }

    // Sort by position so we process possible collisions in spatial order
    robots.sort((a, b) => a.pos - b.pos);

    // Stack stores indices in "robots" array of alive right-moving robots
    const stack: number[] = [];

    for (let i = 0; i < n; i++) {
        const current = robots[i];

        if (current.dir === 'R') {
            // Right-moving robot may collide with a future left-moving robot
            stack.push(i);
        } else {
            // Current robot moves left and may collide with previous right-movers
            while (stack.length > 0 && current.alive) {
                const rightIndex = stack[stack.length - 1];
                const rightRobot = robots[rightIndex];

                if (!rightRobot.alive) {
                    stack.pop();
                    continue;
                }

                if (rightRobot.health < current.health) {
                    // Right robot dies, left robot loses 1 health and may continue colliding
                    rightRobot.alive = false;
                    stack.pop();
                    current.health -= 1;
                } else if (rightRobot.health > current.health) {
                    // Left robot dies, right robot loses 1 health
                    current.alive = false;
                    rightRobot.health -= 1;
                } else {
                    // Equal health: both die
                    current.alive = false;
                    rightRobot.alive = false;
                    stack.pop();
                }
            }
        }
    }

    // Collect survivors in original input order
    const survivors: { idx: number; health: number }[] = [];
    for (const robot of robots) {
        if (robot.alive) {
            survivors.push({ idx: robot.idx, health: robot.health });
        }
    }

    survivors.sort((a, b) => a.idx - b.idx);

    return survivors.map(r => r.health);
}

// ----------------------
// Console log test cases
// ----------------------

console.log(
    survivedRobotsHealths([5, 4, 3, 2, 1], [2, 17, 9, 15, 10], "RRRRR"),
    "Expected:",
    [2, 17, 9, 15, 10]
);

console.log(
    survivedRobotsHealths([3, 5, 2, 6], [10, 10, 15, 12], "RLRL"),
    "Expected:",
    [14]
);

console.log(
    survivedRobotsHealths([1, 2, 5, 6], [10, 10, 11, 11], "RLRL"),
    "Expected:",
    []
);

// Single robot
console.log(
    survivedRobotsHealths([7], [5], "L"),
    "Expected:",
    [5]
);

// Equal health direct collision
console.log(
    survivedRobotsHealths([1, 3], [4, 4], "RL"),
    "Expected:",
    []
);

// One robot survives multiple collisions
console.log(
    survivedRobotsHealths([1, 2, 3, 4], [10, 1, 1, 1], "RLLL"),
    "Expected:",
    [7]
);

// No collision due to order/direction
console.log(
    survivedRobotsHealths([1, 2, 3], [3, 4, 5], "LLL"),
    "Expected:",
    [3, 4, 5]
);
