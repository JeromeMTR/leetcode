/**
 * IOCE
 *
 * Inputs:
 * - boxGrid: character matrix of size m x n
 *   - '#' => stone
 *   - '*' => obstacle
 *   - '.' => empty
 *
 * Output:
 * - Return the rotated box as an n x m character matrix after:
 *   1. rotating the box 90 degrees clockwise
 *   2. letting stones fall downward due to gravity
 *
 * Constraints:
 * - 1 <= m, n <= 500
 * - boxGrid[i][j] is one of '#', '*', '.'
 *
 * Edge Cases:
 * - Single row
 * - Single column
 * - All cells are stones
 * - All cells are empty
 * - Obstacles splitting a row into multiple segments
 * - Stones already packed tightly
 * - Stones and obstacles mixed in many places
 */

function rotateTheBox(boxGrid: string[][]): string[][] {
    const m = boxGrid.length;
    const n = boxGrid[0].length;

    for (let i = 0; i < m; i++) {
        // write points to the rightmost available place where a stone can settle
        let write = n - 1;

        for (let j = n - 1; j >= 0; j--) {
            if (boxGrid[i][j] === '*') {
                // Obstacle stays fixed, and stones can only fall to its left segment
                write = j - 1;
            } else if (boxGrid[i][j] === '#') {
                // Move this stone to the current write position if needed
                boxGrid[i][j] = '.';
                boxGrid[i][write] = '#';
                write--;
            }
        }
    }

    const rotated: string[][] = Array.from({ length: n }, () => Array(m).fill('.'));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            rotated[j][m - 1 - i] = boxGrid[i][j];
        }
    }

    return rotated;
}
