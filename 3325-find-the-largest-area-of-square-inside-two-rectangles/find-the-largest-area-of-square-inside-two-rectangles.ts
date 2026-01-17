/**
 * Finds the largest area of a square that can fit inside the intersection of any two rectangles.
 *
 * @param bottomLeft - An array of [x, y] pairs representing the bottom-left corners of rectangles.
 * @param topRight - An array of [x, y] pairs representing the top-right corners of rectangles.
 * @returns The largest possible area of a square that fits inside the intersection of any two rectangles.
 *
 * IOCE:
 * Input: bottomLeft = [[1, 1], [2, 2], [3, 1]], topRight = [[3, 3], [4, 4], [6, 6]]
 * Output: 1
 * Example: The largest square that fits in the intersection of any two rectangles has area 1.
 *
 * Input: bottomLeft = [[1, 1], [1, 3], [1, 5]], topRight = [[5, 5], [5, 7], [5, 9]]
 * Output: 4
 * Example: The largest square that fits in the intersection of any two rectangles has area 4.
 */

function largestSquareArea(bottomLeft: number[][], topRight: number[][]): number {
    const n = bottomLeft.length;
    let maxArea = 0;

    // Iterate over all pairs of rectangles
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            // Calculate the overlap area coordinates
            const overlapLeft = Math.max(bottomLeft[i][0], bottomLeft[j][0]);
            const overlapBottom = Math.max(bottomLeft[i][1], bottomLeft[j][1]);
            const overlapRight = Math.min(topRight[i][0], topRight[j][0]);
            const overlapTop = Math.min(topRight[i][1], topRight[j][1]);

            // Check if there is actual overlap
            if (overlapLeft < overlapRight && overlapBottom < overlapTop) {
                // Calculate the largest square side length that fits in the overlap area
                const sideLength = Math.min(overlapRight - overlapLeft, overlapTop - overlapBottom);
                // Calculate the area of the square
                const area = sideLength * sideLength;
                maxArea = Math.max(maxArea, area);
            }
        }
    }

    return maxArea;
}

// Console tests
console.log(largestSquareArea([[1, 1], [2, 2], [3, 1]], [[3, 3], [4, 4], [6, 6]])); // Output: 1
console.log(largestSquareArea([[1, 1], [1, 3], [1, 5]], [[5, 5], [5, 7], [5, 9]])); // Output: 4
console.log(largestSquareArea([[1, 1], [2, 2], [1, 2]], [[3, 3], [4, 4], [3, 4]])); // Output: 1
console.log(largestSquareArea([[1, 1], [3, 3], [3, 1]], [[2, 2], [4, 4], [4, 2]])); // Output: 0
