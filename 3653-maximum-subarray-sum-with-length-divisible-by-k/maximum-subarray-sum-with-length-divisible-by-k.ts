// Function to find the maximum sum of subarray whose size is divisible by k
function maxSumDivisibleSubarray(nums: number[], k: number): number {
    // Calculate prefix sum array
    const n = nums.length;
    const prefix: number[] = new Array(n + 1).fill(0);
    for (let i = 0; i < n; ++i) {
        prefix[i + 1] = prefix[i] + nums[i];
    }

    // For each "modulo" of subarray starts, keep the minimum prefix sum seen so far at that modulo.
    // For any i, to form a subarray whose length is divisible by k, 
    // the difference of (i) and (j) (start of subarray) must be divisible by k
    // That is, we want to find j < i with (i - j) % k == 0 <=> i % k == j % k
    const minPrefix: number[] = new Array(k).fill(Infinity);
    minPrefix[0] = 0; // Prefix of length 0 with sum 0

    let answer = -Infinity;
    for (let i = 1; i <= n; ++i) {
        const mod = i % k;
        // dp: try to find a start j with j%k==i%k, so that (prefix[i] - prefix[j]) is biggest
        // Actually, for max sum, we want to minimize prefix[j]
        if (minPrefix[mod] !== Infinity) {
            answer = Math.max(answer, prefix[i] - minPrefix[mod]);
        }
        minPrefix[mod] = Math.min(minPrefix[mod], prefix[i]);
    }

    return answer;
}

/*
IOCE

Input: nums = [1,2], k = 1
Output: 3
console.log(maxSumDivisibleSubarray([1,2], 1)); // 3

Input: nums = [-1,-2,-3,-4,-5], k = 4
Output: -10
console.log(maxSumDivisibleSubarray([-1,-2,-3,-4,-5], 4)); // -10

Input: nums = [-5,1,2,-3,4], k = 2
Output: 4
console.log(maxSumDivisibleSubarray([-5,1,2,-3,4], 2)); // 4

Input: nums = [3,1,2,1], k = 3
Output: 3
console.log(maxSumDivisibleSubarray([3,1,2,1], 3)); // 3

Input: nums = [1,2,1,2,1,2], k = 4
Output: 4
console.log(maxSumDivisibleSubarray([1,2,1,2,1,2], 4)); // 4

Input: nums = [1,1,3,3,3,4,4,4,5,5], k = 4
Output: 4
console.log(maxSumDivisibleSubarray([1,1,3,3,3,4,4,4,5,5], 4)); // 4
*/