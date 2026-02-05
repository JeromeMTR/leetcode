/**
 * IOCE
 * Inputs:
 *   - nums: number[]  (circular array)
 *
 * Outputs:
 *   - result: number[] where result[i] is the value landed on after moving
 *     nums[i] steps (right if positive, left if negative, same if 0).
 *
 * Constraints:
 *   - 1 <= nums.length <= 100
 *   - -100 <= nums[i] <= 100
 *   - O(n), one pass computing each landing index in O(1).
 *   - O(n) for the output array.
 *
 * Edge Cases:
 *   - nums[i] == 0 => result[i] = 0
 *   - Large steps vs length (use modulo)
 *   - Negative movement (ensure proper wrap-around)
 *   - length == 1 (everything lands on itself)
 */

function constructTransformedArray(nums: number[]): number[] {
  const n = nums.length;
  const result = new Array<number>(n);

  for (let i = 0; i < n; i++) {
    const step = nums[i];

    if (step === 0) {
      result[i] = 0;
      continue;
    }

    // Normalize movement with modulo to avoid extra cycles.
    // Use a positive modulo for safety with negatives:
    // landing = (i + step) mod n, in [0, n-1]
    const landing = ((i + (step % n)) % n + n) % n;

    result[i] = nums[landing];
  }

  return result;
}

/* -------------------- Console log tests -------------------- */
console.log(constructTransformedArray([3, -2, 1, 1])); // expected [1, 1, 1, 3]
console.log(constructTransformedArray([-1, 4, -1]));  // expected [-1, -1, 4]

// Edge cases
console.log(constructTransformedArray([0, 0, 0]));    // expected [0, 0, 0]
console.log(constructTransformedArray([5]));          // expected [5] (only index 0 exists)
console.log(constructTransformedArray([-3, 2, -4]));  // expected [-4, -3, 2]
