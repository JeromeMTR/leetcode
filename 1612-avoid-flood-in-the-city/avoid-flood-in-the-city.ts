// IOCE + minHeap version

// Import libraries (for Priority Queue)
class MinHeap {
    heap: number[];
    constructor() {
        this.heap = [];
    }
    push(val: number) {
        this.heap.push(val);
        this.siftUp();
    }
    pop(): number | undefined {
        if (this.heap.length === 0) return undefined;
        const ret = this.heap[0];
        if (this.heap.length === 1) { this.heap.pop(); return ret; }
        this.heap[0] = this.heap.pop()!;
        this.siftDown();
        return ret;
    }
    peek(): number | undefined {
        return this.heap[0];
    }
    size(): number {
        return this.heap.length;
    }
    // Helper functions for heap property
    siftUp() {
        let i = this.heap.length - 1;
        while(i > 0) {
            let p = Math.floor((i - 1) / 2);
            if (this.heap[i] >= this.heap[p]) break;
            [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
            i = p;
        }
    }
    siftDown() {
        let i = 0, n = this.heap.length;
        while(2 * i + 1 < n) {
            let l = 2 * i + 1, r = 2 * i + 2, c = l;
            if(r < n && this.heap[r] < this.heap[l]) c = r;
            if(this.heap[i] <= this.heap[c]) break;
            [this.heap[i], this.heap[c]] = [this.heap[c], this.heap[i]];
            i = c;
        }
    }
}

// Core algorithm
function avoidFlood(rains: number[]): number[] {
    // Map: lake -> last filled day
    const lastFull: Map<number, number> = new Map();
    // List: indices of dry days (rains[i]==0)
    const dryDays: number[] = [];
    // Output array
    const ans: number[] = new Array(rains.length).fill(-1);

    // Map: lake -> minHeap of future rain days on that lake
    const lakeRains: Map<number, MinHeap> = new Map();
    for (let i = 0; i < rains.length; ++i) {
        const lake = rains[i];
        if(lake > 0) {
            if (!lakeRains.has(lake)) lakeRains.set(lake, new MinHeap());
            lakeRains.get(lake)!.push(i);
        }
    }

    // For dry days: which lakes must be dried, and by what time
    // Key: day of dry, Value: which lake to dry
    for (let i = 0; i < rains.length; ++i) {
        const lake = rains[i];
        if (lake > 0) {
            // Pop this day from future rains
            lakeRains.get(lake)!.pop();
            // If already full, must "dry" before today
            if (lastFull.has(lake)) {
                // Find a dry day > lastFull.get(lake) and < i
                // Find the earliest dryDay after lastFull.get(lake)
                let found = false;
                for(let j = 0; j < dryDays.length; ++j) {
                    if(dryDays[j] > lastFull.get(lake)!) {
                        // Use this dry day to dry lake
                        ans[dryDays[j]] = lake;
                        dryDays.splice(j,1);
                        found = true;
                        break;
                    }
                }
                if (!found) return []; // Can't avoid flood
            }
            // Mark as full now
            lastFull.set(lake, i);
            ans[i] = -1;
        } else {
            dryDays.push(i);
            // Default value for dry day is 1, if we never assign, will remain "1"
            ans[i] = 1;
        }
    }
    return ans;
}

/* -------------------- IOCE -------------------------- */

// Example 1:
console.log(avoidFlood([1,2,3,4])); // [-1,-1,-1,-1]
// Example 2:
console.log(avoidFlood([1,2,0,0,2,1])); // [-1,-1,1,2,-1,-1] or [-1,-1,2,1,-1,-1]
// Example 3:
console.log(avoidFlood([1,2,0,1,2])); // []
// Additional test: Many zero days
console.log(avoidFlood([1,2,0,0,0,0,2,1])); // Valid

/*

TIME: O(N^2) worst case (if lots of dry days), O(N) average for random cases
SPACE: O(N) for mapping and result
Improvement (with TreeSet or jump search): O(N log N). For this scope, direct search is acceptable.

*/

// --- End of Solution ---