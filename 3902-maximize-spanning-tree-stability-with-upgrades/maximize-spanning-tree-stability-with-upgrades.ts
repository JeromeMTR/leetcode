/**
 * IOCE
 * Inputs:
 *  - n: number of nodes (0..n-1)
 *  - edges: array of [u, v, s, must]
 *      u, v: endpoints (undirected)
 *      s: strength
 *      must: 1 => edge must be included in the spanning tree and cannot be upgraded
 *            0 => optional edge, can be upgraded at most once (doubling strength)
 *  - k: max number of upgrades allowed
 *
 * Output:
 *  - maximum possible stability (minimum edge strength in the chosen spanning tree)
 *  - -1 if impossible to connect all nodes with a valid spanning tree (must-edges cannot be avoided)
 *
 * Constraints:
 *  - 2 <= n <= 1e5
 *  - m = edges.length <= 1e5
 *  - 1 <= s <= 1e5
 *
 * Time complexity:
 *  - Binary search over answer: O(log(2*1e5)) ~ O(log 2e5)
 *  - Each feasibility check uses DSU and scans edges: O(m α(n))
 *  - Total: O(m α(n) log 2e5)
 *
 * Space complexity:
 *  - O(n) for DSU
 *
 * Edge cases:
 *  - must-edges form a cycle => impossible => return -1
 *  - graph disconnected even with all edges => return -1
 *  - k = 0 => only non-upgraded strengths matter
 *  - n = 2 => spanning tree is a single edge; must constraints still apply
 */

class DSU {
  parents: Int32Array;
  ranks: Int8Array;
  componentCount: number;

  constructor(n: number) {
    this.parents = new Int32Array(n);
    this.ranks = new Int8Array(n);
    for (let i = 0; i < n; i++) this.parents[i] = i;
    this.componentCount = n;
  }

  find(node: number): number {
    const currentParent = this.parents[node];
    if (currentParent === node) return node;
    // path compression
    this.parents[node] = this.find(currentParent);
    return this.parents[node];
  }

  union(nodeA: number, nodeB: number): boolean {
    const rootA = this.find(nodeA);
    const rootB = this.find(nodeB);
    if (rootA === rootB) return false;

    // union by rank
    const rankA = this.ranks[rootA];
    const rankB = this.ranks[rootB];
    if (rankA < rankB) {
      this.parents[rootA] = rootB;
    } else if (rankA > rankB) {
      this.parents[rootB] = rootA;
    } else {
      this.parents[rootB] = rootA;
      this.ranks[rootA]++;
    }

    this.componentCount--;
    return true;
  }
}

type Edge = [number, number, number, number]; // [u,v,s,must]

/**
 * Check if there exists a valid spanning tree with stability >= T using <= k upgrades.
 *
 * Key idea:
 *  - must edges are forced; if they create a cycle => impossible for any T.
 *  - For a threshold T, an optional edge is:
 *      - free if s >= T (cost 0)
 *      - upgradeable if must=0 and 2*s >= T (cost 1)
 *      - unusable otherwise
 *  - We want to connect all components after must edges with minimum upgrades <= k.
 *    Greedy: take all free edges first (to connect as much as possible without spending upgrades),
 *    then take upgradeable edges to finish connecting, counting upgrades.
 */
function maxStability(n: number, edges: Edge[], k: number): number {
  const m = edges.length;
  if (n === 1) return 0; // not needed by constraints (n>=2), but safe.

  // Quick impossibility check independent of T:
  // Must edges must be included; if they form a cycle, no valid spanning tree exists.
  {
    const dsuMust = new DSU(n);
    for (let i = 0; i < m; i++) {
      const [u, v, _s, must] = edges[i];
      if (must === 1) {
        if (!dsuMust.union(u, v)) return -1;
      }
    }
  }

  // Upper bound for answer: max possible edge strength after at most one upgrade => max(2*s)
  let hi = 0;
  for (const [_u, _v, s, must] of edges) {
    hi = Math.max(hi, must === 1 ? s : 2 * s);
  }
  let lo = 1;
  let ans = -1;

  const feasible = (T: number): boolean => {
    const dsu = new DSU(n);

    // 1) Add all must edges; also must edges must satisfy strength >= T else fail.
    for (let i = 0; i < m; i++) {
      const [u, v, s, must] = edges[i];
      if (must === 1) {
        if (s < T) return false;
        // cycle cannot happen (checked globally), but union anyway
        dsu.union(u, v);
      }
    }

    // 2) Add all optional edges that already meet T (free)
    for (let i = 0; i < m; i++) {
      const [u, v, s, must] = edges[i];
      if (must === 0 && s >= T) {
        dsu.union(u, v);
        if (dsu.componentCount === 1) return true;
      }
    }

    // 3) Use upgradeable edges (cost 1) to finish connecting
    let usedUpgrades = 0;
    for (let i = 0; i < m; i++) {
      const [u, v, s, must] = edges[i];
      if (must === 0 && s < T && 2 * s >= T) {
        if (dsu.union(u, v)) {
          usedUpgrades++;
          if (usedUpgrades > k) return false;
          if (dsu.componentCount === 1) return true;
        }
      }
    }

    return dsu.componentCount === 1 && usedUpgrades <= k;
  };

  // Binary search maximum T
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    if (feasible(mid)) {
      ans = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  return ans;
}

// Tests
console.log(maxStability(3, [[0,1,2,1],[1,2,3,0]], 1)); // Expected output: 2
console.log(maxStability(3, [[0,1,4,0],[1,2,3,0],[0,2,1,0]], 2)); // Expected output: 6
console.log(maxStability(3, [[0,1,1,1],[1,2,1,1],[2,0,1,1]], 0)); // Expected output: -1
