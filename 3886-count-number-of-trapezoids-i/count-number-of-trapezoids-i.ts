/**
 * Counts the number of trapezoids that can be formed from a set of points.
 * A trapezoid (in this context) is defined by selecting two distinct horizontal levels (y values),
 * and choosing two points from each level to form the two parallel bases. The x-coordinates are irrelevant.
 *
 * Mathematically, for each y-level with n points we have C(n, 2) ways to choose a base (an unordered pair).
 * The total number of trapezoids is the sum over all unordered pairs of distinct levels of
 *   C(n_i, 2) * C(n_j, 2).
 * We compute this efficiently by accumulating previous base counts:
 *   Let e_k = C(n_k, 2). Then sum_{i < j} e_i * e_j = prefix accumulation of e_i.
 *
 * We use BigInt with modulo 1_000_000_007 to avoid overflow for large inputs.
 *
 * @param points Array of points where each point is [x, y]. Only y is used.
 * @returns Number of trapezoids modulo 1_000_000_007.
 */
function countTrapezoids(points: number[][]): number {
    const countsByY: Map<number, number> = new Map();
    const MOD: bigint = 1000000007n;

    // Count how many points lie on each horizontal y-level.
    for (const [, y] of points) {
        countsByY.set(y, (countsByY.get(y) || 0) + 1);
    }

    let trapezoidCount: bigint = 0n; // Accumulated answer
    let accumulatedBases: bigint = 0n; // Running sum of previous e_i values

    for (const count of countsByY.values()) {
        // Skip levels with fewer than 2 points (no base can be formed).
        if (count < 2) continue;

        // Number of unordered point pairs on this level: C(count, 2).
        const basesOnLevel: bigint = (BigInt(count) * BigInt(count - 1)) / 2n;

        // Add contribution pairing this level's bases with all previous levels' bases.
        trapezoidCount = (trapezoidCount + basesOnLevel * accumulatedBases) % MOD;

        // Update accumulated base count for future pairings.
        accumulatedBases = (accumulatedBases + basesOnLevel) % MOD;
    }

    return Number(trapezoidCount);
}

// Example1:
console.log(countTrapezoids([[1,0],[2,0],[3,0],[2,2],[3,2]])); // 3
// Example2:
console.log(countTrapezoids([[0,0],[1,0],[0,1],[2,1]])); // 1
// Custom:
console.log(countTrapezoids([[1,1],[3,1],[2,1],[3,2],[1,2],[3,4],[4,4],[5,5]])); // Try edge cases
// Previous failed:
console.log(countTrapezoids([[3,1],[2,1],[4,1],[2,2],[3,2]])); // Should be 3
console.log(countTrapezoids([[1,2],[1,2],[1,2],[1,3],[1,3],[1,3]])); // Should be 4
console.log(countTrapezoids([[1,1],[3,1],[2,1],[3,3],[3,4],[4,4],[4,5],[5,5]])); // Should be 4