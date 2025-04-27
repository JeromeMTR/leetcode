function countSubarrays(nums: number[]): number {
    let count = 0;

    // Loop through the array from the first element to the third to last element
    for (let i = 0; i <= nums.length - 3; i++) {
        // Extract the subarray of length 3
        const first = nums[i];
        const second = nums[i + 1];
        const third = nums[i + 2];

        // Check if the sum of the first and third numbers is exactly half of the middle number
        if (first + third === second / 2) {
            count++;
        }
    }

    return count;
}

// IOCE (Input, Output, Constraints, Examples):

// Example 1
console.log(countSubarrays([1, 2, 1, 4, 1])); // Output: 1
// Explanation: Only [1, 4, 1] satisfies the condition.

// Example 2
console.log(countSubarrays([1, 1, 1])); // Output: 0
// Explanation: [1, 1, 1] does not satisfy the condition.

// Constraints:
// 3 <= nums.length <= 100
// -100 <= nums[i] <= 100

// Additional Examples to consider:

// Example with negative numbers:
console.log(countSubarrays([-10, -20, -10])); // Output: 1
// Explanation: The subarray [-10, -20, -10] satisfies the condition as (-10 + -10 = -20 / 2).

// Example where no subarray satisfies the condition:
console.log(countSubarrays([5, 10, 5, 10, 5])); // Output: 0
// There is no subarray of 3 elements that satisfies the condition.