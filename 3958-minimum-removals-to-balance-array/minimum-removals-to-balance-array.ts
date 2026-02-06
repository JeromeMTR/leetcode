/**
 * IOCE
 * Inputs:
 *  - nums: number[] (length n)
 *  - k: number
 *
 * Output:
 *  - number: minimum removals so remaining array (non-empty) is balanced:
 *      max(remaining) <= k * min(remaining)
 *
 * Constraints:
 *  - 1 <= n <= 1e5
 *  - 1 <= nums[i] <= 1e9
 *  - 1 <= k <= 1e5
 *  - O(n log n) for sorting + O(n) for two pointers
 *  - O(1) extra (ignoring sort implementation details)
 *
 * Edge cases:
 *  - n = 1 => already balanced => 0 removals
 *  - k = 1 => need all remaining elements equal (window of equal values)
 *  - Very large values: use BigInt to avoid overflow in k * nums[l]
 */

function minRemoval(nums: number[], k: number): number {
  const n = nums.length;
  if (n <= 1) return 0;

  nums.sort((a, b) => a - b);

  let best = 1;
  let l = 0;

  for (let r = 0; r < n; r++) {
    // Move l until window becomes valid: nums[r] <= k * nums[l]
    while (l <= r && !isWindowValid(nums[l], nums[r], k)) {
      l++;
    }
    best = Math.max(best, r - l + 1);
  }

  return n - best;
}

/** Check aMax <= k * aMin safely using BigInt. */
function isWindowValid(minVal: number, maxVal: number, k: number): boolean {
  return BigInt(maxVal) <= BigInt(k) * BigInt(minVal);
}


/* ----------------- Console log tests ----------------- */
console.log(minRemoval([2, 1, 5], 2), "expected:", 1);
console.log(minRemoval([1, 6, 2, 9], 3), "expected:", 2);
console.log(minRemoval([4, 6], 2), "expected:", 0);
console.log(minRemoval([7], 10), "expected:", 0);
console.log(minRemoval([1, 1, 1, 1], 1), "expected:", 0);
console.log(minRemoval([1, 2, 2, 2, 10], 1), "expected:", 2);
console.log(minRemoval([1, 1000000000], 100000), "expected:", 1);
console.log(minRemoval([3, 6, 12, 24], 2), "expected:", 2);
