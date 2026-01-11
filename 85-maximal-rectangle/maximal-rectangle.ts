/**
 * IOCE
 * - Input: `matrix: string[][]` where each cell is '0' or '1'.
 * - Output: `number` — maximal rectangle area consisting entirely of '1's.
 * - Constraints: rectangular grid; matrix may be empty; values are only '0' or '1'.
 * - Edge Cases: empty matrix → 0; single cell; single row/column; alternating patterns.
 */

function maximalRectangle(matrix: string[][]): number {
    if (matrix.length == 0) return 0;

    const rows = matrix.length;
    const cols = matrix[0].length;
    const heights = new Array(cols).fill(0);
    let maxArea = 0;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // Update the running count of '1's in the column
            heights[j] = matrix[i][j] === '1' ? heights[j] + 1 : 0;
        }
        // For each row, calculate the maximal rectangle area with histogram technique
        maxArea = Math.max(maxArea, largestRectangleArea(heights));
    }

    return maxArea;
}

function largestRectangleArea(heights: number[]): number {
    const stack: number[] = [];
    heights.push(0); // Add a zero to flush out remaining heights in stack
    let maxArea = 0;

    for (let i = 0; i < heights.length; i++) {
        while (stack.length && heights[i] < heights[stack[stack.length - 1]]) {
            const height = heights[stack.pop()!];
            const width = stack.length ? i - stack[stack.length - 1] - 1 : i;
            maxArea = Math.max(maxArea, height * width);
        }
        stack.push(i);
    }

    return maxArea;
}

// Console log tests
console.log(maximalRectangle([["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]])); // Output: 6
console.log(maximalRectangle([["0"]])); // Output: 0
console.log(maximalRectangle([["1"]])); // Output: 1
console.log(maximalRectangle([["1","0"],["1","0"]])); // Output: 2
console.log(maximalRectangle([["0","1"],["1","0"]])); // Output: 1
console.log(maximalRectangle([])); // Output: 0