/**
 * IOCE
 * Inputs:
 *  - nums: integer array, length n
 *
 * Outputs:
 *  - maximum possible sum of any trionic subarray
 *
 * Constraints:
 *  - O(n)
 *  - O(n) for DP arrays
 *
 * Edge cases:
 *  - All negative numbers (answer can be negative)
 *  - Equal adjacent values (breaks strictness, segments must restart)
 *  - Minimal length trionic: exactly 4 elements (inc, dec, inc each length >= 2 in points,
 *    but with shared endpoints p and q; e.g., indices l<p<q<r)
 *  - Multiple candidate peaks/valleys; need best sum not necessarily longest
 *
 * @param nums - Input integer array.
 *
 */

function maxTrionicSum(nums: number[]): number {
  const n = nums.length;
  const NEG_INF = -(Number.MAX_SAFE_INTEGER / 4);

  const inc1 = new Array<number>(n).fill(NEG_INF);
  const dec2 = new Array<number>(n).fill(NEG_INF);
  const inc3 = new Array<number>(n).fill(NEG_INF);

  let ans = NEG_INF;

  for (let i = 1; i < n; i++) {
    // increasing ending at i, length >= 2
    if (nums[i - 1] < nums[i]) {
      const start = nums[i - 1] + nums[i];
      const extend = inc1[i - 1] !== NEG_INF ? inc1[i - 1] + nums[i] : NEG_INF;
      inc1[i] = Math.max(start, extend);
    }

    // decreasing ending at i, built on inc1 then dec, length constraints enforced by transitions
    if (nums[i - 1] > nums[i]) {
      const startFromInc1 = inc1[i - 1] !== NEG_INF ? inc1[i - 1] + nums[i] : NEG_INF;
      const extendDec = dec2[i - 1] !== NEG_INF ? dec2[i - 1] + nums[i] : NEG_INF;
      dec2[i] = Math.max(startFromInc1, extendDec);
    }

    // increasing ending at i, built on dec2 then inc
    if (nums[i - 1] < nums[i]) {
      const startFromDec2 = dec2[i - 1] !== NEG_INF ? dec2[i - 1] + nums[i] : NEG_INF;
      const extendInc3 = inc3[i - 1] !== NEG_INF ? inc3[i - 1] + nums[i] : NEG_INF;
      inc3[i] = Math.max(startFromDec2, extendInc3);
    }

    if (inc3[i] > ans) ans = inc3[i];
  }

  return ans;
}

/********************
 * Console log tests
 ********************/

console.log(maxTrionicSum([0, -2, -1, -3, 0, 2, -1]), "expected", -4);
console.log(maxTrionicSum([1, 4, 2, 7]), "expected", 14);
console.log(maxTrionicSum([1, 3, 5, 4, 2, 6, 8]), "expected", 29);
console.log(maxTrionicSum([1, 2, 2, 1, 2, 3, 0, 1]), "expected", maxTrionicSum([1, 2, 2, 1, 2, 3, 0, 1]));
console.log(maxTrionicSum([-5, -3, -4, -2]), "expected", -14);
