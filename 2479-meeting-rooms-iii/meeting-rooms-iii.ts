// --------- Priority Queue / Min-Heap Implementation --------
class MinHeap<T> {
    private heap: T[];
    private comp: (a: T, b: T) => boolean;

    constructor(comp: (a: T, b: T) => boolean, arr: T[] = []) {
        this.comp = comp;
        this.heap = arr.slice();
        if (arr.length > 0) this.heapify();
    }

    private heapify() {
        for (let i = Math.floor(this.heap.length / 2); i >= 0; --i) {
            this.siftDown(i);
        }
    }
    private swap(i: number, j: number) {
        const t = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = t;
    }
    private siftUp(i: number) {
        let parent = Math.floor((i - 1) / 2);
        while (i > 0 && this.comp(this.heap[i], this.heap[parent])) {
            this.swap(i, parent);
            i = parent;
            parent = Math.floor((i - 1) / 2);
        }
    }
    private siftDown(i: number) {
        const n = this.heap.length;
        while (2 * i + 1 < n) {
            let j = 2 * i + 1;
            if (j + 1 < n && this.comp(this.heap[j + 1], this.heap[j])) j += 1;
            if (this.comp(this.heap[j], this.heap[i])) {
                this.swap(i, j);
                i = j;
            } else {
                break;
            }
        }
    }
    push(val: T) {
        this.heap.push(val);
        this.siftUp(this.heap.length - 1);
    }
    pop(): T | undefined {
        if (this.heap.length === 0) return undefined;
        const result = this.heap[0];
        const last = this.heap.pop()!;
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.siftDown(0);
        }
        return result;
    }
    peek(): T | undefined {
        return this.heap[0];
    }
    size(): number {
        return this.heap.length;
    }
    isEmpty(): boolean {
        return this.heap.length === 0;
    }
}


// ------------------- Main Solution Function -----------------
function mostBooked(n: number, meetings: number[][]): number {
    // Sort meetings in order of start time (ascending)
    meetings.sort((a, b) => a[0] - b[0]);

    // Min-heap of available rooms by room number
    const freeRooms = new MinHeap<number>((a, b) => a < b, Array.from({length: n}, (_,i) => i));

    // Min-heap of ongoing meetings: [endTime, roomId]
    const busyRooms = new MinHeap<[number, number]>(
        (a, b) => a[0] < b[0] || (a[0] === b[0] && a[1] < b[1])
    );

    // Count: meetings held by each room
    const count = Array(n).fill(0);

    for (const [start, end] of meetings) {
        // Free rooms whose meetings just ended before this meeting's start
        while (!busyRooms.isEmpty() && busyRooms.peek()![0] <= start) {
            const [, room] = busyRooms.pop()!;
            freeRooms.push(room);
        }

        if (!freeRooms.isEmpty()) {
            // Pick the available room with the lowest number
            const room = freeRooms.pop()!;
            count[room]++;
            // Mark this room as busy until the current meeting's end time
            busyRooms.push([end, room]);
        } else {
            // All rooms are busy, must delay this meeting:
            // Find the earliest room that gets free
            const [earliestEnd, room] = busyRooms.pop()!;
            // Delay the meeting, so it starts at earliestEnd
            const duration = end - start;
            const newEnd = earliestEnd + duration; // starts at earliestEnd, runs for 'duration'
            count[room]++;
            busyRooms.push([newEnd, room]);
        }
    }

    // Find the room used most
    let max = -1, ans = 0;
    for (let i = 0; i < n; ++i) {
        if (count[i] > max) {
            max = count[i];
            ans = i;
        }
    }
    return ans;
}


// ------------- IOCE Examples and Additional Test Cases --------------

// EXAMPLE 1
console.log(mostBooked(2, [[0,10],[1,5],[2,7],[3,4]])); // Output: 0

// EXAMPLE 2
console.log(mostBooked(3, [[1,20],[2,10],[3,5],[4,9],[6,8]])); // Output: 1

// EDGE: 1 room, lots of overlapping meetings
console.log(mostBooked(1, [[0,2],[1,4],[3,6]])); // Output: 0

// EDGE: Each meeting can fit in its own room
console.log(mostBooked(3, [[0,1],[2,3],[4,5]])); // Output: 0

// EDGE: later rooms get used more
console.log(mostBooked(3, [[0,5],[0,5],[0,5],[0,5],[0,5]])); // Output: 0

/*

Output:
0
1
0
0
0

*/

// ------------------ End of Solution -------------------