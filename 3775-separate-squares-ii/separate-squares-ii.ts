/**
 * IOCE
 *
 * Inputs:
 * - squares: Array of squares represented as [x, y, l],
 *   where (x, y) is the bottom-left corner and l is the side length.
 *
 * Output:
 * - A y-coordinate of a horizontal line that splits the total union area
 *   of the squares into two equal halves.
 *
 * Constraints:
 * - Coordinates are integers; squares may overlap.
 * - The function assumes a finite number of squares; typical sweep-line
 *   constraints apply: O(n log n) time, O(n) memory.
 *
 * Edge Cases:
 * - No squares: returns 0.
 * - Fully overlapping squares are handled via coverage counting.
 * - Discretization of x-coordinates ensures correct union-length calculation
 *   for the active set of intervals.
 *
 * Approach:
 * - Sweep-line on y with events at each square's bottom and top edges.
 * - Maintain the union length of active x-intervals using a segment tree over
 *   discretized x-coordinates (count-cover technique).
 * - Accumulate area between consecutive y-levels; binary search the prefix-sum
 *   of areas to locate the split height where cumulative area crosses half.
 *
 * Complexity:
 * - Time: O(n log n) for sorting events and segment tree updates/queries.
 * - Space: O(n) for discretized coordinates and tree storage.
 */

type Event = {
    y: number;    // y-coordinate of the event (bottom or top edge)
    delta: number; // +1 to add interval, -1 to remove interval
    xl: number;   // left x of interval
    xr: number;   // right x of interval
};

// Segment tree that tracks the total covered length of x-intervals
// using a count-cover technique across discretized coordinates.
class SegmentTree {
    private count: number[];   // coverage count per node
    private covered: number[]; // total covered length per node
    private xs: number[];      // discretized, sorted x-coordinates
    private n: number;         // number of elementary segments: xs.length - 1

    constructor(xs: number[]) {
        this.xs = xs; // sorted x coordinates
        this.n = xs.length - 1; // number of elementary segments
        // allocate at least one node to avoid zero-length arrays
        this.count = new Array(4 * Math.max(this.n, 1)).fill(0);
        this.covered = new Array(4 * Math.max(this.n, 1)).fill(0);
    }

    // Update coverage over interval [qleft, qright) by delta (+1 or -1)
    private updateRange(
        qleft: number,
        qright: number,
        delta: number,
        left: number,
        right: number,
        pos: number,
    ): void {
        // No overlap with node segment [xs[left], xs[right+1])
        if (this.xs[right + 1] <= qleft || this.xs[left] >= qright) {
            return;
        }
        // Full cover of node segment
        if (qleft <= this.xs[left] && this.xs[right + 1] <= qright) {
            this.count[pos] += delta;
        } else {
            const mid = Math.floor((left + right) / 2);
            this.updateRange(qleft, qright, delta, left, mid, pos * 2 + 1);
            this.updateRange(qleft, qright, delta, mid + 1, right, pos * 2 + 2);
        }

        // If covered at this node, its length equals the span of its segment;
        // otherwise, sum children's covered lengths.
        if (this.count[pos] > 0) {
            this.covered[pos] = this.xs[right + 1] - this.xs[left];
        } else {
            if (left === right) {
                this.covered[pos] = 0;
            } else {
                this.covered[pos] =
                    this.covered[pos * 2 + 1] + this.covered[pos * 2 + 2];
            }
        }
    }

    // Public API: apply delta over [qleft, qright)
    public update(qleft: number, qright: number, delta: number): void {
        if (this.n <= 0) return;
        this.updateRange(qleft, qright, delta, 0, this.n - 1, 0);
    }

    // Current total union length of active intervals
    public query(): number {
        return this.covered[0];
    }
}

