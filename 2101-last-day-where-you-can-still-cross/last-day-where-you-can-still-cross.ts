// @params row: number of rows
// @params col: number of columns
// @params cells: list of [row, col] positions that become water each day (1-based indexing)

/**
 * LeetCode 1970. Last Day Where You Can Still Cross
 * TypeScript solution using Union-Find (DSU) + reverse simulation.
 *
 * IOCE (Input/Output/Constraints/Edge cases):
 * - Input: row, col, cells (1-based coordinates), cells.length == row*col
 * - Output: last day (0..row*col-1) you can cross top->bottom using only land
 * - Constraints: row*col <= 2e4 => O(N alpha(N)) works.
 * - Edge cases:
 *   - Single column / single row
 *   - Crossing possible on day 0 but may fail later
 *   - Need "last day": use reverse process, return earliest reverse step that makes crossing, map to day.
 *
 * Key idea:
 * - Consider days forward: cells become water.
 * - Reverse it: start with all water (after last day), then add land back from last day to day 1.
 * - When adding a land cell, union it with adjacent land cells.
 * - Maintain two virtual nodes: TOP and BOTTOM; connect land in row 1 to TOP, land in row row to BOTTOM.
 * - The first time (in reverse) TOP connects to BOTTOM at reverse index i (0-based in cells),
 *   that means in forward time, last day to cross is i (because before flooding day i+1).
 */

class DSU {
  parent: Int32Array;
  size: Int32Array;

  constructor(n: number) {
    this.parent = new Int32Array(n);
    this.size = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      this.parent[i] = i;
      this.size[i] = 1;
    }
  }

  find(x: number): number {
    let p = this.parent[x];
    while (p !== this.parent[p]) p = this.parent[p];
    // path compression
    while (x !== p) {
      const nxt = this.parent[x];
      this.parent[x] = p;
      x = nxt;
    }
    return p;
  }

  union(a: number, b: number): void {
    let ra = this.find(a);
    let rb = this.find(b);
    if (ra === rb) return;
    if (this.size[ra] < this.size[rb]) {
      const t = ra;
      ra = rb;
      rb = t;
    }
    this.parent[rb] = ra;
    this.size[ra] += this.size[rb];
  }

  connected(a: number, b: number): boolean {
    return this.find(a) === this.find(b);
  }
}

function latestDayToCross(row: number, col: number, cells: number[][]): number {
  const n = row * col;
  const TOP = n;
  const BOTTOM = n + 1;

  const dsu = new DSU(n + 2);

  // land[idx] = 1 if cell is currently land in reverse process
  const land = new Uint8Array(n);

  const dirs = [-1, 0, 1, 0, -1];

  // Convert (r,c) 1-based to index [0..n-1]
  const id = (r: number, c: number) => (r - 1) * col + (c - 1);

  // Reverse add cells from last to first
  for (let i = cells.length - 1; i >= 0; i--) {
    const r = cells[i][0];
    const c = cells[i][1];
    const idx = id(r, c);

    land[idx] = 1; // becomes land

    // Connect to virtual top/bottom if on boundary rows
    if (r === 1) dsu.union(idx, TOP);
    if (r === row) dsu.union(idx, BOTTOM);

    // Union with 4-directional neighboring land cells
    for (let k = 0; k < 4; k++) {
      const nr = r + dirs[k];
      const nc = c + dirs[k + 1];
      if (nr < 1 || nr > row || nc < 1 || nc > col) continue;
      const nidx = id(nr, nc);
      if (land[nidx]) dsu.union(idx, nidx);
    }

    // If connected now, then forward last day to cross is i
    if (dsu.connected(TOP, BOTTOM)) return i;
  }

  // If never connected in reverse, crossing possible only on day 0? Actually day 0 is all land so must be possible.
  // This return is a safe fallback.
  return 0;
}

// ---------------------------------------------
// Console.log test cases
// ---------------------------------------------
(() => {
  const tests: Array<{ row: number; col: number; cells: number[][]; expect?: number }> = [
    // Example-style cases
    { row: 2, col: 2, cells: [[1, 1], [2, 1], [1, 2], [2, 2]], expect: 2 },
    { row: 2, col: 2, cells: [[1, 1], [1, 2], [2, 1], [2, 2]], expect: 1 },
    { row: 3, col: 3, cells: [[1, 2], [2, 1], [3, 3], [2, 2], [1, 1], [1, 3], [2, 3], [3, 2], [3, 1]], expect: 3 },

    // Additional sanity cases
    { row: 3, col: 2, cells: [[1, 1], [2, 1], [3, 1], [1, 2], [2, 2], [3, 2]] },
    { row: 1, col: 3, cells: [[1, 1], [1, 2], [1, 3]] },
  ];

  tests.forEach((t, i) => {
    const result = latestDayToCross(t.row, t.col, t.cells);
    if (typeof t.expect === 'number') {
      console.log(`Case #${i + 1}: result=${result}, expected=${t.expect}`);
    } else {
      console.log(`Case #${i + 1}: result=${result}`);
    }
  });
})();