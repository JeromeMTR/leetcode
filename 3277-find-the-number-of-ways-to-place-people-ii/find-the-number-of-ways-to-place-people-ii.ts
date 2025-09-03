/**
 * Count number of valid (Alice, Bob) pairs for hiding in a rectangle with Alice in upper left, Bob in lower right, 
 * and no other person on or inside the rectangle.
 * 
 * @param points - integer 2D array of [x, y] coordinates, all distinct, n x 2 size
 * @returns number of valid ordered pairs (Alice, Bob)
 */
function numberOfPairs(points: number[][]): number {
    const n = points.length;
    let res = 0;

    // For each ordered pair (i, j), try Alice = i, Bob = j
    for (let i = 0; i < n; i++) {
        const [ax, ay] = points[i];
        for (let j = 0; j < n; j++) {
            if (i === j) continue;
            const [bx, by] = points[j];

            // Alice must be upper left; Bob lower right
            if (ax > bx || ay < by) continue;

            // Check that no other person is inside/on the rectangle (including edges)
            let possible = true;
            for (let k = 0; k < n; k++) {
                if (k === i || k === j) continue;
                const [cx, cy] = points[k];
                if (
                    ax <= cx &&
                    cx <= bx &&
                    by <= cy &&
                    cy <= ay
                ) {
                    possible = false;
                    break;
                }
            }
            if (possible) res++;
        }
    }

    return res;
}

/* IOCE */

// Input 1
console.log(numberOfPairs([[1,1],[2,2],[3,3]])); // Output: 0

// Input 2
console.log(numberOfPairs([[6,2],[4,4],[2,6]])); // Output: 2

// Input 3
console.log(numberOfPairs([[3,1],[1,3],[1,1]])); // Output: 2

/* 
Explanation for each input:

Input 1:
  No way for Alice and Bob to hide.

Input 2: 
  Two ways: (4,4)-(6,2); (2,6)-(4,4)

Input 3: 
  Two ways: (1,1)-(3,1), (1,3)-(1,1)
*/