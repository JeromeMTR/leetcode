/**
 * Find the smallest rectangle enclosing all 1's in the grid,
 * and return its area.
 * 
 * @param grid 2D binary array
 * @returns The minimum possible area of the rectangle
 */
function minAreaRectCoveringAllOnes(grid: number[][]): number {
    // Initialize extreme values
    let minRow = grid.length, maxRow = -1;
    let minCol = grid[0].length, maxCol = -1;

    // Traverse the grid to find min/max row and col where 1 appears
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 1) {
                if (i < minRow) minRow = i;
                if (i > maxRow) maxRow = i;
                if (j < minCol) minCol = j;
                if (j > maxCol) maxCol = j;
            }
        }
    }

    // The area is the product of height and width.
    const height = maxRow - minRow + 1;
    const width = maxCol - minCol + 1;

    return height * width;
}


/* ========== IOCE ========== */

// Input
const grid1 = [
  [0,1,0],
  [1,0,1]
];
const grid2 = [
  [1,0],
  [0,0]
];

// Output / Example
console.log(minAreaRectCoveringAllOnes(grid1)); // 6
console.log(minAreaRectCoveringAllOnes(grid2)); // 1

/*
Explanation:
grid1: rectangle covers rows 0-1 and columns 0-2, area = (1-0+1)*(2-0+1)=2*3=6
grid2: only (0,0) is 1, so area = 1
*/