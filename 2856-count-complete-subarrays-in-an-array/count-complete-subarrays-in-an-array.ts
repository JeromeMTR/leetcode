function countCompleteSubarrays(nums: number[]): number {
    let n = nums.length;
    
    // Get a set of all distinct numbers in the array
    let allDistinct = new Set(nums);
    let distinctCount = allDistinct.size;
    
    let totalCompleteSubarrays = 0;
    
    // To find all complete subarrays, we can use a sliding window approach
    for (let start = 0; start < n; start++) {
        let windowSet = new Set<number>();
        
        for (let end = start; end < n; end++) {
            // Add the current number to the window set
            windowSet.add(nums[end]);
            
            // Check if the current window is a complete subarray
            // by comparing the size of windowSet with distinctCount
            if (windowSet.size === distinctCount) {
                totalCompleteSubarrays++;
            }
        }
    }
    
    return totalCompleteSubarrays;
}

// IOCE: Input, Output, Constraints, and Examples

// Example 1:
const nums1 = [1, 3, 1, 2, 2];
console.log(countCompleteSubarrays(nums1)); // Output: 4

// Example 2:
const nums2 = [5, 5, 5, 5];
console.log(countCompleteSubarrays(nums2)); // Output: 10

// Example 3: Minimum input size
const nums3 = [1];
console.log(countCompleteSubarrays(nums3)); // Output: 1

// Example 4: Distinct elements only
const nums4 = [1, 2, 3, 4];
console.log(countCompleteSubarrays(nums4)); // Output: 4 (every subarray of up to 4 elements is complete)

// Constraints are handled by the problem statement:
// 1 <= nums.length <= 1000 and 1 <= nums[i] <= 2000

// The solution complexity is O(n^2) due to the double loop, which is feasible for n up to 1000.