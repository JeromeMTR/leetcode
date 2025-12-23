/**
 * LeetCode 2054: Two Best Non-Overlapping Events
 *
 * Approach:
 * - Sort events by start time.
 * - Build a suffix array where suffixMax[i] = max value among events[i..end].
 * - For each event i, binary search the first event j with startTime >= endTime_i + 1.
 *   Candidate = value_i + suffixMax[j] (or just value_i if none).
 * - Track the best over all i, also allow choosing only one event.
 *
 * Time: O(n log n), Space: O(n)
 *
 * IOCE (Input/Output/Constraints/Edge cases):
 * Input: events as 2D array [start, end, value]
 * Output: maximum sum of values by attending at most two non-overlapping events
 * Constraints: n up to 1e5, times up to 1e9
 * Edge cases:
 * - All events overlap -> answer is max single value
 * - Non-overlap boundary is inclusive -> next start must be >= end+1
 * - Multiple events same start/end
 */

function maxTwoEvents(events: number[][]): number {
  const n = events.length;
  // Sort by start time (and end time tie-breaker not required but deterministic)
  events.sort((a, b) => (a[0] - b[0]) || (a[1] - b[1]));

  // Extract starts for binary search
  const starts = new Array<number>(n);
  for (let i = 0; i < n; i++) starts[i] = events[i][0];

  // suffixMax[i] = max value among events[i..n-1], suffixMax[n]=0 as sentinel
  const suffixMax = new Array<number>(n + 1);
  suffixMax[n] = 0;
  for (let i = n - 1; i >= 0; i--) {
    const v = events[i][2];
    suffixMax[i] = Math.max(suffixMax[i + 1], v);
  }

  // Lower bound: first index with starts[idx] >= target
  const lowerBound = (target: number): number => {
    let lo = 0, hi = n; // [lo, hi)
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (starts[mid] >= target) hi = mid;
      else lo = mid + 1;
    }
    return lo;
  };

  let ans = 0;
  for (let i = 0; i < n; i++) {
    const [s, e, v] = events[i];
    // Must start at least e + 1 due to inclusive end time
    const j = lowerBound(e + 1);
    const bestSecond = suffixMax[j]; // 0 if j==n
    ans = Math.max(ans, v + bestSecond);
  }

  return ans;
}

  console.log(maxTwoEvents([[1,3,4],[2,4,1],[5,6,3]])); // Input: [[1,3,4],[2,4,1],[5,6,3]]; Output: 7
  console.log(maxTwoEvents([[1,3,3],[1,3,1],[1,3,5]])); // Input: [[1,3,3],[1,3,1],[1,3,5]]; Output: 5
  console.log(maxTwoEvents([[1,5,3],[1,5,1],[6,10,2]])); // Input: [[1,5,3],[1,5,1],[6,10,2]]; Output: 5
  console.log(maxTwoEvents([[1,2,1],[2,3,2],[3,4,3],[4,5,4]])); // Input: [[1,2,1],[2,3,2],[3,4,3],[4,5,4]]; Output: 7
