/**
 * Finds the maximum sum of values by attending up to k non-overlapping events.
 * @param events Array of [startDay, endDay, value].
 * @param k Maximum events to attend.
 * @returns Maximum sum possible.
 */
function maxValue(events: number[][], k: number): number {
    // Sort events by startDay, then by endDay
    events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

    // Memoization: dp[i][kLeft] -> best score we can get starting from i-th event, with kLeft events remaining
    const n = events.length;
    const memo: number[][] = Array.from({length: n}, () => Array(k + 1).fill(-1));

    // Binary search to find the earliest event whose startDay > endDay of current event
    function findNext(index: number): number {
        const target = events[index][1];
        let lo = index + 1, hi = n - 1, res = n;
        while (lo <= hi) {
            let mid = lo + ((hi - lo) >> 1);
            if (events[mid][0] > target) {
                res = mid;
                hi = mid - 1;
            } else {
                lo = mid + 1;
            }
        }
        return res;
    }

    /**
     * DP Helper function.
     * @param i Current event index
     * @param kLeft Remaining events to attend
     */
    function dp(i: number, kLeft: number): number {
        if (i === n || kLeft === 0) return 0;
        if (memo[i][kLeft] !== -1) return memo[i][kLeft];

        // Choice 1: skip current event
        let res = dp(i + 1, kLeft);

        // Choice 2: attend current event
        const nextIdx = findNext(i);
        res = Math.max(res, events[i][2] + dp(nextIdx, kLeft - 1));

        return memo[i][kLeft] = res;
    }

    return dp(0, k);
}

// -------- IOCE ----------

// I: Input, O: Output, C: Constraints, E: Examples

// I
const input1 = {
    events: [[1,2,4],[3,4,3],[2,3,1]],
    k: 2
};
const input2 = {
    events: [[1,2,4],[3,4,3],[2,3,10]],
    k: 2
};
const input3 = {
    events: [[1,1,1],[2,2,2],[3,3,3],[4,4,4]],
    k: 3
};
// Very large test case (stress test, may skip running on slow REPLs)
const input4 = {
    events: Array.from({length: 100000}, (_, i) => [i*2+1, i*2+2, 1]),
    k: 2
};

// O: Output for each input
console.log(maxValue(input1.events, input1.k)); // 7
console.log(maxValue(input2.events, input2.k)); // 10
console.log(maxValue(input3.events, input3.k)); // 9
// console.log(maxValue(input4.events, input4.k)); // 2, just a large test

// C: Constraints, already handled via efficient DP and binary search
// E: Edge cases
console.log(maxValue([[1,10,5],[2,3,4],[6,6,7],[10,11,2]], 2)); // Should compute correctly
console.log(maxValue([[1,10,5],[2,3,4],[6,6,7],[10,11,2]], 1)); // Should pick max single event: 7

/*
COMMENTS:
- We use DP+memoization for O(N*K) complexity, which is acceptable for N~10^5 when K is small.
- Binary search makes skipping to the next non-overlapping event fast (O(logN)).
- If constraints get too big (e.g., K*N > 10^6), further optimizations like iterative DP+coordinate compression may be needed.
*/