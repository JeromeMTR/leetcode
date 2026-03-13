/**
 * IOCE
 * ----
 * Inputs:
 *  - mountainHeight: number (H) => initial mountain height
 *  - workerTimes: number[] (n) => base time per worker
 *
 * Output:
 *  - number => minimum seconds so that workers (simultaneously) can reduce total height to 0
 *
 * Constraints:
 *  - 1 <= H <= 1e5
 *  - 1 <= n <= 1e4
 *  - 1 <= workerTimes[i] <= 1e6
 *
 * Key idea:
 *  - If a worker with base time t reduces by x, time needed:
 *      t*(1 + 2 + ... + x) = t * x*(x+1)/2
 *  - For a given time limit T, each worker can contribute some maximum x such that:
 *      t * x*(x+1)/2 <= T
 *    Sum these x across workers; if sum >= H, then T is feasible.
 *  - Binary search the minimum feasible T.
 *
 * Time complexity:
 *  - Feasibility check: O(n)
 *  - Binary search over time: O(n * log(upperBound))
 *  - upperBound can be set to: minT * H*(H+1)/2 where minT = min(workerTimes)
 *  - Overall: O(n * log(minT * H^2)) which is fast for given constraints.
 *
 * Space complexity:
 *  - O(1) extra (excluding input)
 *
 * Edge cases:
 *  - Only one worker
 *  - Very large times (use BigInt to avoid overflow)
 *  - Many workers where sum contributions quickly exceeds H (early stop)
 */

function minNumberOfSeconds(mountainHeight: number, workerTimes: number[]): number {
  const H = mountainHeight;

  // Use BigInt throughout the binary search to avoid overflow:
  // max time can be ~ 1e6 * (1e5*1e5)/2 = 5e15, fits in 64-bit but not safe in JS number.
  const minT = workerTimes.reduce((a, b) => Math.min(a, b), Infinity);
  const bigH = BigInt(H);

  // Upper bound: fastest worker does all the work
  let hi =
    BigInt(minT) * (bigH * (bigH + 1n)) / 2n; // t * H*(H+1)/2
  let lo = 0n;

  // Helper: compute max x such that t * x*(x+1)/2 <= T
  // We can binary search x in [0, H] per worker (H is only 1e5), but that's too slow for n=1e4.
  // Instead, solve quadratic:
  // x^2 + x - (2T/t) <= 0
  // x = floor((sqrt(1 + 4*(2T/t)) - 1)/2) = floor((sqrt(1 + 8T/t) - 1)/2)
  // We'll compute via integer sqrt on BigInt.
  function isqrt(n: bigint): bigint {
    if (n < 0n) throw new Error("isqrt of negative");
    if (n < 2n) return n;
    // Newton's method
    let x0 = n;
    let x1 = (x0 + n / x0) >> 1n;
    while (x1 < x0) {
      x0 = x1;
      x1 = (x0 + n / x0) >> 1n;
    }
    return x0;
  }

  function maxUnits(t: number, T: bigint): number {
    const bt = BigInt(t);
    if (T < bt) return 0;

    // k = floor( (8T)/t )
    const k = (8n * T) / bt;
    const disc = 1n + k; // 1 + 8T/t
    const s = isqrt(disc);
    // x = floor((s - 1)/2)
    let x = (s - 1n) / 2n;
    if (x > bigH) x = bigH;

    // Correct potential off-by-one due to floor effects:
    // ensure t*x*(x+1)/2 <= T
    while (x > 0n && (bt * x * (x + 1n)) / 2n > T) x--;
    while (x < bigH && (bt * (x + 1n) * (x + 2n)) / 2n <= T) x++;

    return Number(x);
  }

  function feasible(T: bigint): boolean {
    let sum = 0;
    for (const t of workerTimes) {
      sum += maxUnits(t, T);
      if (sum >= H) return true; // early stop
    }
    return sum >= H;
  }

  // Binary search: find minimal T with feasible(T)=true
  while (lo < hi) {
    const mid = (lo + hi) >> 1n;
    if (feasible(mid)) hi = mid;
    else lo = mid + 1n;
  }

  // lo is BigInt; convert to number (safe because result <= ~5e15 < 2^53? Actually 5e15 < 9e15, safe)
  // Still, JS number can exactly represent integers only up to 2^53 (~9e15), so it's safe here.
  return Number(lo);
}

/* -------------------- Console log tests -------------------- */
console.log(minNumberOfSeconds(4, [2, 1, 1]), "expected", 3);
console.log(minNumberOfSeconds(10, [3, 2, 2, 4]), "expected", 12);
console.log(minNumberOfSeconds(5, [1]), "expected", 15);

// Additional sanity tests
console.log(minNumberOfSeconds(1, [100, 1, 50]), "expected", 1); // fastest worker removes 1 in 1 second
console.log(minNumberOfSeconds(2, [1]), "expected", 3); // 1 + 2 = 3
console.log(minNumberOfSeconds(3, [2]), "expected", 12); // 2*(1+2+3)=12
console.log(minNumberOfSeconds(3, [1, 1, 1]), "expected", 2); // in 2s each worker can do 1 (since 1*(1)=1 <=2, but 1*(1+2)=3>2)