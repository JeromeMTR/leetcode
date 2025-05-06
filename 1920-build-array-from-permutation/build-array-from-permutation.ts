function buildArray(nums: number[]): number[] {
    const ans: number[] = new Array(nums.length);
    for (let i = 0; i < nums.length; i++) {
        ans[i] = nums[nums[i]];
    }
    return ans;
}

// IOCE examples for testing

// Example 1
console.log(buildArray([0, 2, 1, 5, 3, 4])); // Output: [0, 1, 2, 4, 5, 3]

// Example 2
console.log(buildArray([5, 0, 1, 2, 3, 4])); // Output: [4, 5, 0, 1, 2, 3]

// Edge Case: Minimum length permutation
console.log(buildArray([0])); // Output: [0]