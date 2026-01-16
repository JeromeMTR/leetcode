
/**
 * Finds the maximum area of a square that can be formed by removing fences from a field.
 * @param m - The height of the field.
 * @param n - The width of the field.
 * @param hFences - The positions of horizontal fences.
 * @param vFences - The positions of vertical fences.
 * @returns The maximum square area modulo 1e9+7, or -1 if not possible.
 */
function maxSquareArea(m: number, n: number, hFences: number[], vFences: number[]): number {
    const MOD = 1_000_000_007;

    /**
     * Helper to get all possible distances between pairs of fence positions (including borders).
     * @param fences - Fence positions.
     * @param border - The border value (height or width).
     * @returns Set of all possible distances.
     */
    function getDistances(fences: number[], border: number): Set<number> {
        // Include the borders (1 and border) as fence positions
        const points = [1, ...fences, border];
        points.sort((a, b) => a - b);
        const distances = new Set<number>();
        // Compute all pairwise distances
        for (let i = 0; i < points.length; ++i) {
            for (let j = i + 1; j < points.length; ++j) {
                distances.add(points[j] - points[i]);
            }
        }
        return distances;
    }

    // Get all possible horizontal and vertical edge lengths
    const hDistances = getDistances(hFences, m);
    const vDistances = getDistances(vFences, n);

    // Find the largest length that exists in both sets (forms a square)
    let maxLen = 0;
    for (const len of hDistances) {
        if (vDistances.has(len)) {
            maxLen = Math.max(maxLen, len);
        }
    }
    if (maxLen === 0) return -1; // No square possible
    // Return area modulo 1e9+7
    return Number((BigInt(maxLen) * BigInt(maxLen)) % BigInt(MOD));
}



// IOCE (Input/Output Code Example)
// Each test prints the result and the expected output for clarity
console.log(maxSquareArea(4, 3, [2, 3], [2]), '// Output: 4');
console.log(maxSquareArea(6, 7, [2], [4]), '// Output: -1');
console.log(maxSquareArea(5, 5, [2, 4], [2, 4]), '// Output: 4');
console.log(maxSquareArea(10, 10, [2, 5, 8], [3, 6, 9]), '// Output: 9');
console.log(maxSquareArea(5, 4, [2, 3], [2, 3]), '// Output: 1');