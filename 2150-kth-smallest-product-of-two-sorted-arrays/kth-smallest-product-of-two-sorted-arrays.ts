/**
 * Find the k-th (1-based) smallest product from all products of pairs of elements
 * from two sorted arrays nums1 and nums2.
 *
 * IOCE
 * Input:  nums1: number[] (sorted)
 *         nums2: number[] (sorted)
 *         k: number (1 <= k <= nums1.length*nums2.length)
 * Output: number (k-th smallest product)
 */
function kthSmallestProduct(nums1: number[], nums2: number[], k: number): number {
    // Helper: count number of pairs (i,j) such that nums1[i] * nums2[j] <= x
    function countLE(x: number): number {
        let count = 0;
        for (const a of nums1) {
            if (a === 0) {
                // Product is 0
                if (x >= 0) {
                    count += nums2.length; // All products are <= x if x >= 0
                }
                // else none
            } else if (a > 0) {
                // For positive a, we want nums2[j] <= x / a
                let left = 0, right = nums2.length;
                // Find rightmost index where nums2[j] <= x / a
                while (left < right) {
                    const mid = left + Math.floor((right - left) / 2);
                    if (nums2[mid] <= x / a) {
                        left = mid + 1;
                    } else {
                        right = mid;
                    }
                }
                // left is the count of nums2[0..left-1] with nums2[j] <= x / a
                count += left;
            } else { // a < 0
                // For negative a, we want nums2[j] >= ceil(x / a)
                let left = 0, right = nums2.length;
                // Find leftmost index where nums2[j] >= x / a
                while (left < right) {
                    const mid = left + Math.floor((right - left) / 2);
                    if (nums2[mid] >= x / a) {
                        right = mid;
                    } else {
                        left = mid + 1;
                    }
                }
                // All nums2[j] from left to end satisfy nums2[j] >= x / a
                count += nums2.length - left;
            }
        }
        return count;
    }

    // Binary search the possible product value (lo ... hi) where answer lies.
    // Possible bounds: min(nums1)*min(nums2), max(nums1)*max(nums2), etc
    let lo = -1e10, hi = 1e10;
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        const cnt = countLE(mid);
        if (cnt >= k) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
}

// Comments
// - The countLE function does a per-value binary search over nums2, O(N log M)
// - The outer binary search does O(log(range)) ~ O(64); performant for large inputs

// EXAMPLES:
// Example 1
console.log(kthSmallestProduct([2, 5], [3, 4], 2)); // 8

// Example 2
console.log(kthSmallestProduct([-4, -2, 0, 3], [2, 4], 6)); // 0

// Example 3
console.log(kthSmallestProduct([-2, -1, 0, 1, 2], [-3, -1, 2, 4, 5], 3)); // -6