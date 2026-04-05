/**
 * Determine if a robot returns to the origin after executing all moves.
 *
 * IOCE
 * ----
 * Input:
 * - moves: string
 *   - Each character is one move:
 *     - 'U' => y + 1
 *     - 'D' => y - 1
 *     - 'L' => x - 1
 *     - 'R' => x + 1
 *
 * Output:
 * - boolean
 *   - true  => robot ends at (0, 0)
 *   - false => robot does not end at (0, 0)
 *
 * Constraints:
 * - 1 <= moves.length <= 2 * 10^4
 * - moves contains only 'U', 'D', 'L', 'R'
 *
 * Time Complexity:
 * - O(n)
 * Space Complexity:
 * - O(1)
 *
 * Edge Cases:
 * - Single move like "U" => false
 * - Opposite moves like "UD" or "LR" => true
 * - Repeated same-direction moves like "LL" => false
 * - Mixed moves with net zero displacement like "UDLR" => true
 */

function judgeCircle(moves: string): boolean {
    // Track the robot's current position.
    let x = 0;
    let y = 0;

    // Process each move and update coordinates.
    for (const move of moves) {
        if (move === 'U') {
            y++;
        } else if (move === 'D') {
            y--;
        } else if (move === 'L') {
            x--;
        } else if (move === 'R') {
            x++;
        }
    }

    // Robot returns to origin only if both coordinates are zero.
    return x === 0 && y === 0;
}


// Console log tests
console.log(judgeCircle("UD"));       // true
console.log(judgeCircle("LL"));       // false
console.log(judgeCircle("UDLR"));     // true
console.log(judgeCircle("UUDDLRLR")); // true
console.log(judgeCircle("U"));        // false
console.log(judgeCircle("RRDD"));     // false