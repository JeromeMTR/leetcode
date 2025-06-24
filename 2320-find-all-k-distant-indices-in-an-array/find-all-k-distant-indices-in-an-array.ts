/**
 * Finds all k-distant indices in a given array.
 *
 * @param nums - The array of integers.
 * @param key - The value to look for within k distance.
 * @param k - The max allowed distance from a 'key' occurrence.
 * @returns Sorted array of all k-distant indices.
 */
function findKDistantIndices(nums: number[], key: number, k: number): number[] {
    const n = nums.length;
    const ansSet = new Set<number>();
    
    // Step 1: Find all indices where nums[j] == key
    for (let j = 0; j < n; ++j) {
        if (nums[j] === key) {
            // Step 2: For each key index 'j', mark all indices in range [j-k, j+k]
            for (let i = Math.max(0, j - k); i <= Math.min(n - 1, j + k); ++i) {
                ansSet.add(i);
            }
        }
    }
    
    // Convert set to sorted array and return
    return Array.from(ansSet).sort((a, b) => a - b);
}

/* =========================== IOCE ============================ */
// Input-Output-Constraints-Example

// Example 1
const nums1 = [3,4,9,1,3,9,5], key1 = 9, k1 = 1;
// Output: [1,2,3,4,5,6]
console.log(findKDistantIndices(nums1, key1, k1)); // [1,2,3,4,5,6]

// Example 2
const nums2 = [2,2,2,2,2], key2 = 2, k2 = 2;
// Output: [0,1,2,3,4]
console.log(findKDistantIndices(nums2, key2, k2)); // [0,1,2,3,4]

// Custom Example 3
const nums3 = [1,2,3,4,5], key3 = 1, k3 = 1;
// Only idx 0 is 'key', covers indices 0, 1
console.log(findKDistantIndices(nums3, key3, k3)); // [0,1]

// Custom Example 4
const nums4 = [1,2,3,1,2,3], key4 = 3, k4 = 2;
// key at 2, 5. For 2: coverage [0,4], for 5: [3,5], combined [0,1,2,3,4,5]
console.log(findKDistantIndices(nums4, key4, k4)); // [0,1,2,3,4,5]

/*
Constraints:
- 1 <= nums.length <= 1000
- 1 <= nums[i] <= 1000
- key is present in nums
- 1 <= k <= nums.length
*/