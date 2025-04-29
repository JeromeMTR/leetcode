function countSubarrays(nums: number[], k: number): number {
    let count = 0;
    const n = nums.length;
    
    // Iterate over each possible starting point of the subarray
    for (let start = 0; start < n; start++) {
        let maxVal = nums[start];
        let maxCount = 0;
        
        // Iterate over each possible ending point of the subarray
        for (let end = start; end < n; end++) {
            // Update the maximum element seen so far in this subarray
            if (nums[end] > maxVal) {
                maxVal = nums[end];
                maxCount = 0;  // Reset count because we found a new max
            }
            
            // Increment the count of the max element if it matches
            if (nums[end] === maxVal) {
                maxCount++;
            }
            
            // If the max element appears at least k times, increment the result
            if (maxCount >= k) {
                count++;
            }
        }
    }
    
    return count;
}

// IOCE (Input-Output-Constraints-Edge Cases):

// Example 1
// Input: nums = [1, 3, 2, 3, 3], k = 2
// Output: 6
// Explanation: The subarrays that contain the element 3 at least 2 times are: [1,3,2,3], [1,3,2,3,3], [3,2,3], [3,2,3,3], [2,3,3], and [3,3].

// Example 2
// Input: nums = [1, 4, 2, 1], k = 3
// Output: 0
// Explanation: No subarray contains the element 4 at least 3 times.

// Test case where no subarray can have a maximum element k times since k is larger than array size
// Input: nums = [1, 2, 3], k = 4
// Output: 0

// Test case where nums contains one element repeated
// Input: nums = [5, 5, 5], k = 2
// Output: 3 
// Explanation: All subarrays [5,5], [5,5,5], and [5,5] contain max element 5 at least 2 times.

// Test case where k is 1 (every subarray contains its max element at least 1 time reasoned by its own definition)
// Input: nums = [1, 2, 3], k = 1
// Output: 6
// Explanation: All subarrays are valid because each maximum element appears 1 time.