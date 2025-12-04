/**
 * Count the total number of car collisions given their motion directions.
 * 
 * The idea is:
 * - Cars move only if they're 'L' or 'R'.
 * - Only the 'core' segment (between the first car not going strictly left and last car not going strictly right) may result in collisions.
 *   - Initial cars going left ('L' at the leftmost) don't collide - they just leave.
 *   - Initial cars going right on the rightmost - same, they leave.
 * - Every car in the 'core' that's not standing still will eventually crash into another.
 * 
 * IOCE:
 * - Input: string directions, e.g. "RLRSLL"
 * - Output: number (count of collisions)
 * - Comments in code
 */

function countCollisions(directions: string): number {
    let n = directions.length;

    // Find the first position where the car doesn't go left
    let left = 0;
    while (left < n && directions[left] === 'L') {
        left++;
    }

    // Find the last position where the car doesn't go right
    let right = n - 1;
    while (right >= 0 && directions[right] === 'R') {
        right--;
    }

    // Count number of moving cars ('L' or 'R') in the "core" segment [left, right]
    let collisions = 0;
    for (let i = left; i <= right; i++) {
        if (directions[i] === 'L' || directions[i] === 'R') {
            collisions++;
        }
        // cars with 'S' do not contribute directly - moving cars hitting stationary cars are counted above
    }

    return collisions;
}