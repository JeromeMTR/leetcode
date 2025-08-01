/**
 * Generates the first numRows of Pascal's triangle.
 * @param numRows The number of rows for the triangle (1 <= numRows <= 30)
 * @returns 2D array containing the rows of Pascal's triangle
 */
function generate(numRows: number): number[][] {
    // Initialize the array to hold all rows
    const triangle: number[][] = [];

    for (let row = 0; row < numRows; row++) {
        // Start each row with '1'
        const newRow: number[] = [1];

        // Fill in the middle values if row >= 2
        for (let col = 1; col < row; col++) {
            // The value is the sum of the two values above it
            const prevRow = triangle[row - 1];
            newRow[col] = prevRow[col - 1] + prevRow[col];
        }

        // End each row with '1' if row > 0
        if (row > 0) {
            newRow.push(1);
        }

        // Add the constructed row to the triangle
        triangle.push(newRow);
    }

    return triangle;
}

// ---- Example Usage ----
console.log(generate(5)); // Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
console.log(generate(1)); // Output: [[1]]