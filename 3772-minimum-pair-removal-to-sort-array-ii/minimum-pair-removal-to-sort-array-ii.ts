/**
 *
 * IOCE (Input/Output/Constraints/Edge cases):
 * Input: nums: number[] (1 <= n <= 1e5, values in [-1e9, 1e9])
 * Output: minimum operations following forced min-sum adjacent merge rule
 * Constraints: Need time complexity of ~O(n log n)
 * Edge cases: already non-decreasing; negative numbers; duplicates; large n
 */

/**
 * Main solver
 * @param {number[]} nums - The input array of integers.
 * @returns {number} - The minimum number of operations to make the array non-decreasing.
 */

type Node = {
  id: number;
  val: number;
  prev: number; // id or -1
  next: number; // id or -1
  alive: boolean;
};

type PairEntry = {
  sum: number;
  left: number;  // left node id
  right: number; // right node id (must be next of left when valid)
};

class MinHeap {
  private a: PairEntry[] = [];

  private less(i: number, j: number): boolean {
    const x = this.a[i], y = this.a[j];
    if (x.sum !== y.sum) return x.sum < y.sum;
    // Leftmost pair => smaller left position in current array.
    // Among equal sums, choose the leftmost pair in the current array.
    // This is achieved by comparing the left node IDs, which preserve the original order.
    // The linked list structure ensures that merges only remove nodes, maintaining the order.
    // Thus, the leftmost pair corresponds to the smaller original index of the left node.
    return x.left < y.left;
  }

  push(x: PairEntry): void {
    this.a.push(x);
    this.siftUp(this.a.length - 1);
  }

  pop(): PairEntry | undefined {
    if (this.a.length === 0) return undefined;
    const res = this.a[0];
    const last = this.a.pop()!;
    if (this.a.length) {
      this.a[0] = last;
      this.siftDown(0);
    }
    return res;
  }

  get size(): number {
    return this.a.length;
  }

  private siftUp(i: number): void {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (!this.less(i, p)) break;
      [this.a[i], this.a[p]] = [this.a[p], this.a[i]];
      i = p;
    }
  }

  private siftDown(i: number): void {
    const n = this.a.length;
    while (true) {
      let best = i;
      const l = i * 2 + 1;
      const r = l + 1;
      if (l < n && this.less(l, best)) best = l;
      if (r < n && this.less(r, best)) best = r;
      if (best === i) break;
      [this.a[i], this.a[best]] = [this.a[best], this.a[i]];
      i = best;
    }
  }
}

function minimumPairRemoval(nums: number[]): number {
  const n = nums.length;
  if (n <= 1) return 0;

  // Nodes indexed by original position -> preserves left-to-right order.
  const nodes: Node[] = new Array(n);
  for (let i = 0; i < n; i++) {
    nodes[i] = {
      id: i,
      val: nums[i],
      prev: i - 1,
      next: i + 1 < n ? i + 1 : -1,
      alive: true,
    };
  }

  // Count bad edges initially
  let badEdges = 0;
  for (let i = 0; i + 1 < n; i++) {
    if (nums[i] > nums[i + 1]) badEdges++;
  }
  if (badEdges === 0) return 0;

  const heap = new MinHeap();
  for (let i = 0; i + 1 < n; i++) {
    heap.push({ sum: nums[i] + nums[i + 1], left: i, right: i + 1 });
  }

  // Helper: current edge is "bad" if leftVal > rightVal.
  const isBad = (l: number, r: number): boolean => nodes[l].val > nodes[r].val;

  // Remove contribution of edge (l,r) from badEdges if it exists and valid/alive
  const decIfBad = (l: number, r: number): void => {
    if (l === -1 || r === -1) return;
    if (!nodes[l].alive || !nodes[r].alive) return;
    if (nodes[l].next !== r) return;
    if (isBad(l, r)) badEdges--;
  };

  // Add contribution of edge (l,r) to badEdges if it exists and valid/alive
  const incIfBad = (l: number, r: number): void => {
    if (l === -1 || r === -1) return;
    if (!nodes[l].alive || !nodes[r].alive) return;
    if (nodes[l].next !== r) return;
    if (isBad(l, r)) badEdges++;
  };

  let ops = 0;

  while (badEdges > 0) {
    // Pop until we find a valid current adjacent pair.
    let entry: PairEntry | undefined;
    while (heap.size > 0) {
      const top = heap.pop()!;
      const l = top.left, r = top.right;
      if (!nodes[l].alive || !nodes[r].alive) continue;
      if (nodes[l].next !== r || nodes[r].prev !== l) continue; // no longer adjacent
      // sum may be stale; recompute and if mismatch, skip and reinsert correct
      const actualSum = nodes[l].val + nodes[r].val;
      if (actualSum !== top.sum) {
        heap.push({ sum: actualSum, left: l, right: r });
        continue;
      }
      entry = top;
      break;
    }
    if (!entry) break; // should not happen

    const l = entry.left;
    const r = entry.right;

    const a = nodes[l].prev;
    const b = nodes[r].next;

    // Before merge: remove bad edges affected: (a,l), (l,r), (r,b)
    decIfBad(a, l);
    decIfBad(l, r);
    decIfBad(r, b);

    // Merge r into l: l.val += r.val, remove r
    nodes[l].val = nodes[l].val + nodes[r].val;
    nodes[r].alive = false;

    // Relink: a - l - b
    nodes[l].next = b;
    if (b !== -1) nodes[b].prev = l;

    // Fix prev of l remains a.
    // Now add new potentially bad edges: (a,l), (l,b)
    incIfBad(a, l);
    incIfBad(l, b);

    // Push new adjacent pairs that involve l
    if (a !== -1 && nodes[a].alive && nodes[a].next === l) {
      heap.push({ sum: nodes[a].val + nodes[l].val, left: a, right: l });
    }
    if (b !== -1 && nodes[l].alive && nodes[l].next === b) {
      heap.push({ sum: nodes[l].val + nodes[b].val, left: l, right: b });
    }

    ops++;
  }

  return ops;
}


// Console testscases
console.log(minimumPairRemoval([5, 2, 3, 1]), "expected", 2);
console.log(minimumPairRemoval([1, 2, 2]), "expected", 0);

// Provided failing attempts
console.log(minimumPairRemoval([3, 1, 2, 1]), "expected", 3);
console.log(minimumPairRemoval([1, 2, 1, 2, 1, 2]), "expected", 4);
console.log(minimumPairRemoval([1, 1, 3, 3, 3, 4, 4, 4, 5, 5]), "expected", 4);

// Additional sanity
console.log(minimumPairRemoval([2, 1]), "expected", 1);
console.log(minimumPairRemoval([1]), "expected", 0);
console.log(minimumPairRemoval([0, -1, -2, -3]), "expected", 3);