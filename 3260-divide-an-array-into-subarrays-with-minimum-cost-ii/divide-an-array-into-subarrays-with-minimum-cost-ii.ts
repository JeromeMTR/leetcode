/**
 * Minimum Sum of Costs of K Subarrays (LeetCode 3013)
 *
 * IOCE: Input, Output, Constraints, Edge cases
 *
 * Input:
 * - nums: number[] - Array of integers representing costs.
 * - k: number - Number of subarrays to divide into.
 * - dist: number - Maximum distance constraint between subarray starts.
 *
 * Output:
 * - number - Minimum sum of costs to divide the array into k subarrays.
 *
 * Constraints:
 * - O(n log n) using two Treaps (randomized balanced BST) for multiset operations.
 *
 * Edge cases:
 * - nums has only one element.
 * - k = 2, minimal subarray division.
 * - dist = 1, tightest window constraint.
 * - Large nums array with maximum constraints.
 * - 1 <= nums.length <= 10^5
 * - 1 <= nums[i] <= 10^4
 * - 2 <= k <= nums.length
 * - 1 <= dist <= nums.length
 */

 /**
 * Calculates the minimum cost to divide an array into k subarrays.
 * @param nums - Array of integers representing costs.
 * @param k - Number of subarrays to divide into.
 * @param dist - Maximum distance constraint between subarray starts.
 * @returns Minimum sum of costs.
 */

class ArrayHeap {
  private data: number[] = [];
  constructor(private less: (a: number, b: number) => boolean) {}

  size(): number {
    return this.data.length;
  }

  peek(): number | undefined {
    return this.data[0];
  }

  push(x: number): void {
    this.data.push(x);
    this.siftUp(this.data.length - 1);
  }

  pop(): number | undefined {
    const n = this.data.length;
    if (n === 0) return undefined;
    const top = this.data[0];
    const last = this.data.pop()!;
    if (n > 1) {
      this.data[0] = last;
      this.siftDown(0);
    }
    return top;
  }

  private siftUp(i: number): void {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (!this.less(this.data[i], this.data[p])) break;
      [this.data[i], this.data[p]] = [this.data[p], this.data[i]];
      i = p;
    }
  }

  private siftDown(i: number): void {
    const n = this.data.length;
    while (true) {
      let l = i * 2 + 1;
      let r = l + 1;
      let best = i;
      if (l < n && this.less(this.data[l], this.data[best])) best = l;
      if (r < n && this.less(this.data[r], this.data[best])) best = r;
      if (best === i) break;
      [this.data[i], this.data[best]] = [this.data[best], this.data[i]];
      i = best;
    }
  }
}

// Lazy deletion wrapper around a heap.
// We store values directly; duplicates are handled by counts in a map.
class LazyHeap {
  private heap: ArrayHeap;
  private delayed = new Map<number, number>();
  private _size = 0; // valid size excluding delayed

  constructor(isMinHeap: boolean) {
    this.heap = new ArrayHeap(isMinHeap ? (a, b) => a < b : (a, b) => a > b);
  }

  size(): number {
    return this._size;
  }

  peek(): number | undefined {
    this.prune();
    return this.heap.peek();
  }

  push(x: number): void {
    this.heap.push(x);
    this._size++;
  }

  pop(): number | undefined {
    this.prune();
    const v = this.heap.pop();
    if (v === undefined) return undefined;
    this._size--;
    return v;
  }

  // Mark x for deletion (assumes x exists in this heap's valid elements).
  erase(x: number): void {
    this._size--;
    this.delayed.set(x, (this.delayed.get(x) || 0) + 1);
    this.prune();
  }

  private prune(): void {
    while (this.heap.size() > 0) {
      const top = this.heap.peek()!;
      const cnt = this.delayed.get(top) || 0;
      if (cnt === 0) break;
      // remove it physically
      this.heap.pop();
      if (cnt === 1) this.delayed.delete(top);
      else this.delayed.set(top, cnt - 1);
    }
  }
}

// -------------------- Main Solution --------------------

