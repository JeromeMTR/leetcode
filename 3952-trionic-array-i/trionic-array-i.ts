/**
 * IOCE (Input, Output, Constraints, Edge cases)
 *
 * Input:
 *   nums: number[]
 *
 * Output:
 *   boolean — true iff there exist indices 0 < p < q < n - 1 such that:
 *     - nums[0..p] is strictly increasing
 *     - nums[p..q] is strictly decreasing
 *     - nums[q..n-1] is strictly increasing
 *
 * Constraints:
 *   3 <= n <= 100
 *   -1000 <= nums[i] <= 1000
 *   Time:  O(n^3) via trying all (p, q) and checking monotonicity
 *   Space: O(1)
 *
 * Edge cases:
 *   - n < 4 => false (cannot satisfy 0 < p < q < n-1)
 *   - any equal adjacent pair breaks strict monotonicity
 *
 */

/**
 * Determine whether an array is trionic.
 *
 * A trionic array admits indices 0 < p < q < n - 1 such that:
 * nums[0..p] is strictly increasing, nums[p..q] strictly decreasing,
 * and nums[q..n-1] strictly increasing.
 *
 * @param nums - Input array
 * @returns True if trionic, else false
 */
function isTrionic(nums: number[]): boolean {
  const n = nums.length;
  if (n < 4) return false; // because we need 0 < p < q < n-1

  // p must be at least 1, q must be at most n-2, and p < q
  for (let p = 1; p <= n - 3; p++) {
    for (let q = p + 1; q <= n - 2; q++) {
      if (
        isStrictInc(nums, 0, p) &&
        isStrictDec(nums, p, q) &&
        isStrictInc(nums, q, n - 1)
      ) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Check if nums[l..r] is strictly increasing (inclusive).
 *
 * IOCE:
 *   Input:  nums (number[]), l (number), r (number)
 *   Output: boolean
 *   Constraints:
 *     - 0 <= l <= r < nums.length
 *     - Space: O(1)
 *   Edge cases:
 *     - l === r (single element) => true (eccentrically strictly increasing)
 *     - any adjacent equality within [l..r] => false (strictness violated)
 *
 * @param nums - Input array
 * @param l - Left index (inclusive)
 * @param r - Right index (inclusive)
 * @returns True if strictly increasing, else false
 */
function isStrictInc(nums: number[], l: number, r: number): boolean {
  for (let i = l; i < r; i++) {
    if (nums[i] >= nums[i + 1]) return false;
  }
  return true;
}

/**
 * Check if nums[l..r] is strictly decreasing (inclusive).
 *
 * IOCE:
 *   Input:  nums (number[]), l (number), r (number)
 *   Output: boolean
 *   Constraints:
 *     - 0 <= l <= r < nums.length
 *     - Space: O(1)
 *   Edge cases:
 *     - l === r (single element) => true (eccentrically strictly decreasing)
 *     - any adjacent equality within [l..r] => false (strictness violated)
 *
 * @param nums - Input array
 * @param l - Left index (inclusive)
 * @param r - Right index (inclusive)
 * @returns True if strictly decreasing, else false
 */
function isStrictDec(nums: number[], l: number, r: number): boolean {
  for (let i = l; i < r; i++) {
    if (nums[i] <= nums[i + 1]) return false;
  }
  return true;
}

/* -------------------- Console log tests -------------------- */

console.log(isTrionic([1, 3, 5, 4, 2, 6]));
console.log(isTrionic([2, 1, 3]));
console.log(isTrionic([1, 2, 3, 2, 1, 2, 3]));
console.log(isTrionic([1, 2, 2, 1, 2]));
console.log(isTrionic([3, 2, 1, 2, 3]));
console.log(isTrionic([1, 4, 3, 2, 5]));
console.log(isTrionic([1, 2, 3, 4]));
