/**
 * IOCE
 * Inputs:
 *  - nums: number[] (circular array)
 *  - queries: number[] (indices into nums)
 *
 * Outputs:
 *  - number[] answer where answer[i] is the minimum circular distance from queries[i]
 *    to any other index j with nums[j] == nums[queries[i]], else -1.
 *
 * Constraints:
 *  - 1 <= queries.length <= nums.length <= 1e5
 *  - 1 <= nums[i] <= 1e6
 *  - 0 <= queries[i] < nums.length
 *
 * Time Complexity:
 *  - Build positions map: O(n)
 *  - For each query: O(log k) where k is occurrences of that value (binary search)
 *  - Total: O(n + q log n) worst-case
 *
 * Space Complexity:
 *  - O(n) for storing positions
 *
 * Edge Cases:
 *  - Value occurs only once => -1
 *  - Value occurs multiple times; nearest could be via wrap-around
 *  - nums length = 1
 *  - Many queries repeat the same index/value
 */

function minCircularDistances(nums: number[], queries: number[]): number[] {
  const n = nums.length;

  // Map value -> sorted list of indices where it occurs
  const pos = new Map<number, number[]>();
  for (let i = 0; i < n; i++) {
    const v = nums[i];
    let arr = pos.get(v);
    if (!arr) {
      arr = [];
      pos.set(v, arr);
    }
    arr.push(i);
  }

  // lowerBound: first index >= target in a sorted array
  function lowerBound(arr: number[], target: number): number {
    let lo = 0, hi = arr.length; // [lo, hi)
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (arr[mid] < target) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }

  // circular distance between indices a and b in [0..n-1]
  function circDist(a: number, b: number): number {
    const d = Math.abs(a - b);
    return Math.min(d, n - d);
  }

  const ans: number[] = new Array(queries.length);

  for (let qi = 0; qi < queries.length; qi++) {
    const idx = queries[qi];
    const v = nums[idx];
    const arr = pos.get(v)!;

    if (arr.length <= 1) {
      ans[qi] = -1;
      continue;
    }

    // Find idx's neighbors in arr (prev and next in sorted order)
    const p = lowerBound(arr, idx);

    // Since idx itself is in arr, arr[p] should be idx (but keep robust anyway)
    const next = arr[(p + 1) % arr.length];
    const prev = arr[(p - 1 + arr.length) % arr.length];

    ans[qi] = Math.min(circDist(idx, prev), circDist(idx, next));
  }

  return ans;
}

/* -------------------- Tests (console logs) -------------------- */

// Example 1
console.log(
  minCircularDistances([1, 3, 1, 4, 1, 3, 2], [0, 3, 5]),
  "expected",
  [2, -1, 3]
);

// Example 2
console.log(
  minCircularDistances([1, 2, 3, 4], [0, 1, 2, 3]),
  "expected",
  [-1, -1, -1, -1]
);

// Wrap-around nearest
// nums: value 7 at indices 0 and 4 in n=5 => distance between 0 and 4 is 1
console.log(
  minCircularDistances([7, 1, 2, 3, 7], [0, 4]),
  "expected",
  [1, 1]
);

// Multiple occurrences; check nearest among neighbors
console.log(
  minCircularDistances([5, 9, 5, 5, 9, 5], [2, 1, 4]),
  "expected",
  [1, 3, 3]
);

// n = 1
console.log(minCircularDistances([10], [0]), "expected", [-1]);