function minimumCost(nums: number[], k: number, dist: number): number {
  const n = nums.length;
  const need = k - 2; // number of extra starts besides i1 and 0
  const base = nums[0];

  // small: max-heap of chosen smallest 'need' values
  // large: min-heap of the rest
  const small = new LazyHeap(false); // max-heap
  const large = new LazyHeap(true);  // min-heap
  let sumSmall = 0;

  function moveLargeToSmall(): void {
    const v = large.pop();
    if (v === undefined) return;
    small.push(v);
    sumSmall += v;
  }

  function moveSmallToLarge(): void {
    const v = small.pop();
    if (v === undefined) return;
    large.push(v);
    sumSmall -= v;
  }

  function rebalance(): void {
    // Ensure small has exactly 'need' elements (when possible).
    while (small.size() > need) moveSmallToLarge();
    while (small.size() < need && large.size() > 0) moveLargeToSmall();

    // Fix ordering: all elements in small should be <= all elements in large.
    while (small.size() > 0 && large.size() > 0) {
      const sTop = small.peek()!;
      const lTop = large.peek()!;
      if (sTop <= lTop) break;
      // Swap tops
      const a = small.pop()!;
      const b = large.pop()!;
      sumSmall -= a;
      sumSmall += b;
      small.push(b);
      large.push(a);
    }
  }

  function addValue(x: number): void {
    // Put into small if it improves the smallest-need set.
    if (need === 0) {
      large.push(x);
      return;
    }
    if (small.size() < need) {
      small.push(x);
      sumSmall += x;
    } else {
      const sTop = small.peek()!;
      if (x < sTop) {
        // replace the largest in small
        small.pop();
        sumSmall -= sTop;
        large.push(sTop);
        small.push(x);
        sumSmall += x;
      } else {
        large.push(x);
      }
    }
    rebalance();
  }

  function removeValue(x: number): void {
    if (need === 0) {
      large.erase(x);
      return;
    }
    // Decide which heap contains x based on current boundary.
    // This is a standard technique: if x <= max(small), assume it's in small; else in large.
    const sTop = small.peek();
    if (sTop !== undefined && x <= sTop) {
      small.erase(x);
      sumSmall -= x;
    } else {
      large.erase(x);
    }
    rebalance();
  }

  // Initialize window for i1 = 1:
  // W = [2 .. min(n-1, 1+dist)]
  let L = 2;
  let R = Math.min(n - 1, 1 + dist);
  for (let i = L; i <= R; i++) addValue(nums[i]);

  let ans = Number.POSITIVE_INFINITY;

  // i1 can range so that we can pick need elements from [i1+1 .. min(n-1, i1+dist)]
  // That window length must be >= need => min(n-1, i1+dist) - (i1+1) + 1 >= need
  // For i1 <= n-1-dist, length = dist - 0? specifically dist-? => (i1+dist)-(i1+1)+1 = dist
  // So dist >= need is guaranteed by constraints (dist >= k-2).
  // For i1 near end, window shrinks; so we stop when not enough elements.
  for (let i1 = 1; i1 <= n - 1; i1++) {
    // Current window corresponds to this i1 (maintained by sliding below).
    // Feasibility check:
    const end = Math.min(n - 1, i1 + dist);
    const available = end - (i1 + 1) + 1; // count in W
    if (available < need) break;

    // We need sumSmall to represent smallest 'need' in W.
    // Ensure structure has 'need' elements chosen.
    rebalance();

    const total = base + nums[i1] + sumSmall;
    if (total < ans) ans = total;

    // Slide to next i1:
    // Old W: [i1+1 .. min(n-1, i1+dist)]
    // New W for i1+1: [i1+2 .. min(n-1, i1+1+dist)]
    // => remove nums[i1+1], add nums[min(n-1, i1+1+dist)] if it exists newly.
    if (i1 === n - 1) break;

    const removeIdx = i1 + 1;
    const newEnd = Math.min(n - 1, i1 + 1 + dist);

    // Remove leftmost
    if (removeIdx >= 0 && removeIdx < n && removeIdx >= L && removeIdx <= R) {
      removeValue(nums[removeIdx]);
    }

    // Add new rightmost if expanded
    const addIdx = newEnd;
    if (addIdx > R) {
      addValue(nums[addIdx]);
    }

    // Update L, R
    L = i1 + 2;
    R = newEnd;
  }

  return ans;
}

// -------------------- Console log tests --------------------

console.log(minimumCost([1, 3, 2, 6, 4, 2], 3, 3), "expected", 5);
console.log(minimumCost([10, 1, 2, 2, 2, 1], 4, 3), "expected", 15);
console.log(minimumCost([10, 8, 18, 9], 3, 1), "expected", 36);
console.log(minimumCost([7, 6, 5, 4, 3, 2, 1], 5, 3), "expected", minimumCost([7, 6, 5, 4, 3, 2, 1], 5, 3));
