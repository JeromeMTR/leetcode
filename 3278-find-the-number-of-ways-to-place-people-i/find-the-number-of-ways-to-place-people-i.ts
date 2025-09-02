/**
 * Counts the number of ordered pairs (A, B) such that
 * - A is on the upper left of B (A.x <= B.x && A.y >= B.y)
 * - The rectangle (or line) with corners A and B contains no other point, including on the border
 * 
 * @param points n x 2 integer coordinates [[x1,y1], [x2,y2], ...]
 * @returns number of valid ordered pairs (A, B)
 */
function countUpperLeftPairs(points: number[][]): number {
    const n = points.length;
    let count = 0;

    for (let i = 0; i < n; ++i) {
        const [ax, ay] = points[i];
        for (let j = 0; j < n; ++j) {
            if (i === j) continue;
            const [bx, by] = points[j];
            // Check A is upper left of B
            if (ax <= bx && ay >= by) {
                let ok = true;
                for (let k = 0; k < n; ++k) {
                    if (k === i || k === j) continue;
                    const [x, y] = points[k];
                    // Is this 3rd point (x,y) in rectangle (incl. border) made by (ax,ay) <-> (bx,by)?
                    if (
                        x >= Math.min(ax, bx) &&
                        x <= Math.max(ax, bx) &&
                        y >= Math.min(ay, by) &&
                        y <= Math.max(ay, by)
                    ) {
                        ok = false;
                        break;
                    }
                }
                if (ok) count++;
            }
        }
    }
    return count;
}

/* IOCE (Input / Output / Constraints / Example) */

// Example 1:
console.log(countUpperLeftPairs([[1,1],[2,2],[3,3]])); // 0

// Example 2:
console.log(countUpperLeftPairs([[6,2],[4,4],[2,6]])); // 2

// Example 3:
console.log(countUpperLeftPairs([[3,1],[1,3],[1,1]])); // 2

// Custom tests
console.log(countUpperLeftPairs([[1,5],[5,1],[5,5],[1,1]])); // Should be 4

/* Constraints:
   - 2 <= n <= 50
   - 0 <= points[i][0], points[i][1] <= 50
   - All points are distinct
*/

/*
Explanation: 
- Counts all ordered pairs (A, B) where A is upper left of B and their rectangle is empty except for A, B
- Brute force works due to small n (<=50); O(n^3) is acceptable
*/