// Returns the y-coordinate that splits union area of squares into halves
function separateSquares(squares: number[][]): number {
    // Build sweep-line events and x-set for discretization
    const events: Event[] = [];
    const xsSet = new Set<number>();

    for (const sq of squares) {
        const [x, y, l] = sq;
        const xr = x + l;
        events.push({ y, delta: 1, xl: x, xr });
        events.push({ y: y + l, delta: -1, xl: x, xr });
        xsSet.add(x);
        xsSet.add(xr);
    }

    // Process events from bottom to top
    events.sort((a, b) => a.y - b.y);
    if (events.length === 0) return 0;

    // Discretize x and prepare segment tree
    const xs = Array.from(xsSet).sort((a, b) => a - b);
    const segTree = new SegmentTree(xs);

    // Prefix sums of accumulated area and corresponding union widths
    const psum: number[] = [];
    const widths: number[] = [];
    let total_area = 0.0;
    let prevY = events[0].y;

    // Sweep: area added between consecutive y-levels is width * deltaY
    for (const { y, delta, xl, xr } of events) {
        const unionLength = segTree.query();
        total_area += unionLength * (y - prevY);
        segTree.update(xl, xr, delta);
        const updatedLength = segTree.query();
        psum.push(total_area);
        widths.push(updatedLength);
        prevY = y;
    }

    // Target half-area (rounded up as per original logic)
    const target = Math.floor((total_area + 1) / 2);

    // Binary search: find last index with psum[idx] < target
    let lo = 0,
        hi = psum.length - 1,
        idx = 0;
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (psum[mid] < target) {
            idx = mid;
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }

    // Interpolate within the slab to reach exact split height
    const area = psum[idx];
    const width = widths[idx];
    const height = events[idx].y;

    // Solve height + (remainingArea)/(2*width)
    return height + (total_area - area * 2) / (width * 2.0);
}
type Event = {
    y: number;
    delta: number;
    xl: number;
    xr: number;
};

class SegmentTree {
    private count: number[];
    private covered: number[];
    private xs: number[];
    private n: number;

    constructor(xs: number[]) {
        this.xs = xs; // sorted x coordinates
        this.n = xs.length - 1; // number of elementary segments
        this.count = new Array(4 * Math.max(this.n, 1)).fill(0);
        this.covered = new Array(4 * Math.max(this.n, 1)).fill(0);
    }

    private updateRange(
        qleft: number,
        qright: number,
        delta: number,
        left: number,
        right: number,
        pos: number,
    ): void {
        if (this.xs[right + 1] <= qleft || this.xs[left] >= qright) {
            return; // no overlap
        }
        if (qleft <= this.xs[left] && this.xs[right + 1] <= qright) {
            this.count[pos] += delta;
        } else {
            const mid = Math.floor((left + right) / 2);
            this.updateRange(qleft, qright, delta, left, mid, pos * 2 + 1);
            this.updateRange(qleft, qright, delta, mid + 1, right, pos * 2 + 2);
        }

        if (this.count[pos] > 0) {
            this.covered[pos] = this.xs[right + 1] - this.xs[left];
        } else {
            if (left === right) {
                this.covered[pos] = 0;
            } else {
                this.covered[pos] =
                    this.covered[pos * 2 + 1] + this.covered[pos * 2 + 2];
            }
        }
    }

    public update(qleft: number, qright: number, delta: number): void {
        if (this.n <= 0) return;
        this.updateRange(qleft, qright, delta, 0, this.n - 1, 0);
    }

    public query(): number {
        return this.covered[0];
    }
}

function separateSquares(squares: number[][]): number {
    const events: Event[] = [];
    const xsSet = new Set<number>();

    for (const sq of squares) {
        const [x, y, l] = sq;
        const xr = x + l;
        events.push({ y, delta: 1, xl: x, xr });
        events.push({ y: y + l, delta: -1, xl: x, xr });
        xsSet.add(x);
        xsSet.add(xr);
    }

    events.sort((a, b) => a.y - b.y);
    if (events.length === 0) return 0;

    const xs = Array.from(xsSet).sort((a, b) => a - b);
    const segTree = new SegmentTree(xs);

    const psum: number[] = [];
    const widths: number[] = [];
    let total_area = 0.0;
    let prevY = events[0].y;

    for (const { y, delta, xl, xr } of events) {
        const unionLength = segTree.query();
        total_area += unionLength * (y - prevY);
        segTree.update(xl, xr, delta);
        const updatedLength = segTree.query();
        psum.push(total_area);
        widths.push(updatedLength);
        prevY = y;
    }

    const target = Math.floor((total_area + 1) / 2);

    let lo = 0,
        hi = psum.length - 1,
        idx = 0;
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (psum[mid] < target) {
            idx = mid;
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }

    const area = psum[idx];
    const width = widths[idx];
    const height = events[idx].y;

    return height + (total_area - area * 2) / (width * 2.0);
}
class SegmentTree {
    private count: number[];
    private covered: number[];
    private xs: number[];
    private n: number;

