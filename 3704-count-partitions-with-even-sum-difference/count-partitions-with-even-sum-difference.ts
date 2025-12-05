// Function to count the number of partitions where the difference between
// the sum of the left and right subarrays is even.
function countEvenSumPartitions(nums: number[]): number {
    const n = nums.length;
    let totalSum = 0;
    // Compute total sum of the array
    for (let num of nums) {
        totalSum += num;
    }

    let leftSum = 0;
    let count = 0;
    // Try every possible partition point i (0 <= i < n-1)
    for (let i = 0; i < n - 1; ++i) {
        leftSum += nums[i];
        // rightSum = totalSum - leftSum
        // diff = leftSum - rightSum = 2*leftSum - totalSum
        // So, diff is even <=> (2*leftSum - totalSum) % 2 === 0
        // => totalSum and leftSum must have same parity (even/odd)
        if ((leftSum % 2) === (totalSum % 2)) {
            count++;
        }
    }
    return count;
}

// IOCE - Input, Output, Constraints, Examples

// Example 1:
console.log(countEvenSumPartitions([10,10,3,7,6])); // Output: 4

// Example 2:
console.log(countEvenSumPartitions([1,2,2])); // Output: 0

// Example 3:
console.log(countEvenSumPartitions([2,4,6,8])); // Output: 3

// Failed test case checks:
console.log(countEvenSumPartitions([3,1,2,1])); // Expected: 3

console.log(countEvenSumPartitions([1,2,1,2,1,2])); // Expected: 4

console.log(countEvenSumPartitions([1,1,3,3,3,4,4,4,5,5])); // Expected: 4