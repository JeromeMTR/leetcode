function maxSumUniqueSubarray(nums: number[]): number {
    // Store the unique elements with their presence in nums
    const uniqueNums = new Set(nums);

    // Filter out negative numbers; if all are negative, fallback handled later
    const positives = Array.from(uniqueNums).filter(x => x > 0);

    if (positives.length > 0) {
        // If there is at least one positive (or zero), sum them
        return positives.reduce((a, b) => a + b, 0);
    } else {
        // All numbers are negative, so pick the maximum single value
        return Math.max(...nums);
    }
}

// IOCE (Input, Output, Comment, Example)

// Example 1:
console.log(maxSumUniqueSubarray([1,2,3,4,5])); // Output: 15
// All values are unique and positive, sum is 15

// Example 2:
console.log(maxSumUniqueSubarray([1,1,0,1,1])); // Output: 1
// Only unique values are 1 and 0; only 1 is positive
// sum: 1

// Example 3:
console.log(maxSumUniqueSubarray([1,2,-1,-2,1,0,-1])); // Output: 3
// Unique values: 1,2,-1,-2,0
// Positives are 1,2,0 -> sum is 1+2+0=3

// Example 4: All negatives
console.log(maxSumUniqueSubarray([-2,-3,-4,-2,-4])); // Output: -2
// All numbers negative, pick the least negative: -2

// Example 5: Including zero and negatives
console.log(maxSumUniqueSubarray([0,0,-2,-1])); // Output: 0
// Unique values: 0,-2,-1; 0 is non-negative, sum: 0