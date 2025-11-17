// IOCE (Input, Output, Constraints, Edge Cases)
// Input: nums: number[] (binary array), k: number
// Output: boolean (true if all 1s are at least k places apart, otherwise false)
// Constraints:
//   - 1 <= nums.length <= 10^5
//   - 0 <= k <= nums.length
//   - nums[i] is 0 or 1
// Edge cases:
//   - No 1s or only one 1: should return true
//   - k=0: any spacing is allowed, always true
//   - k >= nums.length: only true if at most one 1

function kLengthApart(nums: number[], k: number): boolean {
    // If k is zero, all 1s are always at least 0 apart
    if (k === 0) return true;

    // lastPos: the index of the last seen 1, initialize to -k-1 so that the first 1 is always "k apart" from -1
    let lastPos = -k - 1;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 1) {
            // If the distance from last 1 is less than k, return false
            if (i - lastPos - 1 < k) {
                return false;
            }
            lastPos = i; // Update lastPos to current index
        }
    }
    return true;
}