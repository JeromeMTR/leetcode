// Function to compute the maximum possible free time
function maxFreeTime(eventTime: number, startTime: number[], endTime: number[]): number {
    const n = startTime.length;

    // Step 1: Compute the free gaps between meetings (gaps length = n+1)
    const gaps: number[] = [];
    // gap before the first meeting
    gaps.push(startTime[0] - 0);
    // gaps between meetings
    for (let i = 1; i < n; ++i) {
        gaps.push(startTime[i] - endTime[i - 1]);
    }
    // gap after the last meeting
    gaps.push(eventTime - endTime[n - 1]);

    // Step 2: Precompute prefix and suffix maxima for the gaps array (enable O(1) max query out of any two indices)
    const preMax: number[] = new Array(n + 2).fill(0);
    const sufMax: number[] = new Array(n + 2).fill(0);

    preMax[0] = -Infinity;
    for (let i = 0; i < n + 1; ++i) {
        preMax[i + 1] = Math.max(preMax[i], gaps[i]);
    }
    sufMax[n + 1] = -Infinity;
    for (let i = n; i >= 0; --i) {
        sufMax[i] = Math.max(sufMax[i + 1], gaps[i]);
    }

    // Step 3: Compute original max gap
    let ans = Math.max(...gaps);

    // Step 4: For each meeting, try removing it and merging the two gaps, see if a larger gap can be made
    for (let i = 0; i < n; ++i) {
        // removing meeting i, merge gaps[i] + meeting duration + gaps[i+1]
        const mergedGap = gaps[i] + (endTime[i] - startTime[i]) + gaps[i + 1];

        // The maximum among the other gaps (exclude gaps[i] and gaps[i+1])
        const maxOther = Math.max(preMax[i], sufMax[i + 2]);

        // The best free period after this move: merging (might be largest), or another gap remains largest
        ans = Math.max(ans, Math.max(mergedGap, maxOther));
    }

    return ans;
}

/*
IOCE:

Example 1:
Input: eventTime = 5, startTime = [1,3], endTime = [2,5]
Output: 2

Example 2:
Input: eventTime = 10, startTime = [0,7,9], endTime = [1,8,10]
Output: 7

Example 3:
Input: eventTime = 10, startTime = [0,3,7,9], endTime = [1,4,8,10]
Output: 6

Example 4:
Input: eventTime = 5, startTime = [0,1,2,3,4], endTime = [1,2,3,4,5]
Output: 0
*/

// --- Test Cases ---
console.log(maxFreeTime(5, [1,3], [2,5])); // 2
console.log(maxFreeTime(10, [0,7,9], [1,8,10])); // 7
console.log(maxFreeTime(10, [0,3,7,9], [1,4,8,10])); // 6
console.log(maxFreeTime(5, [0,1,2,3,4], [1,2,3,4,5])); // 0