    constructor(xs: number[]) {
        this.xs = xs; // sorted x coordinates
        this.n = xs.length - 1;
        this.count = new Array(4 * this.n).fill(0);
        this.covered = new Array(4 * this.n).fill(0);
    }

    private modify(
        qleft: number,
        qright: number,
        qval: number,
        left: number,
        right: number,
        pos: number,
    ): void {
        if (this.xs[right + 1] <= qleft || this.xs[left] >= qright) {
            return; // no overlap
        }
        if (qleft <= this.xs[left] && this.xs[right + 1] <= qright) {
            this.count[pos] += delta;
        } else {
            const mid = Math.floor((left + right) / 2);
            this.updateRange(qleft, qright, delta, left, mid, pos * 2 + 1);
            this.updateRange(qleft, qright, delta, mid + 1, right, pos * 2 + 2);
        }

        if (this.count[pos] > 0) {
            this.covered[pos] = this.xs[right + 1] - this.xs[left];
        } else {
            if (left === right) {
                this.covered[pos] = 0;
            } else {
                this.covered[pos] =
                    this.covered[pos * 2 + 1] + this.covered[pos * 2 + 2];
            }
        }
    }

    public update(qleft: number, qright: number, qval: number): void {
        if (this.n <= 0) return;
        this.updateRange(qleft, qright, qval, 0, this.n - 1, 0);
    }

    public query(): number {
        return this.covered[0];
    }
}

function separateSquares(squares: number[][]): number {
    // save events: [y-coordinate, type, left boundary, right boundary]
    const events: [number, number, number, number][] = [];
    const xsSet = new Set<number>();

    for (const sq of squares) {
        const [x, y, l] = sq;
        const xr = x + l;
        events.push([y, 1, x, xr]);
        events.push([y + l, -1, x, xr]);
        xsSet.add(x);
        xsSet.add(xr);
            events.push({ y, delta: 1, xl: x, xr });
            events.push({ y: y + l, delta: -1, xl: x, xr });
    // sort events by y-coordinate
    events.sort((a, b) => a[0] - b[0]);
    // discrete coordinates
    const xs = Array.from(xsSet).sort((a, b) => a - b);
    // initialize the segment tree
        events.sort((a, b) => a.y - b.y);

        if (events.length === 0) {
            return 0;
        }

    const psum: number[] = [];
    const widths: number[] = [];
    let total_area = 0.0;
    let prev = events[0][0];

    // scan: calculate total area and record intermediate states
    for (const event of events) {
        const [y, delta, xl, xr] = event;
        let prevY = events[0].y;
        total_area += length * (y - prev);
        segTree.update(xl, xr, delta);
        for (const { y, delta, xl, xr } of events) {
            const unionLength = segTree.query();
            total_area += unionLength * (y - prevY);
            segTree.update(xl, xr, delta);
            const updatedLength = segTree.query();
            psum.push(total_area);
            widths.push(updatedLength);
            prevY = y;
    let left = 0,
        right = psum.length - 1;
    let i = 0;
    while (left <= right) {
        // binary search: find last index where psum[idx] < target
        let lo = 0,
            hi = psum.length - 1,
            idx = 0;
        while (lo <= hi) {
            const mid = Math.floor((lo + hi) / 2);
            if (psum[mid] < target) {
                idx = mid;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }

    return height + (total_area - area * 2) / (width * 2.0);
        const area = psum[idx];
        const width = widths[idx];
        const height = events[idx].y;