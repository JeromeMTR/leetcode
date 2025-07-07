// A simple MinHeap implementation for numbers (the end days)
class MinHeap {
    private arr: number[] = [];

    size(): number { return this.arr.length; }
    peek(): number { return this.arr[0]; }
    push(val: number): void {
        this.arr.push(val);
        let cur = this.arr.length - 1;
        while (cur > 0) {
            let par = (cur - 1) >> 1;
            if (this.arr[par] <= this.arr[cur]) break;
            [this.arr[par], this.arr[cur]] = [this.arr[cur], this.arr[par]];
            cur = par;
        }
    }
    pop(): number | undefined {
        if (this.arr.length === 0) return undefined;
        const ret = this.arr[0];
        const last = this.arr.pop()!;
        if (this.arr.length === 0) return ret;
        this.arr[0] = last;
        let cur = 0;
        while (true) {
            let l = 2 * cur + 1, r = 2 * cur + 2, min = cur;
            if (l < this.arr.length && this.arr[l] < this.arr[min]) min = l;
            if (r < this.arr.length && this.arr[r] < this.arr[min]) min = r;
            if (min === cur) break;
            [this.arr[cur], this.arr[min]] = [this.arr[min], this.arr[cur]];
            cur = min;
        }
        return ret;
    }
}

/**
 * Returns the maximum number of events you can attend.
 * @param events Array of [startDay, endDay] tuples.
 */
function maxEvents(events: number[][]): number {
    // Sort events by their start day
    events.sort((a, b) => a[0] - b[0]);

    const minHeap = new MinHeap();

    let res = 0;             // Result: number of events attended
    let day = 0;             // Current day
    let i = 0;               // Index of events array
    const n = events.length;

    // The maximum possible day we need to consider is the latest endDay among all events
    const maxDay = events.reduce((mx, e) => Math.max(mx, e[1]), 0);

    for (day = 1; day <= maxDay; day++) {
        // Push all events starting today into heap
        while (i < n && events[i][0] === day) {
            minHeap.push(events[i][1]); // Push until day they're end
            i++;
        }
        // Remove events that are already over
        while (minHeap.size() && minHeap.peek() < day) {
            minHeap.pop();
        }
        // Attend the event ending soonest (if any)
        if (minHeap.size()) {
            minHeap.pop();
            res++;
        }
        // early stop: no more future events and heap empty
        if (i >= n && minHeap.size() === 0) break;
    }

    return res;
}

// -----------
// Example Tests
// -----------

console.log(maxEvents([[1,2],[2,3],[3,4]]));          // Output: 3
console.log(maxEvents([[1,2],[2,3],[3,4],[1,2]]));    // Output: 4
console.log(maxEvents([[1,4],[4,4],[2,2],[3,4],[1,1]])); // Output: 4