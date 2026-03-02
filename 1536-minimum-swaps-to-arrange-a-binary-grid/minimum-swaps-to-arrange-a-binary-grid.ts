/**
 * 1536. Minimum Swaps to Arrange a Binary Grid
 *
 * IOCE
 * Input: grid = [[0,0,1],[1,1,0],[1,0,0]]
 * Output: 3
 *
 * Constraints:
 * - n == grid.length == grid[i].length
 * - 1 <= n <= 200
 * - grid[i][j] is either 0 or 1
 *
 * Edge Cases:
 * - n = 1 (single cell grid is always valid):
 *   Input: [[1]]
 *   Output: 0
 * - Impossible to satisfy diagonal-zero condition:
 *   Input: [[0,1,1,0],[0,1,1,0],[0,1,1,0],[0,1,1,0]]
 *   Output: -1
 * - Already valid grid (no swaps needed):
 *   Input: [[1,0,0],[1,1,0],[1,1,1]]
 *   Output: 0
 */
function minSwaps(grid: number[][]): number {
  const n = grid.length;

  // trailingZeros[i] = number of consecutive 0s at the end of row i
  const trailingZeros: number[] = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    let count = 0;
    for (let j = n - 1; j >= 0 && grid[i][j] === 0; j--) {
      count++;
    }
    trailingZeros[i] = count;
  }

  let swaps = 0;

  // Row i needs at least (n - 1 - i) trailing zeros.
  for (let i = 0; i < n; i++) {
    const needed = n - 1 - i;
    let j = i;

    while (j < n && trailingZeros[j] < needed) {
      j++;
    }

    // No row can satisfy this position.
    if (j === n) {
      return -1;
    }

    // Bring row j up to i using adjacent swaps.
    while (j > i) {
      [trailingZeros[j], trailingZeros[j - 1]] = [trailingZeros[j - 1], trailingZeros[j]];
      swaps++;
      j--;
    }
  }

  return swaps;
}

// --- Test Cases ---
console.log(minSwaps([[0, 0, 1], [1, 1, 0], [1, 0, 0]])); // 3
console.log(minSwaps([[0, 1, 1], [1, 0, 1], [1, 1, 0]])); // -1
console.log(minSwaps([[1, 0, 0], [1, 1, 0], [1, 1, 1]])); // 0
