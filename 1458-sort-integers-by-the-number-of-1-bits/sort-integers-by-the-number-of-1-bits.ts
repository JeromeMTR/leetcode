/**
 * Sort Array by Increasing Number of 1 Bits
 *
 * IOCE
 * Inputs:
 *  - arr: number[] (length 1..500), where 0 <= arr[i] <= 10^4
 *
 * Outputs:
 *  - number[]: the array sorted by:
 *      1) increasing count of 1s in binary representation (popcount),
 *      2) if tied, increasing numeric value.
 *
 * Constraints / Complexity:
 *  - Time: O(n log n) for sorting, with O(1) popcount per compare (values <= 1e4).
 *          (We can precompute popcounts to avoid recomputation; still O(n log n).)
 *  - Space: O(n) for caching popcounts (or O(1) extra if computed on the fly).
 *
 * Edge cases:
 *  - Contains 0 (popcount = 0)
 *  - All numbers have same popcount -> sorted numerically ascending
 *  - Duplicate values (sorting remains valid)
 *  - Min/Max constraints (length 1, values up to 10^4)
 */

/** Count set bits (1s) in a non-negative integer */
function popcount(x: number): number {
  // x <= 1e4 so this is fast; use Brian Kernighan’s algorithm
  let count = 0;
  while (x !== 0) {
    x &= x - 1;
    count++;
  }
  return count;
}

function sortByBits(arr: number[]): number[] {
  // Cache popcounts to avoid recomputing during sort comparisons
  const bits = new Map<number, number>();
  for (const v of arr) {
    if (!bits.has(v)) bits.set(v, popcount(v));
  }

  // Return a new sorted array (do not mutate input)
  return [...arr].sort((a, b) => {
    const ba = bits.get(a)!;
    const bb = bits.get(b)!;
    if (ba !== bb) return ba - bb;
    return a - b;
  });
}

/* ------------------------ Console log tests ------------------------ */

// Example 1
const arr1 = [0, 1, 2, 3, 4, 5, 6, 7, 8];
console.log("Input:", arr1);
console.log("Output:", sortByBits(arr1)); // expected: [0,1,2,4,8,3,5,6,7]

// Example 2
const arr2 = [1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1];
console.log("Input:", arr2);
console.log("Output:", sortByBits(arr2)); // expected: [1,2,4,8,16,32,64,128,256,512,1024]

// Additional tests
console.log(sortByBits([0])); // [0]
console.log(sortByBits([3, 3, 2, 2, 1, 1])); // [1,1,2,2,3,3]
console.log(sortByBits([10, 7, 3, 5])); // by bits: 10(2),7(3),3(2),5(2) => [3,5,10,7]