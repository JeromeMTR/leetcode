/**
 * IOCE
 * Inputs:
 *  - mat: number[][], an m x n binary matrix (0/1)
 *
 * Outputs:
 *  - number: count of "special" positions (i, j) where mat[i][j] == 1 and
 *    all other elements in row i and column j are 0.
 *
 * Constraints:
 *  - 1 <= m, n <= 100
 *  - mat[i][j] ∈ {0, 1}
 *
 * Time Complexity:
 *  - O(m*n) to count 1s per row/col and to scan again for special positions.
 *
 * Space Complexity:
 *  - O(m + n) for row and column counts.
 *
 * Edge Cases:
 *  - 1x1 matrix: [[1]] => 1, [[0]] => 0
 *  - Rows/columns with multiple 1s => none of those 1s can be special
 *  - All zeros => 0
 */

/**
 * Count special positions in a binary matrix.
 */
function numSpecial(mat: number[][]): number {
  const m = mat.length;
  const n = mat[0].length;

  // Count number of 1s in each row and each column
  const rowCount = new Array<number>(m).fill(0);
  const colCount = new Array<number>(n).fill(0);

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] === 1) {
        rowCount[i]++;
        colCount[j]++;
      }
    }
  }

  // A position is special if it's 1 AND its row and col each have exactly one 1.
  let special = 0;
  for (let i = 0; i < m; i++) {
    if (rowCount[i] !== 1) continue; // quick skip
    for (let j = 0; j < n; j++) {
      if (mat[i][j] === 1 && colCount[j] === 1) {
        special++;
      }
    }
  }

  return special;
}

/* -------------------- Console log tests -------------------- */

// Example 1
console.log(
  numSpecial([
    [1, 0, 0],
    [0, 0, 1],
    [1, 0, 0],
  ]),
  "=> expected 1"
);

// Example 2
console.log(
  numSpecial([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ]),
  "=> expected 3"
);

// Edge cases
console.log(numSpecial([[1]]), "=> expected 1");
console.log(numSpecial([[0]]), "=> expected 0");

console.log(
  numSpecial([
    [1, 1],
    [0, 0],
  ]),
  "=> expected 0"
);

console.log(
  numSpecial([
    [0, 0, 0],
    [0, 0, 0],
  ]),
  "=> expected 0"
);

console.log(
  numSpecial([
    [0, 1, 0],
    [0, 0, 0],
    [0, 1, 0],
  ]),
  "=> expected 0"
);