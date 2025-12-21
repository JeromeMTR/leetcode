/**
 * @param {string[]} strings - The input of strings.
 * @returns {number} The total number of deleted columns.
 */
function minDeletionSize(strings: string[]): number {
    const numRows = strings.length;
    const numCols = strings[0].length;

    // isSorted[i] = true if the pair (i, i+1) is already strictly sorted up to the current column
    const isSorted: boolean[] = Array(numRows - 1).fill(false);

    let columnsToDelete = 0;

    // Use a while loop for columns
    let colIdx = 0;
    while (colIdx < numCols) {
        let shouldDelete = false;
        // Use a while loop for rows
        let rowIdx = 0;
        while (rowIdx < numRows - 1) {
            // Only check pairs that are not already sorted
            if (!isSorted[rowIdx] && strings[rowIdx][colIdx] > strings[rowIdx + 1][colIdx]) {
                shouldDelete = true; // Mark this column for deletion
                break; // No need to check further pairs for this column
            }
            rowIdx++;
        }
        // If the column must be deleted, increment the counter and skip updating isSorted
        if (shouldDelete) {
            columnsToDelete++;
            colIdx++;
            continue;
        }
        // If the column is kept, update the isSorted state for pairs that become sorted at this column
        rowIdx = 0;
        while (rowIdx < numRows - 1) {
            // Only update pairs that are not already sorted
            if (!isSorted[rowIdx] && strings[rowIdx][colIdx] < strings[rowIdx + 1][colIdx]) {
                isSorted[rowIdx] = true; // Mark this pair as sorted
            }
            rowIdx++;
        }
        colIdx++;
    }

    // Return the total number of columns that need to be deleted
    return columnsToDelete;
};

/*
IOCE (Input/Output/Comment/Example):

Example 1:
Input: ["ca","bb","ac"]
Output: 1
// Delete column 1 to make each row sorted: ["c","b","a"]

Example 2:
Input: ["xc","yb","za"]
Output: 0
// All columns are already sorted.

Example 3:
Input: ["zyx","wvu","tsr"]
Output: 3
// All columns must be deleted.

Edge Case 1:
Input: ["a"]
Output: 0
// Only one row, nothing to delete.

Edge Case 2:
Input: ["ab","cd","ef"]
Output: 0
// All columns are sorted.

Edge Case 3:
Input: ["ab","cd","ed"]
Output: 1
// Only column 1 needs to be deleted.
*/

// Test cases for verification
console.log(minDeletionSize(["ca", "bb", "ac"])); // 1
console.log(minDeletionSize(["xc", "yb", "za"])); // 0
console.log(minDeletionSize(["zyx", "wvu", "tsr"])); // 3
console.log(minDeletionSize(["a"])); // 0
console.log(minDeletionSize(["ab", "cd", "ef"])); // 0
console.log(minDeletionSize(["ab", "cd", "ed"])); // 1