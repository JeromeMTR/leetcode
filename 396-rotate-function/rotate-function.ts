/*
IOCE

Inputs
   - nums: number[]
     An integer array of length n.

Outputs
   - number
     The maximum value among all rotation function values:
     F(0), F(1), ..., F(n - 1)

Constraints
   - 1 <= nums.length <= 100000
   - -100 <= nums[i] <= 100
   - Answer fits in a 32-bit integer
   Time Complexity
   - O(n)
   Space Complexity
   - O(1)

Edge Cases
   - n = 1 -> only one rotation, answer is always 0
   - All numbers are same
   - Negative values in nums
   - Maximum answer may come from any rotation
   - Large n, so brute force rotation computation is too slow
*/

function maxRotateFunction(nums: number[]): number {
    const n = nums.length;

    // Compute total sum of nums and F(0)
    let sum = 0;
    let current = 0; // current rotation function value

    for (let i = 0; i < n; i++) {
        sum += nums[i];
        current += i * nums[i];
    }

    let answer = current;

    // Use recurrence:
    // F(k) = F(k - 1) + sum - n * nums[n - k]
    for (let k = 1; k < n; k++) {
        current = current + sum - n * nums[n - k];
        answer = Math.max(answer, current);
    }

    return answer;
}


// Console log tests
console.log(maxRotateFunction([4, 3, 2, 6])); // 26
console.log(maxRotateFunction([100])); // 0
console.log(maxRotateFunction([1, 2, 3, 4, 5])); // Expected: 40
console.log(maxRotateFunction([-1, -2, -3])); // Expected: -5
console.log(maxRotateFunction([0, 0, 0])); // 0
console.log(maxRotateFunction([10, -10, 10, -10])); // test mixed values
