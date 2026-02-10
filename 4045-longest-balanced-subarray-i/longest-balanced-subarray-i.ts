/**
 * IOCE
 * ----
 * Input:
 *   - nums: number[] (length n)
 *
 * Output:
 *   - number: length of the longest balanced (non-empty) subarray
 *
 * Constraints:
 *   - O(n^2) in worst case.
 *   - O(n) for sets used per starting index (worst case distinct elements in suffix).
 *
 * Edge cases:
 *   - All numbers same parity -> answer 0 (no balanced subarray).
 *   - Repeated numbers: distinct counting must not increase on repeats.
 *   - Single element array: cannot be balanced -> 0.
 */

function longestBalanced(nums: number[]): number {
  const n = nums.length;
  let best = 0;

  for (let i = 0; i < n; i++) {
    const seenEven = new Set<number>();
    const seenOdd = new Set<number>();
    let distinctEven = 0;
    let distinctOdd = 0;

    for (let j = i; j < n; j++) {
      const x = nums[j];
      if ((x & 1) === 0) {
        if (!seenEven.has(x)) {
          seenEven.add(x);
          distinctEven++;
        }
      } else {
        if (!seenOdd.has(x)) {
          seenOdd.add(x);
          distinctOdd++;
        }
      }

      // Balanced if distinct counts match
      if (distinctEven === distinctOdd) {
        best = Math.max(best, j - i + 1);
      }
    }
  }

  return best;
}

/**********************
 * Console log tests
 **********************/
console.log(longestBalanced([2, 5, 4, 3]), "=> expected 4");
console.log(longestBalanced([3, 2, 2, 5, 4]), "=> expected 5");
console.log(longestBalanced([1, 2, 3, 2]), "=> expected 3");
