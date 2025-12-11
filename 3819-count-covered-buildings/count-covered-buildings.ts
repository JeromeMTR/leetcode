/**
 * Solution to "Number of Covered Buildings" problem.
 *
 * We use maps to track for each row, the sorted columns having buildings,
 * and for each column, the sorted rows having buildings.
 * For each building, binary search in its row/column to see if
 * at least one building exists on the left/right/above/below.
 *
 * IOCE:
 * - Input: n: number, buildings: number[][]
 * - Output: number (count of covered buildings)
 * - Constraints: 2 <= n <= 10^5, 1 <= buildings.length <= 10^5,
 *   building positions uniq00ue, 1-based indexing
 * - Edge: Border buildings can never be covered since 4 neighbors needed.
 */

function countCoveredBuildings(n: number, buildings: number[][]): number {
    // Build row and column maps
    const rowMap = new Map<number, number[]>(); // row => columns with building
    const colMap = new Map<number, number[]>(); // col => rows with building

    for (const [x, y] of buildings) {
        if (!rowMap.has(x)) rowMap.set(x, []);
        rowMap.get(x)!.push(y);

        if (!colMap.has(y)) colMap.set(y, []);
        colMap.get(y)!.push(x);
    }

    // Sort all lists for binary search
    for (const cols of rowMap.values()) cols.sort((a, b) => a - b);
    for (const rows of colMap.values()) rows.sort((a, b) => a - b);

    // Helper: binary search in sorted arr, find if there is a value < val or > val
    function hasSmaller(arr: number[], val: number): boolean {
        // Is there any value < val?
        let l = 0, r = arr.length - 1, ok = false;
        while (l <= r) {
            const m = (l + r) >> 1;
            if (arr[m] < val) {
                ok = true;
                l = m + 1;
            } else {
                r = m - 1;
            }
        }
        return ok;
    }
    function hasGreater(arr: number[], val: number): boolean {
        // Is there any value > val?
        let l = 0, r = arr.length - 1, ok = false;
        while (l <= r) {
            const m = (l + r) >> 1;
            if (arr[m] > val) {
                ok = true;
                r = m - 1;
            } else {
                l = m + 1;
            }
        }
        return ok;
    }

    let covered = 0;
    for (const [x, y] of buildings) {
        // Must have at least one building:
        // - left (row: x, col: <y)
        // - right (row: x, col: >y)
        // - above (col: y, row: <x)
        // - below (col: y, row: >x)

        // Border buildings can never be covered
        if (x === 1 || x === n || y === 1 || y === n) continue;

        const rowCols = rowMap.get(x)!;
        const colRows = colMap.get(y)!;

        if (
            hasSmaller(rowCols, y) && // left
            hasGreater(rowCols, y) && // right
            hasSmaller(colRows, x) && // above
            hasGreater(colRows, x)    // below
        ) {
            covered++;
        }
    }

    return covered;
}

/* Example IOCE:

Example 1:
Input: n = 3, buildings = [[1,2],[2,2],[3,2],[2,1],[2,3]]
Output: 1

Example 2:
Input: n = 3, buildings = [[1,1],[1,2],[2,1],[2,2]]
Output: 0

Example 3:
Input: n = 5, buildings = [[1,3],[3,2],[3,3],[3,5],[5,3]]
Output: 1
*/