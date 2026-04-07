/**
 * IOCE for LeetCode 2069. Walking Robot Simulation II
 *
 * I (Input):
 * - Constructor: Robot(width: number, height: number)
 *   - width: the width of the grid (x-axis from 0 to width-1)
 *   - height: the height of the grid (y-axis from 0 to height-1)
 * - step(num: number): moves the robot forward 'num' steps along the perimeter.
 * - getPos(): returns current position as [x, y]
 * - getDir(): returns current direction as a string.
 *
 * O (Output):
 * - step: void
 * - getPos: number[] (array of two integers [x, y])
 * - getDir: string (one of "North", "East", "South", "West")
 *
 * C (Constraints):
 * - 2 <= width, height <= 100
 * - 1 <= num <= 10^5 (for each step call, but total steps across calls <= 10^5? Actually, problem says: "At most 10^4 calls in total will be made to step, getPos, and getDir." and "1 <= num <= 10^5" per step call)
 * - The robot moves only on the perimeter of the grid.
 * - The perimeter length = 2 * (width + height) - 4 (because corners are shared).
 *
 * E (Edge Cases):
 * Example 1:
 *   Input:
 *     ["Robot", "step", "getPos", "getDir", "step", "getPos", "getDir"]
 *     [[6, 3], [2], [], [], [2], [], []]
 *   Output:
 *     [null, null, [2,0], "East", null, [4,0], "East"]
 *
 * Example 2 (Edge case: starting point after full loop):
 *   After moving exactly the perimeter length steps from start, the robot returns to (0,0) but direction becomes "South".
 *
 * Edge Cases to consider:
 * - When the robot is at a corner, the next step changes direction.
 * - Large number of steps: use modulo perimeter to avoid simulating step-by-step.
 * - Initial state: at (0,0) facing "East", but after any movement that brings it back to (0,0) (and not the initial state), it faces "South".
 * - The perimeter has 4 sides. The movement is cyclic.
 */

class Robot {
    private moved: boolean = false;
    private idx: number = 0;
    private pos: number[][] = [];
    private dir: number[] = [];
    private toDir: Map<number, string> = new Map();

    constructor(width: number, height: number) {
        this.toDir.set(0, "East");
        this.toDir.set(1, "North");
        this.toDir.set(2, "West");
        this.toDir.set(3, "South");

        for (let i = 0; i < width; ++i) {
            this.pos.push([i, 0]);
            this.dir.push(0);
        }
        for (let i = 1; i < height; ++i) {
            this.pos.push([width - 1, i]);
            this.dir.push(1);
        }
        for (let i = width - 2; i >= 0; --i) {
            this.pos.push([i, height - 1]);
            this.dir.push(2);
        }
        for (let i = height - 2; i > 0; --i) {
            this.pos.push([0, i]);
            this.dir.push(3);
        }
        this.dir[0] = 3;
    }

    step(num: number): void {
        this.moved = true;
        this.idx = (this.idx + num) % this.pos.length;
    }

    getPos(): number[] {
        return this.pos[this.idx];
    }

    getDir(): string {
        if (!this.moved) {
            return "East";
        }
        return this.toDir.get(this.dir[this.idx])!;
    }
}

const robot1 = new Robot(6, 3);
robot1.step(2);
console.log("Test 1 Pos:", robot1.getPos(), "Expected:", [2, 0]);
console.log("Test 1 Dir:", robot1.getDir(), "Expected:", "East");
robot1.step(2);
console.log("Test 2 Pos:", robot1.getPos(), "Expected:", [4, 0]);
console.log("Test 2 Dir:", robot1.getDir(), "Expected:", "East");

const robot2 = new Robot(3, 3);
robot2.step(8);
console.log("Test 3 Pos:", robot2.getPos(), "Expected:", [0, 0]);
console.log("Test 3 Dir:", robot2.getDir(), "Expected:", "South");

const robot3 = new Robot(2, 2);
console.log("Test 4 Pos:", robot3.getPos(), "Expected:", [0, 0]);
console.log("Test 4 Dir:", robot3.getDir(), "Expected:", "East");
robot3.step(1);
console.log("Test 5 Pos:", robot3.getPos(), "Expected:", [1, 0]);
console.log("Test 5 Dir:", robot3.getDir(), "Expected:", "East");
