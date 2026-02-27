/**
 * IOCE
 * Inputs:
 *  - s: binary string of length n (1 <= n <= 1e5)
 *  - k: integer (1 <= k <= n)
 *
 * Output:
 *  - minimum number of operations to make all chars '1'
 *  - or -1 if impossible
 *
 * Constraints / Complexity:
 *  - Time:  O(n)
 *  - Space: O(n) (could be optimized, but O(n) is fine for 1e5)
 *
 * Edge cases:
 *  - s already all '1' => 0
 *  - k == 1 => answer is count of '0'
 *  - k == n => either 0 (all ones) or 1 (all zeros) else -1
 *  - parity constraints: when k is even, number of zeros parity cannot change
 *  - large n up to 1e5
 *
 * Key idea:
 *  Each operation flips exactly k bits.
 *  Let z be current #zeros. If we flip:
 *    - a zeros among chosen k indices, and (k-a) ones
 *    - zeros become: z' = z - a + (k-a) = z + k - 2a
 *  So from state "z zeros", we can move to z' for any a such that:
 *    0 <= a <= z
 *    0 <= k-a <= (n-z)  => a >= k-(n-z)
 *  Therefore a is in [max(0, k-(n-z)), min(k, z)].
 *  We need minimum steps to reach z = 0, starting from initial z0.
 *
 *  This becomes shortest path on states z=0..n, edges defined by possible z'.
 *  Doing naive BFS is too slow (edges per state can be large).
 *
 *  Observation: z' values form an arithmetic progression with step 2:
 *    z' = z + k - 2a
 *  for all integer a in a contiguous interval => z' is all values with same parity
 *  in a contiguous range [loZ, hiZ].
 *
 *  We can do BFS over z using a "next unvisited in ordered set" trick:
 *    - Maintain two disjoint sets of unvisited states by parity (even/odd).
 *    - For a BFS node z, compute reachable range [L, R] (clamped 0..n) with step 2.
 *    - Pull all unvisited nodes of parity (L%2) within [L, R] efficiently
 *      using DSU "next" arrays (like union-find to skip visited indices).
 */

function minOperationsToAllOnes(s: string, k: number): number {
  const n = s.length;
  let z0 = 0;
  for (let i = 0; i < n; i++) if (s[i] === "0") z0++;

  if (z0 === 0) return 0;
  if (k === 1) return z0;

  // Special quick handling for k == n
  if (k === n) {
    // One operation flips all bits
    // If already all ones => 0 (handled above)
    // If all zeros => 1
    // Otherwise impossible (because flipping all toggles both 0 and 1)
    return z0 === n ? 1 : -1;
  }

  // Parity invariant when k is even:
  // z' = z + k - 2a => z' ≡ z + k (mod 2) since 2a is even.
  // If k even => z' ≡ z (mod 2). So parity of zeros never changes.
  // To reach 0 (even), z0 must be even.
  if (k % 2 === 0 && z0 % 2 === 1) return -1;

  // DSU "next" arrays for even and odd indices (0..n) to skip visited.
  // nextEven[i] = smallest even >= i that is still unvisited; if none => n+1
  // similarly for odd.
  const nextEven = new Int32Array(n + 3);
  const nextOdd = new Int32Array(n + 3);

  // Initialize "next" so that find(i) returns i if unvisited and parity matches,
  // otherwise returns the next candidate of same parity.
  for (let i = 0; i <= n + 2; i++) {
    nextEven[i] = i;
    nextOdd[i] = i;
  }

  function find(parity: 0 | 1, x: number): number {
    if (x > n) return n + 1;
    // ensure x has correct parity
    if ((x & 1) !== parity) x++;
    if (x > n) return n + 1;

    const parent = parity === 0 ? nextEven : nextOdd;
    // path compression
    let r = x;
    while (parent[r] !== r) r = parent[r];
    while (parent[x] !== x) {
      const p = parent[x];
      parent[x] = r;
      x = p;
    }
    return r;
  }

  function erase(parity: 0 | 1, x: number): void {
    // remove x from unvisited set by pointing it to next of same parity (x+2)
    const parent = parity === 0 ? nextEven : nextOdd;
    parent[x] = find(parity, x + 2);
  }

  // Visited and distance over z states.
  const dist = new Int32Array(n + 1);
  dist.fill(-1);

  // Mark start visited; everything else unvisited in DSU sets.
  dist[z0] = 0;

  // Initialize DSU sets with all nodes unvisited, then erase visited nodes.
  // (We can just erase z0; others remain.)
  erase((z0 & 1) as 0 | 1, z0);

  // BFS queue
  const q = new Int32Array(n + 1);
  let head = 0,
    tail = 0;
  q[tail++] = z0;

  while (head < tail) {
    const z = q[head++];
    const d = dist[z];

    // Compute reachable z' range:
    // a_min = max(0, k - (n - z))
    // a_max = min(k, z)
    const aMin = Math.max(0, k - (n - z));
    const aMax = Math.min(k, z);
    if (aMin > aMax) continue;

    // z' = z + k - 2a
    // As a increases, z' decreases. So:
    // maxZ' at a = aMin, minZ' at a = aMax
    let R = z + k - 2 * aMin;
    let L = z + k - 2 * aMax;

    if (L < 0) L = 0;
    if (R > n) R = n;

    // z' parity is fixed: z' ≡ z + k (mod 2)
    const parity = ((z + k) & 1) as 0 | 1;

    // Iterate all unvisited nodes in [L, R] with step 2 using DSU
    let x = find(parity, L);
    while (x <= R) {
      dist[x] = d + 1;
      if (x === 0) return dist[x]; // reached goal
      q[tail++] = x;
      erase(parity, x);
      x = find(parity, x); // find next after erase (x now points to next)
    }
  }

  return -1;
}

/********************
 * Console log tests
 ********************/
console.log(minOperationsToAllOnes("110", 1), "=> 1");
console.log(minOperationsToAllOnes("0101", 3), "=> 2");
console.log(minOperationsToAllOnes("101", 2), "=> -1");

console.log(minOperationsToAllOnes("1111", 2), "=> 0");
console.log(minOperationsToAllOnes("0", 1), "=> 1");
console.log(minOperationsToAllOnes("01", 2), "=> -1"); // flip both: "01"->"10" can't reach "11"
console.log(minOperationsToAllOnes("00", 2), "=> 1");  // flip both -> "11"
console.log(minOperationsToAllOnes("000", 3), "=> 1"); // flip all -> "111"
console.log(minOperationsToAllOnes("0011", 2), "=> 1"); // flip first two -> "1111"
