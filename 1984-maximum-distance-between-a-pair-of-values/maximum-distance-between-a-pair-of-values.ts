/*
IOCE

Inputs:
- nums1: non-increasing integer array
- nums2: non-increasing integer array

Output:
- Return the maximum distance (j - i) among all valid pairs (i, j)
  such that:
  1) 0 <= i < nums1.length
  2) 0 <= j < nums2.length
  3) i <= j
  4) nums1[i] <= nums2[j]
- If no valid pair exists, return 0

Constraints:
- 1 <= nums1.length, nums2.length <= 1e5
- 1 <= nums1[i], nums2[j] <= 1e5
- Both arrays are non-increasing

Time Complexity:
- Linear

Space Complexity:
- O(1)

Edge Cases:
- No valid pair exists -> return 0
- Arrays of length 1
- All pairs valid
- Only pairs with i == j are valid
- nums1.length > nums2.length or nums2.length > nums1.length
*/

function maxDistance(nums1: number[], nums2: number[]): number {
    let i = 0;
    let j = 0;
    let ans = 0;

    while (i < nums1.length && j < nums2.length) {
        // j must be at least i for a valid pair
        if (j < i) {
            j = i;
            continue;
        }

        // Valid pair found
        if (nums1[i] <= nums2[j]) {
            ans = Math.max(ans, j - i);
            j++; // try to extend distance
        } else {
            i++; // need a smaller/equal nums1[i]
        }
    }

    return ans;
}

// Console log tests
console.log(maxDistance([55, 30, 5, 4, 2], [100, 20, 10, 10, 5])); // 2
console.log(maxDistance([2, 2, 2], [10, 10, 1])); // 1
console.log(maxDistance([30, 29, 19, 5], [25, 25, 25, 25, 25])); // 2
console.log(maxDistance([5], [4])); // 0
console.log(maxDistance([5], [5])); // 0
console.log(maxDistance([3, 2, 1], [10, 9, 8, 7])); // 3
console.log(maxDistance([10, 9, 8], [1, 1, 1])); // 0
