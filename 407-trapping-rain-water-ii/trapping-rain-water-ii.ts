// IOCE included above

// Priority Queue class for min-heap
class MinHeap<T> {
    private arr: Array<{ key: number, value: T }> = [];

    constructor(private getKey: (v: T) => number) {}

    public push(val: T) {
        this.arr.push({ key: this.getKey(val), value: val });
        this.bubbleUp();
    }

    public pop(): T | undefined {
        if (this.arr.length === 0) return undefined;
        const top = this.arr[0].value;
        const last = this.arr.pop()!;
        if (this.arr.length) {
            this.arr[0] = last;
            this.bubbleDown();
        }
        return top;
    }

    public size(): number {
        return this.arr.length;
    }

    private bubbleUp() {
        let idx = this.arr.length - 1;
        while (idx > 0) {
            let parentIdx = (idx - 1) >> 1;
            if (this.arr[idx].key < this.arr[parentIdx].key) {
                [this.arr[idx], this.arr[parentIdx]] = [this.arr[parentIdx], this.arr[idx]];
                idx = parentIdx;
            } else {
                break;
            }
        }
    }

    private bubbleDown() {
        let idx = 0;
        const n = this.arr.length;
        while (true) {
            let left = idx * 2 + 1, right = idx * 2 + 2;
            let smallest = idx;
            if (left < n && this.arr[left].key < this.arr[smallest].key) smallest = left;
            if (right < n && this.arr[right].key < this.arr[smallest].key) smallest = right;
            if (smallest === idx) break;
            [this.arr[idx], this.arr[smallest]] = [this.arr[smallest], this.arr[idx]];
            idx = smallest;
        }
    }
}

/**
 * Returns total trapped water volume.
 * @param heightMap 2D grid of heights
 */
function trapRainWater(heightMap: number[][]): number {
    // Check for empty or trivial cases
    if (!heightMap || heightMap.length === 0 || heightMap[0].length === 0)
        return 0;

    const m = heightMap.length;
    const n = heightMap[0].length;

    // If the map is too thin, can't trap water
    if (m < 3 || n < 3)
        return 0;

    // Directions for 4-neighbors
    const dirs = [[0,1],[1,0],[0,-1],[-1,0]];

    // Visited grid
    const visited = Array.from({ length: m }, () => Array(n).fill(false));

    // MinHeap - always processes the lowest boundary first
    const heap = new MinHeap<{ row: number, col: number, height: number }>(cell => cell.height);

    // Add all boundary cells to heap and mark as visited
    for (let i = 0; i < m; i++) {
        heap.push({ row: i, col: 0, height: heightMap[i][0] });
        heap.push({ row: i, col: n-1, height: heightMap[i][n-1] });
        visited[i][0] = true;
        visited[i][n-1] = true;
    }
    for (let j = 1; j < n-1; j++) {
        heap.push({ row: 0, col: j, height: heightMap[0][j] });
        heap.push({ row: m-1, col: j, height: heightMap[m-1][j] });
        visited[0][j] = true;
        visited[m-1][j] = true;
    }

    let water = 0;

    // BFS traversal
    while (heap.size() > 0) {
        const cell = heap.pop()!;
        for (const [dx, dy] of dirs) {
            const nx = cell.row + dx, ny = cell.col + dy;
            // Check bounds and if visited
            if (nx < 0 || nx >= m || ny < 0 || ny >= n || visited[nx][ny])
                continue;

            visited[nx][ny] = true;
            // If current boundary cell is taller than neighbor, water can be trapped
            const trapped = Math.max(0, cell.height - heightMap[nx][ny]);
            water += trapped;

            // The neighbor becomes part of boundary, at effective height
            heap.push({ row: nx, col: ny, height: Math.max(heightMap[nx][ny], cell.height) });
        }
    }

    return water;
}

// Example Usage
const heightMap1 = [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]];
console.log(trapRainWater(heightMap1)); // Output: 4

const heightMap2 = [[3,3,3,3,3],[3,2,2,2,3],[3,2,1,2,3],[3,2,2,2,3],[3,3,3,3,3]];
console.log(trapRainWater(heightMap2)); // Output: 10