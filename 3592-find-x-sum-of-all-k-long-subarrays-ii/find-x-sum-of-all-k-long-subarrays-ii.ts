// npm install @datastructures-js/binary-search-tree
import { AvlTree } from "@datastructures-js/binary-search-tree";

// Define a type for our frequency-entry pairs:
// [frequency, value]
type FreqPair = [number, number];

/**
 * Helper class to manage top-x frequent numbers in a window.
 *
 * Maintains 2 AVL trees:
 *   - large: Top-x freq/value pairs
 *   - small: All others, by same order
 * Also tracks the running x-sum ("result").
 */
class Helper {
  private x: number;
  private result: bigint = 0n;
  private large: AvlTree<FreqPair>;
  private small: AvlTree<FreqPair>;
  private occ: Map<number, number>; // num -> freq

  constructor(x: number) {
    this.x = x;

    // Sort first by frequency, then by value DESC (because bigger value breaks ties).
    // (Note: Our large tree needs maxes by this order!)
    const comparator = (a: FreqPair, b: FreqPair): number =>
      a[0] === b[0] ? a[1] - b[1] : a[0] - b[0];

    this.large = new AvlTree<FreqPair>(comparator);
    this.small = new AvlTree<FreqPair>(comparator);
    this.occ = new Map<number, number>();
  }

  // Insert a number into running window.
  insert(num: number) {
    // Update frequency map.
    const freq = (this.occ.get(num) ?? 0);

    // If already present, remove old entry.
    if (freq > 0) {
      this.internalRemove([freq, num]);
    }

    // Now add with new frequency.
    const newFreq = freq + 1;
    this.occ.set(num, newFreq);
    this.internalInsert([newFreq, num]);
  }

  // Remove a number from running window.
  remove(num: number) {
    const freq = this.occ.get(num);
    if (freq === undefined || freq === 0) return;

    this.internalRemove([freq, num]);
    if (freq - 1 > 0) {
      this.occ.set(num, freq - 1);
      this.internalInsert([freq - 1, num]);
    } else {
      this.occ.delete(num);
    }
  }

  // Get the current "x-sum".
  get(): number {
    return Number(this.result);
  }

  // Place element into either large or small tree (rebalancing if needed).
  private internalInsert(pair: FreqPair) {
    const minLarge = this.large.min();

    // If large not full or this would rank in the top x
    if (
      this.large.count() < this.x ||
      (minLarge &&
        this.comparePairs(pair, minLarge.getValue()) > 0)
    ) {
      // Add to large, add its contribution to result.
      this.result += BigInt(pair[0]) * BigInt(pair[1]);
      this.large.insert(pair);

      // If too many in large, push the least to small.
      if (this.large.count() > this.x) {
        const minEntry = this.large.min()!;
        const toDemote = minEntry.getValue();
        this.result -= BigInt(toDemote[0]) * BigInt(toDemote[1]);
        this.large.remove(toDemote);
        this.small.insert(toDemote);
      }
    } else {
      // Not enough to be in top-x, put in small.
      this.small.insert(pair);
    }
  }

  // Remove a (frequency, value) entry from proper tree, rebalance if needed.
  private internalRemove(pair: FreqPair) {
    if (this.large.has(pair)) {
      this.result -= BigInt(pair[0]) * BigInt(pair[1]);
      this.large.remove(pair);
      if (this.small.count() > 0) {
        // Move the next most qualified from small up to large.
        const maxSmall = this.small.max()!;
        const toPromote = maxSmall.getValue();
        this.result += BigInt(toPromote[0]) * BigInt(toPromote[1]);
        this.small.remove(toPromote);
        this.large.insert(toPromote);
      }
    } else {
      this.small.remove(pair);
    }
  }

  // Custom pair comparison: [freq, value]. Higher freq breaks ties via higher value.
  private comparePairs(a: FreqPair, b: FreqPair): number {
    return a[0] === b[0] ? a[1] - b[1] : a[0] - b[0];
  }
}

/**
 * Main function to compute x-sums for each window.
 * @param nums - the input array
 * @param k - window size
 * @param x - number of top frequent values to keep
 * @returns number[] of x-sums per window
 */
function findXSum(nums: number[], k: number, x: number): number[] {
  const ans: number[] = [];
  const helper = new Helper(x);

  for (let i = 0; i < nums.length; ++i) {
    helper.insert(nums[i]);

    if (i >= k) helper.remove(nums[i - k]);

    if (i >= k - 1) ans.push(helper.get());
  }
  return ans;
}

/***********************
 * IOCE (Example Usage) *
 ***********************/

// Example 1:
const nums1 = [1, 1, 2, 2, 3, 4, 2, 3], k1 = 6, x1 = 2;
console.log(findXSum(nums1, k1, x1));
// Output: [6,10,12]
// Explanation:
// [1,1,2,2,3,4]   => allow top 2 frequent: 1 (2), 2 (2), sum: 1+1+2+2=6
// [1,2,2,3,4,2]   => freq: 2(3), 1(1), 3(1), 4(1), top2=2:2,4:1 -> sum: 2+2+2+4=10
// [2,2,3,4,2,3]   => 2(3), 3(2), 4(1): top2=2,3 => 2+2+2+3+3=12

// Example 2:
const nums2 = [3,8,7,8,7,5], k2 = 2, x2 = 2;
console.log(findXSum(nums2, k2, x2));
// Output: [11, 15, 15, 15, 12]
// All windows size 2, so always sum the window

/*****************
 * Constraints satisfied:
 * 1<=n<=1e5, 1<=nums[i]<=1e9, 1<=x<=k<=n
 *****************/