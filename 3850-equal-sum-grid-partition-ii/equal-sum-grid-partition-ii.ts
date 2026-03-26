/*
IOCE

Inputs:
- grid: number[][], an m x n matrix of positive integers

Output:
- boolean
  - true  => there exists at least one horizontal or vertical cut such that:
      1) both parts are non-empty
      2) sums are already equal OR can be made equal by discounting at most one cell total
      3) if one cell is discounted, the remaining cells in that chosen part stay connected
  - false => otherwise

Constraints:
- 1 <= m = grid.length <= 1e5
- 1 <= n = grid[i].length <= 1e5
- 2 <= m * n <= 1e5
- 1 <= grid[i][j] <= 1e5

*/

function canPartitionGrid(grid: number[][]): boolean {
    const m = grid.length;
    const n = grid[0].length;

    let total = 0;
    const rowSums = new Array<number>(m).fill(0);
    const colSums = new Array<number>(n).fill(0);

    // Count all values in entire grid
    const totalCount = new Map<number, number>();

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const v = grid[i][j];
            total += v;
            rowSums[i] += v;
            colSums[j] += v;
            totalCount.set(v, (totalCount.get(v) || 0) + 1);
        }
    }

    const addMap = (map: Map<number, number>, key: number, delta: number) => {
        const nv = (map.get(key) || 0) + delta;
        if (nv === 0) map.delete(key);
        else map.set(key, nv);
    };

    // Checks whether there exists a removable cell with value "need"
    // inside a rectangle:
    // rows [r1..r2], cols [c1..c2]
    // using count map "cnt" for all values in the rectangle.
    const hasRemovableValue = (
        need: number,
        r1: number,
        r2: number,
        c1: number,
        c2: number,
        cnt: Map<number, number>
    ): boolean => {
        const h = r2 - r1 + 1;
        const w = c2 - c1 + 1;

        const available = cnt.get(need) || 0;
        if (available === 0) return false;

        // Single cell rectangle cannot remove its only cell because section must remain non-empty
        if (h === 1 && w === 1) return false;

        // If both dimensions >= 2, any cell can be removed while preserving connectivity
        if (h >= 2 && w >= 2) return true;

        // 1 x w strip: only endpoints removable
        if (h === 1) {
            return grid[r1][c1] === need || grid[r1][c2] === need;
        }

        // h x 1 strip: only endpoints removable
        if (w === 1) {
            return grid[r1][c1] === need || grid[r2][c1] === need;
        }

        return false;
    };

    // ------------------------------------------------------------
    // Check horizontal cuts
    // top rows grow from 0..r, bottom rows shrink from r+1..m-1
    // ------------------------------------------------------------
    {
        const topCount = new Map<number, number>();
        const bottomCount = new Map<number, number>(totalCount);

        let topSum = 0;

        for (let r = 0; r < m - 1; r++) {
            // move row r from bottom -> top
            topSum += rowSums[r];
            for (let j = 0; j < n; j++) {
                const v = grid[r][j];
                addMap(topCount, v, 1);
                addMap(bottomCount, v, -1);
            }

            const bottomSum = total - topSum;

            if (topSum === bottomSum) return true;

            if (topSum > bottomSum) {
                const need = topSum - bottomSum;
                if (hasRemovableValue(need, 0, r, 0, n - 1, topCount)) {
                    return true;
                }
            } else {
                const need = bottomSum - topSum;
                if (hasRemovableValue(need, r + 1, m - 1, 0, n - 1, bottomCount)) {
                    return true;
                }
            }
        }
    }

    // ------------------------------------------------------------
    // Check vertical cuts
    // left cols grow from 0..c, right cols shrink from c+1..n-1
    // ------------------------------------------------------------
    {
        const leftCount = new Map<number, number>();
        const rightCount = new Map<number, number>(totalCount);

        let leftSum = 0;

        for (let c = 0; c < n - 1; c++) {
            // move column c from right -> left
            leftSum += colSums[c];
            for (let i = 0; i < m; i++) {
                const v = grid[i][c];
                addMap(leftCount, v, 1);
                addMap(rightCount, v, -1);
            }

            const rightSum = total - leftSum;

            if (leftSum === rightSum) return true;

            if (leftSum > rightSum) {
                const need = leftSum - rightSum;
                if (hasRemovableValue(need, 0, m - 1, 0, c, leftCount)) {
                    return true;
                }
            } else {
                const need = rightSum - leftSum;
                if (hasRemovableValue(need, 0, m - 1, c + 1, n - 1, rightCount)) {
                    return true;
                }
            }
        }
    }

    return false;
}

/*
Comments / reasoning recap:

1. We try every possible horizontal and vertical cut.
2. For each cut:
   - If sums equal => success
   - Else larger side must discount exactly the difference
3. Connectivity after removing one cell from a rectangular section:
   - if both dimensions >= 2, always connected
   - if shape is a line, only an endpoint can be removed
   - if single cell, impossible
4. Therefore each cut reduces to checking if the larger section contains
   a value == difference at a removable position.
5. We maintain frequency maps for growing/shrinking sections during scans.

This yields O(m*n) time and O(m*n) worst-case extra space.
*/


// ------------------------------------------------------------
// Console log tests
// ------------------------------------------------------------

console.log(canPartitionGrid([[1, 4], [2, 3]])); // true
console.log(canPartitionGrid([[1, 2], [3, 4]])); // true
console.log(canPartitionGrid([[1, 2, 4], [2, 3, 5]])); // false
console.log(canPartitionGrid([[4, 1, 8], [3, 2, 6]])); // false

// Additional tests
console.log(canPartitionGrid([[5, 5]])); // true (vertical cut: 5 vs 5)
console.log(canPartitionGrid([[1], [1]])); // true (horizontal cut: 1 vs 1)
console.log(canPartitionGrid([[1, 3]])); // false (2 single-cell sections, cannot discount larger because section would become empty)
console.log(canPartitionGrid([[1, 2, 3]])); // true (cut after col 1: left=1, right=5, no; cut after col 2: left=3,right=3? actually after col 1 => [1,2]|[3] => 3 and 3)
console.log(canPartitionGrid([[2, 1], [1, 2]])); // true
console.log(canPartitionGrid([[1, 1, 1], [1, 10, 1]])); // false