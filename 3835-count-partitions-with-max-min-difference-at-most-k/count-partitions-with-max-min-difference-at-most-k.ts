// TypeScript implementation for partitioning nums into contiguous segments 
// such that in each segment, max - min <= k. Returns count % 1e9+7

const MOD = 1_000_000_007;

function countPartitions(nums: number[], k: number): number {
    const n = nums.length;
    const dp = new Array(n + 1).fill(0);  // dp[i]: number of ways to partition first i elements
    dp[0] = 1;  // base: empty array is a valid (prefix for DP)

    // For sliding window min/max, use deques:
    let l = 0;
    let rmqMax: number[] = [];
    let rmqMin: number[] = [];
    
    for (let r = 0; r < n; r++) {
        // Maintain max deque (monotonically decreasing)
        while (rmqMax.length && nums[rmqMax[rmqMax.length - 1]] <= nums[r]) {
            rmqMax.pop();
        }
        rmqMax.push(r);

        // Maintain min deque (monotonically increasing)
        while (rmqMin.length && nums[rmqMin[rmqMin.length - 1]] >= nums[r]) {
            rmqMin.pop();
        }
        rmqMin.push(r);

        // Shift left pointer so that current window [l, r] is valid
        while (
            rmqMax.length && rmqMin.length &&
            nums[rmqMax[0]] - nums[rmqMin[0]] > k
        ) {
            l++;
            // Remove indices out of window
            if (rmqMax[0] < l) rmqMax.shift();
            if (rmqMin[0] < l) rmqMin.shift();
        }

        // dp[r+1]: ways to partition nums[0..r]
        // We can take a segment [i, r], where l <= i <= r
        // So sum dp[i] (i from l to r)
        // To speed up the sum, keep prefix sums
        // preSum[i] = dp[0] + ... + dp[i-1], so dp[i] = preSum[i+1] - preSum[i]
        // We'll build preSum on the fly:

        // Precompute prefix sum
        // Actually, let's directly use a running prefix sum:
        // We need sum of dp[l]...dp[r]
        // We can keep a prefix sum array to get sum in O(1)

        if (r == 0) {
            dp[r + 1] = 1; // Segment [0] is always valid
        } else {
            // We'll rebuild prefix sum on the fly lazily in outer scope
            // But let's do it here correctly:
            // Let's build preSum so that preSum[0]=0, preSum[i]=dp[0..i-1] sum
            // so dp[i]=preSum[i+1]-preSum[i]
            // For dp[r+1], we need sum of dp[l..r]
            // i.e., preSum[r+1]-preSum[l]

            // Let's do prefix sum on the fly

            // We'll only build preSum up to r+1 as we go
            // Let's build it outside and update it as we fill dp
            // (see below for code).
        }
    }

    // Let's rewrite to include prefix sum array
    const preSum = new Array(n + 2).fill(0); // preSum[i]: sum of dp[0..i-1]
    preSum[0] = 0;
    preSum[1] = 1;
    l = 0;
    rmqMax = [];
    rmqMin = [];
    for (let r = 0; r < n; r++) {
        // Maintain max deque (monotonically decreasing)
        while (rmqMax.length && nums[rmqMax[rmqMax.length - 1]] <= nums[r]) {
            rmqMax.pop();
        }
        rmqMax.push(r);

        // Maintain min deque (monotonically increasing)
        while (rmqMin.length && nums[rmqMin[rmqMin.length - 1]] >= nums[r]) {
            rmqMin.pop();
        }
        rmqMin.push(r);

        // Shift left pointer so that current window [l,r] is valid
        while (
            rmqMax.length && rmqMin.length &&
            nums[rmqMax[0]] - nums[rmqMin[0]] > k
        ) {
            l++;
            if (rmqMax[0] < l) rmqMax.shift();
            if (rmqMin[0] < l) rmqMin.shift();
        }

        // dp[r+1]: ways to partition nums[0..r]
        // options: segment [i...r], where l <= i <= r, so dp[i] for l <= i <= r
        // Use prefix sum to get the sum fast:
        // sum = preSum[r+1] - preSum[l]
        dp[r + 1] = (preSum[r + 1] - preSum[l] + MOD) % MOD;
        preSum[r + 2] = (preSum[r + 1] + dp[r + 1]) % MOD;
    }

    return dp[n];
}

/*
IOCE

Example 1:
Input: nums = [9,4,1,3,7], k = 4
Output: 6

Example 2:
Input: nums = [3,3,4], k = 0
Output: 2

Counter-example:
Input: nums = [3,1,2,1], k = 1
Output: 3

Input: nums = [1,2,1,2,1,2], k = 0
Output: 4

Edge:
Input: [1,1,3,3,3,4,4,4,5,5], k=1
Output: 4
*/