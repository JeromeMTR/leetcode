// Helper class: MaxHeap
class MaxHeap<T> {
    private data: T[];
    private comp: (a: T, b: T) => number;

    constructor(comp: (a: T, b: T) => number) {
        this.data = [];
        this.comp = comp;
    }

    size(): number { return this.data.length; }
    isEmpty(): boolean { return this.data.length === 0; }

    push(item: T): void {
        this.data.push(item);
        this._heapifyUp(this.data.length - 1);
    }

    pop(): T | undefined {
        if (this.data.length === 0) return undefined;
        const top = this.data[0];
        const last = this.data.pop()!;
        if (this.data.length > 0) {
            this.data[0] = last;
            this._heapifyDown(0);
        }
        return top;
    }

    peek(): T | undefined {
        return this.data[0];
    }

    // --- internal helpers ---
    private _heapifyUp(idx: number): void {
        let cur = idx;
        while (cur > 0) {
            const parent = (cur - 1) >> 1;
            if (this.comp(this.data[cur], this.data[parent]) > 0) {
                [this.data[cur], this.data[parent]] = [this.data[parent], this.data[cur]];
                cur = parent;
            } else break;
        }
    }
    private _heapifyDown(idx: number): void {
        let cur = idx, n = this.data.length;
        while (true) {
            let left = 2 * cur + 1, right = 2 * cur + 2, best = cur;
            if (left < n && this.comp(this.data[left], this.data[best]) > 0) best = left;
            if (right < n && this.comp(this.data[right], this.data[best]) > 0) best = right;
            if (best === cur) break;
            [this.data[cur], this.data[best]] = [this.data[best], this.data[cur]];
            cur = best;
        }
    }
}

// Task Manager class as described
type TaskRec = { userId: number, priority: number };

class TaskManager {
    // Maps taskId -> { userId, priority }
    private taskMap: Map<number, TaskRec>;
    // MaxHeap: entries are [priority, taskId, userId], negated for max-heap ordering
    private maxHeap: MaxHeap<[number, number, number]>;

    constructor(tasks: number[][]) {
        this.taskMap = new Map();
        // Heap comparator: compare by priority, then taskId
        this.maxHeap = new MaxHeap<[number, number, number]>(
            (a, b) => {
                if (a[0] !== b[0]) return a[0] - b[0]; // higher priority first (priority negated)
                return a[1] - b[1]; // higher taskId first (taskId negated)
            });
        // Initialize with given tasks
        for (const [userId, taskId, priority] of tasks) {
            this.taskMap.set(taskId, { userId, priority });
            this.maxHeap.push([-priority, -taskId, userId]); // negate for max-heap
        }
    }

    // Add a new task for a user
    add(userId: number, taskId: number, priority: number): void {
        this.taskMap.set(taskId, { userId, priority });
        this.maxHeap.push([-priority, -taskId, userId]);
    }

    // Edit the priority of an existing task
    edit(taskId: number, newPriority: number): void {
        const rec = this.taskMap.get(taskId);
        if (rec) {
            rec.priority = newPriority; // update in Map
            this.maxHeap.push([-newPriority, -taskId, rec.userId]); // push new state (lazy update)
        }
    }

    // Remove a task by taskId
    rmv(taskId: number): void {
        this.taskMap.delete(taskId);
        // No need to remove from heap: will be skipped ("lazy deletion")
    }

    // Execute & remove top-priority task (max-heap root); return its userId
    execTop(): number {
        while (!this.maxHeap.isEmpty()) {
            const [negPriority, negTaskId, userId] = this.maxHeap.pop()!;
            const priority = -negPriority, taskId = -negTaskId;
            const rec = this.taskMap.get(taskId);
            if (rec && rec.priority === priority) {
                // Found current top valid task
                this.taskMap.delete(taskId);
                return rec.userId;
            }
            // Otherwise: outdated/removed task; skip
        }
        return -1;
    }
}

/*
IOCE Example:

Input:
["TaskManager", "add", "edit", "execTop", "rmv", "add", "execTop"]
[[[[1, 101, 10], [2, 102, 20], [3, 103, 15]]], [4, 104, 5], [102, 8], [], [101], [5, 105, 15], []]

Corresponding calls:
const taskManager = new TaskManager([[1, 101, 10], [2, 102, 20], [3, 103, 15]]);
taskManager.add(4, 104, 5);
taskManager.edit(102, 8);
taskManager.execTop(); // returns 3
taskManager.rmv(101);
taskManager.add(5, 105, 15);
taskManager.execTop(); // returns 5

Output:
[null, null, null, 3, null, null, 5]
*/

// Usage Example (optional for testing):
/*
const t = new TaskManager([[1, 101, 10], [2, 102, 20], [3, 103, 15]]);
t.add(4, 104, 5);
t.edit(102, 8);
console.log(t.execTop()); // 3
t.rmv(101);
t.add(5, 105, 15);
console.log(t.execTop()); // 5
*/