/**
 * Finds the minimum possible value for the maximum difference among `p` pairs,
 * each pair with diff <= target, and each index used at most once.
 * @param nums - The array of numbers.
 * @param p - The number of pairs.
 * @return The minimum possible maximum difference.
 */
function minimizeMax(nums: number[], p: number): number {
    // Sort nums. This allows greedy pairing of closest values.
    nums.sort((a, b) => a - b);

    // Helper function to count how many valid pairs can be made with <='maxDiff'
    function countPairs(maxDiff: number): number {
        let count = 0;
        let i = 1;
        while (i < nums.length) {
            if (nums[i] - nums[i-1] <= maxDiff) {
                count++;
                i += 2; // Skip both indices as both are used
            } else {
                i += 1;
            }
        }
        return count;
    }

    // Binary search for the answer
    let left = 0, right = 1_000_000_000;
    let res = right;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const pairs = countPairs(mid);
        if (pairs >= p) {
            // Possible to make p pairs with max diff = mid, try smaller
            res = mid;
            right = mid - 1;
        } else {
            // Too small - need to allow larger differences
            left = mid + 1;
        }
    }
    return res;
}

// --- Example IO/TestCase ---

// Example 1
const nums1 = [10,1,2,7,1,3], p1 = 2;
console.log(minimizeMax(nums1, p1)); // Output: 1

// Example 2
const nums2 = [4,2,1,2], p2 = 1;
console.log(minimizeMax(nums2, p2)); // Output: 0

// Edge: No pairs (p=0)
const nums3 = [42, 17, 6], p3 = 0;
console.log(minimizeMax(nums3, p3)); // Output: 0