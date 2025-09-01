// TypeScript implementation

// Max heap implementation for our purpose
class MaxHeap<T> {
    heap: T[];
    compare: (a: T, b: T) => number;
    constructor(compare: (a: T, b: T) => number) {
        this.heap = [];
        this.compare = compare;
    }
    size() { return this.heap.length; }
    push(val: T) {
        this.heap.push(val);
        this.bubbleUp();
    }
    pop(): T | undefined {
        if (this.heap.length === 0) return undefined;
        const top = this.heap[0];
        const end = this.heap.pop()!;
        if (this.heap.length) {
            this.heap[0] = end;
            this.sinkDown();
        }
        return top;
    }
    bubbleUp() {
        let idx = this.heap.length - 1;
        const node = this.heap[idx];
        while (idx > 0) {
            const parentIdx = Math.floor((idx - 1) / 2);
            if (this.compare(this.heap[parentIdx], node) >= 0) break;
            this.heap[idx] = this.heap[parentIdx];
            idx = parentIdx;
        }
        this.heap[idx] = node;
    }
    sinkDown() {
        let idx = 0;
        const length = this.heap.length;
        const node = this.heap[0];
        while (true) {
            let leftIdx = 2 * idx + 1;
            let rightIdx = 2 * idx + 2;
            let swap = -1;
            if (leftIdx < length) {
                if (this.compare(this.heap[leftIdx], node) > 0) swap = leftIdx;
            }
            if (
                rightIdx < length &&
                this.compare(this.heap[rightIdx], swap === -1 ? node : this.heap[leftIdx]) > 0
            ) {
                swap = rightIdx;
            }
            if (swap === -1) break;
            this.heap[idx] = this.heap[swap];
            idx = swap;
        }
        this.heap[idx] = node;
    }
}

// Function to calculate delta in pass ratio after adding a student
function delta(pass: number, total: number): number {
    const before = pass / total;
    const after = (pass + 1) / (total + 1);
    return after - before;
}

/**
 * Calculates the maximum average pass ratio after assigning extra students optimally.
 * @param classes Array of [passing, total] for each class
 * @param extraStudents Number of extra passing students to assign
 * @returns Maximum average pass ratio (rounded to 5 decimal places)
 */
function maxAverageRatio(classes: number[][], extraStudents: number): number {
    // Create a max-heap, prioritized by the delta value
    // Heap element: [delta, pass, total]
    const heap = new MaxHeap<[number, number, number]>((a, b) => a[0] - b[0]);

    // Initialize heap with all classes
    for (const [pass, total] of classes) {
        heap.push([delta(pass, total), pass, total]);
    }

    // Assign each extra student
    for (let i = 0; i < extraStudents; ++i) {
        let [currDelta, pass, total] = heap.pop()!; // This is the class to benefit *most* from an extra pass
        pass++;
        total++;
        heap.push([delta(pass, total), pass, total]);
    }

    // Calculate average pass ratio
    let sum = 0;
    while (heap.size()) {
        const [_, pass, total] = heap.pop()!;
        sum += pass / total;
    }
    return sum / classes.length;
}

// ----- IOCE -----

// Example 1
const classes1 = [[1,2],[3,5],[2,2]];
const extraStudents1 = 2;
console.log(maxAverageRatio(classes1, extraStudents1)); // Output: 0.78333 (approx)

// Example 2
const classes2 = [[2,4],[3,9],[4,5],[2,10]];
const extraStudents2 = 4;
console.log(maxAverageRatio(classes2, extraStudents2)); // Output: 0.53485 (approx)

/*
Output:
0.7833333333333333
0.5348484848484848
*/