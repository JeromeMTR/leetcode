/**
 * Decode the Slanted Ciphertext
 *
 * IOCE
 * ----
 * Inputs:
 * - encodedText: string
 *   The row-wise flattened encoded string of the matrix.
 * - rows: number
 *   The fixed number of rows used to build the matrix.
 *
 * Output:
 * - string
 *   The original decoded text without trailing spaces.
 *
 * Constraints:
 * - 0 <= encodedText.length <= 10^6
 * - 1 <= rows <= 1000
 * - encodedText contains lowercase English letters and spaces only
 * - encodedText is a valid encoding of some originalText
 * - originalText has no trailing spaces
 * Time Complexity:
 * - O(n)
 * Space Complexity
 * - O(n)
 *
 * Edge Cases:
 * - encodedText is empty => return ""
 * - rows = 1 => encodedText is already the original text
 * - encodedText contains many spaces inside, but only trailing spaces in the decoded
 *   result should be removed
 * - Very large input size, so avoid building an actual 2D matrix if possible
 *
 */

function decodeCiphertext(encodedText: string, rows: number): string {
    // If there is no text, original is also empty.
    if (encodedText.length === 0) return "";

    // Number of columns in the matrix.
    const cols = Math.floor(encodedText.length / rows);

    const result: string[] = [];

    // Start a diagonal from every column in the first row.
    for (let startCol = 0; startCol < cols; startCol++) {
        let r = 0;
        let c = startCol;

        // Move diagonally down-right while inside the matrix.
        while (r < rows && c < cols) {
            // Convert 2D position (r, c) to 1D index in row-wise encodedText.
            result.push(encodedText[r * cols + c]);
            r++;
            c++;
        }
    }

    // Remove trailing spaces because originalText never ends with spaces.
    while (result.length > 0 && result[result.length - 1] === " ") {
        result.pop();
    }

    return result.join("");
}


// --------------------
// Console log tests
// --------------------

console.log(decodeCiphertext("ch   ie   pr", 3));
console.log(decodeCiphertext("iveo    eed   l te   olc", 4));
console.log(decodeCiphertext("coding", 1));
console.log(decodeCiphertext("", 1));
console.log(decodeCiphertext(" b  ac", 2));
