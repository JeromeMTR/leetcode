// IOCE as comments

// Input: nums = [1,2,2,3,3,4], k = 2
// Output: 6
// Explanation: By modifying elements as follows, we can get 6 distinct values: [-1,0,1,2,3,4].

// Input: nums = [4,4,4,4], k = 1
// Output: 3
// Explanation: [3,4,5] (by changing two 4's to 3 and 5)

function maxDistinctElements(nums: number[], k: number): number {
    // Sort the array to process elements in ascending order
    nums.sort((a, b) => a - b);
    // Counter for distinct elements we can create
    let cnt = 0;
    // Track the previous distinct value to avoid duplicates
    let prev = -Number.MAX_SAFE_INTEGER;

    for (const num of nums) {
        // Calculate the optimal value for current element within [num-k, num+k] range
        // We want the smallest possible value that's greater than prev
        const curr = Math.min(Math.max(num - k, prev + 1), num + k);
        // If we can create a distinct value greater than previous
        if (curr > prev) {
            cnt++; // Increment count of distinct elements
            prev = curr; // Update previous value for next iteration
        }
    }
    return cnt;
}