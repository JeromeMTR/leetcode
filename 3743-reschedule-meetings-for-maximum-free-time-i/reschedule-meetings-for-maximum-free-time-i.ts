// TypeScript implementation for maximizing the longest continuous free period
// by rescheduling at most k meetings in the given constraints.

/*
IOCE:

Input:
eventTime: number // Duration of the event [0 ... eventTime]
k: number // Max meetings you can reschedule
startTime: number[] // start times of meetings (sorted, non-overlapping)
endTime: number[] // end times of meetings (sorted, non-overlapping)

Output:
number // maximum length of a continuous free time after rescheduling at most k meetings

Example:
Input: eventTime = 5, k = 1, startTime = [1,3], endTime = [2,5]
Output: 2

Input: eventTime = 10, k = 1, startTime = [0,2,9], endTime = [1,4,10]
Output: 6

Input: eventTime = 5, k = 2, startTime = [0,1,2,3,4], endTime = [1,2,3,4,5]
Output: 0
*/

function maxFreeTime(
    eventTime: number,
    k: number,
    startTime: number[],
    endTime: number[]
): number {
    const n = startTime.length;

    // Compute all gaps between meetings, plus before first and after last
    const gaps: number[] = [];
    // Gap before first meeting
    gaps.push(startTime[0]);
    // Gaps between adjacent meetings
    for (let i = 0; i < n - 1; ++i) {
        gaps.push(startTime[i + 1] - endTime[i]);
    }
    // Gap after last meeting
    gaps.push(eventTime - endTime[n - 1]);

    // The main step: For all possible slots of `n-k` consecutive meetings,
    // The corresponding `k+1` gaps (adjacent to these scheduled meetings) can be made continuous by rescheduling at most k meetings.
    // So, we slide a window of size `k+1` on the gaps array to find the maximum sum.
    // (Think: If we group `n-k` meetings together, the free period spanning the `k+1` adjacent gaps can be made into a single large block by rescheduling the rest.)

    let maxFree = 0;
    let windowSum = 0;
    const windowSize = k + 1;

    // Calculate initial window sum
    for (let i = 0; i < Math.min(windowSize, gaps.length); ++i) {
        windowSum += gaps[i];
    }
    maxFree = windowSum;

    // Slide the window
    for (let i = windowSize; i < gaps.length; ++i) {
        windowSum += gaps[i] - gaps[i - windowSize];
        maxFree = Math.max(maxFree, windowSum);
    }

    // Clamp to non-negative
    return Math.max(0, maxFree);
}

// =====================
// Example Test Cases
// =====================

console.log(maxFreeTime(5, 1, [1, 3], [2, 5])); // 2
console.log(maxFreeTime(10, 1, [0, 2, 9], [1, 4, 10])); // 6
console.log(maxFreeTime(5, 2, [0, 1, 2, 3, 4], [1, 2, 3, 4, 5])); // 0

// Additional edge case
console.log(maxFreeTime(10, 3, [1, 2, 3, 5, 6, 8], [1, 3, 5, 6, 8, 10])); // 5

/*
Time Complexity: O(n)
Space Complexity: O(n)
Explanation:
- Precompute gaps in O(n)
- Sliding window in O(n)
*/