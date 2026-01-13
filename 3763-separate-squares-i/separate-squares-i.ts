// TypeScript program to find the minimum y-coordinate of a horizontal line
// that splits the total area of squares above and below the line equally

function separateSquares(squares: number[][]): number {
    // Initialize variables to store total area of squares
    let totalArea = 0;

    // Compute total area of all squares
    for (const [x, y, l] of squares) {
        totalArea += l * l;
    }

    // Helper function to calculate area below a given y-coordinate
    const areaBelow = (y: number) => {
        let area = 0;
        for (const [sx, sy, l] of squares) {
            if (y > sy) {
                const effectiveHeight = Math.min(l, y - sy);
                area += l * effectiveHeight;
            }
        }
        return area;
    };

    // Initialize search range for the y-coordinate using binary search
    let left = 0;
    let right = 1e9;
    const epsilon = 1e-5;

    while (right - left > epsilon) {
        const mid = (left + right) / 2;
        const areaBelowMid = areaBelow(mid);
        if (areaBelowMid * 2 >= totalArea) {
            right = mid;
        } else {
            left = mid;
        }
    }
    return left;
}

// Example Inputs
console.log(findMinYCoordinate([[0, 0, 1], [2, 2, 1]])); // Example 1: Output should be approximately 1
console.log(findMinYCoordinate([[0, 0, 2], [1, 1, 1]])); // Example 2: Output should be approximately 1.16667

// Additional test case validations
console.log(findMinYCoordinate([[3, 1, 2], [1, 2, 1], [2, 1, 2]])); // Expected output: 3
console.log(findMinYCoordinate([[1, 2, 1], [2, 1, 2], [1, 2, 1], [2, 1, 2]])); // Expected output: 4
console.log(findMinYCoordinate([[1, 1, 3], [3, 3, 3], [4, 4, 5], [5, 5, 1]])); // Expected output: 4