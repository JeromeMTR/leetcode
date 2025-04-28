function countSubarrays(nums: number[], k: number): number {
    let count = 0;
    let left = 0;
    let currentSum = 0;

    // Iterate through the array with the right pointer
    for (let right = 0; right < nums.length; right++) {
        // Add the current element to the current sum
        currentSum += nums[right];

        // Adjust the left pointer to maintain the score condition
        while (currentSum * (right - left + 1) >= k) {
            // If the score is not less than k, move left pointer
            currentSum -= nums[left];
            left++;
        }

        // All subarrays ending at 'right' and starting from 'left' to 'right'
        // have scores less than k
        count += (right - left + 1);
    }

    return count;
}

// Input/Output examples (IOCE)
// Example 1:
const nums1 = [2, 1, 4, 3, 5];
const k1 = 10;
console.log(countSubarrays(nums1, k1)); // Output: 6

// Example 2:
const nums2 = [1, 1, 1];
const k2 = 5;
console.log(countSubarrays(nums2, k2)); // Output: 5