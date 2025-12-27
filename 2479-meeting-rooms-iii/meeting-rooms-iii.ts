//  * @param n Number of rooms available (0-indexed identifiers: 0..n-1).
//  * @param meetings List of meeting intervals as [start, end] pairs.
//  * @returns Index of the most-booked room; ties resolved by smallest index.

/**
 * LeetCode 2402. Meeting Rooms III
 *
 * IOCE (Input/Output/Constraints/Edge cases):
 * - Input: n (1..100), meetings: up to 1e5 intervals [start, end), unique starts
 * - Output: room index that hosted the most meetings; tie -> smallest index
 * - Constraints require O(m log n) where m = meetings.length
 * - Edge cases:
 *   - Multiple meetings end exactly when another starts (half-closed): room becomes free at end time
 *   - When no room is free at a meeting's start, delay it to the earliest finishing room
 *   - When multiple rooms free: pick lowest room index
 *   - When multiple rooms finish at same time: after freeing, lowest index should be preferred
 *
 * Approach:
 * - Sort meetings by original start time.
 * - Maintain:
 *   1) available rooms min-heap by room index
 *   2) busy rooms min-heap by (endTime, roomIndex) (endTime primary, roomIndex secondary)
 * - For each meeting:
 *   - Free all busy rooms whose endTime <= meeting.start
 *   - If an available room exists: schedule meeting in lowest-index room ending at meeting.end
 *   - Else: pop earliest finishing room, delay meeting to that endTime, keep duration, push back
 * - Count meetings per room; return argmax with tie-breaking by smallest index.
 */

// Generic min-heap using a boolean comparator `less(x, y)` that returns true if x should come before y
class MiniHeap<T> {
  private data: T[] = [];
  constructor(private less: (x: T, y: T) => boolean) {}

  size(): number { return this.data.length; }
  peek(): T | undefined { return this.data[0]; }

  push(x: T): void {
    const a = this.data;
    a.push(x);
    let i = a.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (!this.less(a[i], a[p])) break;
      [a[i], a[p]] = [a[p], a[i]];
      i = p;
    }
  }

  pop(): T | undefined {
    const a = this.data;
    if (a.length === 0) return undefined;
    const top = a[0];
    const last = a.pop()!;
    if (a.length > 0) {
      a[0] = last;
      this.siftDown(0);
    }
    return top;
  }

  private siftDown(i: number): void {
    const a = this.data;
    const n = a.length;
    while (true) {
      let l = i * 2 + 1;
      if (l >= n) break;
      let r = l + 1;
      let best = l;
      if (r < n && this.less(a[r], a[l])) best = r;
      if (!this.less(a[best], a[i])) break;
      [a[i], a[best]] = [a[best], a[i]];
      i = best;
    }
  }
}

function mostBooked(n: number, meetings: number[][]): number {
  // Sort by original start time (unique starts)
  meetings.sort((a, b) => a[0] - b[0]);

  // available rooms by smallest index
  const available = new MiniHeap<number>((a, b) => a < b);
  for (let i = 0; i < n; i++) available.push(i);

  // busy rooms by earliest end time, tie -> smallest room index
  // store [endTime, roomIndex]
  const busy = new MiniHeap<[number, number]>((x, y) => {
    if (x[0] !== y[0]) return x[0] < y[0];
    return x[1] < y[1];
  });

  const cnt = new Array<number>(n).fill(0);

  for (const [start, end] of meetings) {
    const duration = end - start;

    // Free rooms that have finished by 'start'
    while (busy.size() > 0) {
      const top = busy.peek()!;
      if (top[0] > start) break;
      busy.pop();
      available.push(top[1]);
    }

    if (available.size() > 0) {
      // Use lowest-numbered available room
      const room = available.pop()!;
      cnt[room]++;
      busy.push([end, room]);
    } else {
      // No room free: delay to earliest end time
      const [freeTime, room] = busy.pop()!;
      cnt[room]++;
      // Meeting starts at freeTime, ends at freeTime + duration
      busy.push([freeTime + duration, room]);
    }
  }

  // Find room with max meetings, tie -> smallest index
  let bestRoom = 0;
  for (let i = 1; i < n; i++) {
    if (cnt[i] > cnt[bestRoom]) bestRoom = i;
  }
  return bestRoom;
}

// Console.log-based test cases
// ----------------------------
// Known sample where the answer is 0
console.log(
  "Example 1 (Expected 0):",
  mostBooked(2, [
    [0, 10],
    [1, 5],
    [2, 7],
    [3, 4],
  ])
);

// Additional examples (outputs shown for inspection)
console.log(
  "Example 2:",
  mostBooked(3, [
    [1, 20],
    [2, 10],
    [3, 5],
    [4, 9],
    [6, 8],
  ])
);

console.log(
  "Example 3:",
  mostBooked(2, [
    [0, 10],
    [1, 2],
    [12, 14],
    [13, 15],
  ])
);

// Edge case: all meetings start at the same time
console.log(
  "Edge Case (all same start):",
  mostBooked(3, [
    [0, 10],
    [0, 10],
    [0, 10],
    [0, 10],
  ])
);

// Tie-break when counts equal across rooms: expect smallest index (0)
console.log(
  "Tie-break equal counts (Expected 0):",
  mostBooked(2, [
    [0, 1],
    [0, 1],
    [1, 2],
    [1, 2],
  ])
);

// Zero-duration meetings handled consistently
console.log(
  "Zero-duration meetings:",
  mostBooked(1, [
    [5, 5],
    [5, 5],
    [5, 5],
  ])
);

// Heavy overlaps causing delays on a single room
console.log(
  "Heavy overlaps single room:",
  mostBooked(1, [
    [0, 10],
    [1, 3],
    [2, 6],
    [7, 8],
  ])
);

// Multiple rooms with staggered meetings
console.log(
  "Staggered with 5 rooms:",
  mostBooked(5, [
    [0, 2],
    [1, 3],
    [2, 4],
    [3, 5],
    [4, 6],
    [5, 7],
    [6, 8],
    [7, 9],
    [8, 10],
  ])
);