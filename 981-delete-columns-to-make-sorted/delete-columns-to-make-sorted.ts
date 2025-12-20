// Function to count the number of columns not sorted lexicographically
function minDeletionSize(strs: string[]): number {
    // Edge case: No strings or empty string array
    if (strs.length === 0 || strs[0].length === 0) {
        return 0;
    }
    
    const m = strs.length;     // Number of rows
    const n = strs[0].length;  // Number of columns (length of each string)
    let count = 0;             // Counter for unsorted columns

    // For each column
    for (let col = 0; col < n; col++) {
        // Check each pair of adjacent rows in the current column
        for (let row = 1; row < m; row++) {
            // If the current letter is smaller than the one above, the column isn't sorted
            if (strs[row][col] < strs[row - 1][col]) {
                count++;
                break; // No need to check further in this column
            }
        }
    }

    return count;
}

/*
IOCE (Input/Output/Comment/Example):

Example 1:
Input: ["cba","daf","ghi"]
Output: 1
// Columns 0 and 2 are sorted. Column 1 is not (b > a, d > a, a < f), so 1 deletion.

Example 2:
Input: ["a","b"]
Output: 0
// Only one column, and it is sorted.

Example 3:
Input: ["zyx","wvu","tsr"]
Output: 3
// All columns are not sorted, must delete all 3.
*/

// Test cases for verification
console.log(minDeletionSize(["cba", "daf", "ghi"])); // 1
console.log(minDeletionSize(["a", "b"])); // 0
console.log(minDeletionSize(["zyx", "wvu", "tsr"])); // 3
console.log(minDeletionSize(["abc","bce","cae"])); // 1

// Edge cases
console.log(minDeletionSize(["a"])); // 0
console.log(minDeletionSize(["ab","cd","ed"])); // 1

// Large input
let arr = Array(100).fill("a".repeat(1000));
console.log(minDeletionSize(arr)); // 0