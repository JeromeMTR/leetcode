/**
 * Minimum time until you can swim from (0,0) to (n-1,n-1) in rising water.
 * 
 * @param grid - n x n matrix of elevations, grid[i][j] is unique
 * @returns minimum time t such that path exists from (0,0) to (n-1,n-1)
 */
function swimInWater(grid: number[][]): number {
    const n = grid.length;
    
    // Min-heap for [maxElevationSoFar, x, y]
    const heap = new MinPriorityQueue<{x: number, y: number, maxElevation: number}>(
        entry => entry.maxElevation
    );
    // Visited markers
    const visited: boolean[][] = Array.from({ length: n }, () => Array(n).fill(false));

    // Start at top-left
    heap.enqueue({x: 0, y: 0, maxElevation: grid[0][0]});
    visited[0][0] = true;

    // Directions: up, down, left, right
    const dirs = [[0,1],[1,0],[-1,0],[0,-1]];
    
    while (!heap.isEmpty()) {
        const {x, y, maxElevation} = heap.dequeue().element;
        // If we reached bottom-right, we're done
        if (x === n-1 && y === n-1) return maxElevation;

        for (const [dx,dy] of dirs) {
            const nx = x + dx, ny = y + dy;
            if (nx >= 0 && ny >=0 && nx < n && ny < n && !visited[nx][ny]) {
                visited[nx][ny] = true;
                heap.enqueue({
                    x: nx, 
                    y: ny,
                    // The maximal elevation seen so far on this path
                    maxElevation: Math.max(maxElevation, grid[nx][ny])
                });
            }
        }
    }
    return -1; // Should never happen for valid input
}

// ----------------------
// Priority Queue implementation (from 'typescript-collections' or 'datastructures-js' etc.)
// Substitute this with your favorite MinHeap/MinPriorityQueue implementation if running locally.
// Here's a simple one for reference:

// We use LeetCode's built-in 'MinPriorityQueue', in a real environment use a min-heap or priority queue.

/* Example usage:

Input:
grid = [[0,2],[1,3]]
Output:
3

Input:
grid = [
  [0,1,2,3,4],
  [24,23,22,21,5],
  [12,13,14,15,16],
  [11,17,18,19,20],
  [10,9,8,7,6]
]
Output: 16

*/

// If you don't have MinPriorityQueue, here's a minimal min-heap implementation:
class MinPriorityQueue<T> {
    private heap: {priority: number, element: T}[] = [];
    private getPriority: (element: T) => number;

    constructor(getPriority: (element: T) => number) {
        this.getPriority = getPriority;
    }

    enqueue(element: T) {
        this.heap.push({
            priority: this.getPriority(element),
            element
        });
        this.heapifyUp();
    }
    dequeue() {
        if (this.heap.length === 0) throw new Error('Empty');
        if (this.heap.length === 1) return this.heap.pop()!;
        const top = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.heapifyDown();
        return top;
    }
    isEmpty(): boolean {
        return this.heap.length === 0;
    }
    private heapifyUp() {
        let i = this.heap.length - 1;
        while (i > 0) {
            let p = Math.floor((i-1)/2);
            if (this.heap[p].priority > this.heap[i].priority) {
                [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
                i = p;
            } else break;
        }
    }
    private heapifyDown() {
        let i = 0;
        while (true) {
            let l = 2*i+1, r = 2*i+2, min = i;
            if (l < this.heap.length && this.heap[l].priority < this.heap[min].priority) min = l;
            if (r < this.heap.length && this.heap[r].priority < this.heap[min].priority) min = r;
            if (min !== i) {
                [this.heap[i], this.heap[min]] = [this.heap[min], this.heap[i]];
                i = min;
            } else break;
        }
    }
}

// --------------- IOCE ------------------

/*
Input:
    grid = [[0,2],[1,3]]
Output: 3

Input:
    grid = [
      [0,1,2,3,4],
      [24,23,22,21,5],
      [12,13,14,15,16],
      [11,17,18,19,20],
      [10,9,8,7,6]
    ]
Output: 16

Constraints:
    - 1 <= n <= 50
    - grid is n x n, all grid[i][j] unique, 0 <= grid[i][j] < n^2

Example:
    swimInWater([[0,2],[1,3]]) === 3
    swimInWater([
      [0,1,2,3,4],
      [24,23,22,21,5],
      [12,13,14,15,16],
      [11,17,18,19,20],
      [10,9,8,7,6]
    ]) === 16
*/