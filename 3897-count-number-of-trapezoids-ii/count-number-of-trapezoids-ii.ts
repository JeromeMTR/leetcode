/*
IOCE:

Input:
    - points: number[][]
        A list of 2D points [(x1, y1), (x2, y2), ...] each with integer coordinates.

Output:
    - number
        The number of unique convex quadrilaterals (trapezoids) with at least one pair of parallel sides.

Constraints:
    - 4 <= points.length <= 500
    - -1000 <= x_i, y_i <= 1000
    - All points are distinct.

Examples:
    Input:  [[-3,2],[3,0],[2,3],[3,2],[2,-3]]
    Output: 2

    Input: [[0,0],[1,0],[0,1],[2,1]]
    Output: 1
*/

function countTrapezoid(points: number[][]): number {
    const n = points.length;
    let result = 0;

    // To avoid counting duplicates, store unique quadruples as their sorted indices string
    const seen = new Set<string>();

    // Helper to sort four indices and join their string
    function quadKey(indices: number[]): string {
        indices.sort((a, b) => a - b);
        return indices.join(',');
    }

    // Helper to compute slope as a reduced fraction string, and handle vertical/horizontal cases
    function getSlope(p: number[], q: number[]): string {
        const dy = q[1] - p[1];
        const dx = q[0] - p[0];
        if (dx === 0) return 'Infinity';
        if (dy === 0) return '0';
        // Reduce dy/dx to simplest form
        const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
        let sign = 1;
        let num = dy, denom = dx;
        if (num < 0) { num = -num; sign *= -1; }
        if (denom < 0) { denom = -denom; sign *= -1; }
        const d = gcd(num, denom);
        return `${sign * num / d}/${denom / d}`;
    }

    // Generate all quadruples
    for (let a = 0; a < n; a++) {
        for (let b = a + 1; b < n; b++) {
            for (let c = b + 1; c < n; c++) {
                for (let d = c + 1; d < n; d++) {
                    // All quadruples: (a,b,c,d)
                    const quad = [a, b, c, d];
                    const qp = [points[a], points[b], points[c], points[d]];

                    // Need to check all combinations for at least one pair of parallel sides
                    // The possible pairs of opposite sides for a convex quadrilateral:
                    //
                    // Consider all 3 ways to "pair up" the sides (across opp. sides)
                    // For each, check if two segments have the same slope

                    // (ab, cd), (ac, bd), (ad, bc)

                    // We'll also need to check convexity, to avoid concave quads!

                    // Helper to check if quad is convex
                    function isConvex(quadPoints: number[][]): boolean {
                        // For the four corners in order, check the cross products
                        // Convex if all cross products have the same sign
                        let sign = 0;
                        for (let i = 0; i < 4; i++) {
                            const p0 = quadPoints[i];
                            const p1 = quadPoints[(i + 1) % 4];
                            const p2 = quadPoints[(i + 2) % 4];
                            const dx1 = p1[0] - p0[0];
                            const dy1 = p1[1] - p0[1];
                            const dx2 = p2[0] - p1[0];
                            const dy2 = p2[1] - p1[1];
                            const cross = dx1 * dy2 - dy1 * dx2;
                            if (cross !== 0) {
                                if (sign === 0) sign = Math.sign(cross);
                                else if (Math.sign(cross) !== sign) return false;
                            }
                        }
                        return sign !== 0; // Ensure not all collinear!
                    }

                    // Generate all 24 orders of the quad (for convexity test) but we only need to try all 3 diagonals
                    // Let's generate each possible side pairing and check for parallel pair and convex shape

                    let found = false;
                    // 3 distinct pairs of opposite sides: AB, CD; AC, BD; AD, BC
                    // Each may require checking the correct vertex order for convexity

                    // Pair 1: ab, cd
                    const orders1 = [
                        [a, b, c, d],
                        [a, b, d, c],
                        [b, a, c, d],
                        [b, a, d, c],
                        [c, d, a, b],
                        [c, d, b, a],
                        [d, c, a, b],
                        [d, c, b, a],
                    ];
                    for (const ord of orders1) {
                        const quadPoints = ord.map(i => points[i]);
                        // check ab, cd
                        const s1 = getSlope(points[ord[0]], points[ord[1]]);
                        const s2 = getSlope(points[ord[2]], points[ord[3]]);
                        if (s1 === s2 && isConvex(quadPoints)) {
                            found = true;
                            break;
                        }
                    }
                    if (found) {
                        const key = quadKey(quad);
                        if (!seen.has(key)) {
                            seen.add(key);
                            result++;
                        }
                        continue;
                    }

                    // Pair 2: ac, bd
                    const orders2 = [
                        [a, c, b, d],
                        [a, c, d, b],
                        [c, a, b, d],
                        [c, a, d, b],
                        [b, d, a, c],
                        [b, d, c, a],
                        [d, b, a, c],
                        [d, b, c, a],
                    ];
                    for (const ord of orders2) {
                        const quadPoints = ord.map(i => points[i]);
                        // check ac, bd
                        const s1 = getSlope(points[ord[0]], points[ord[1]]);
                        const s2 = getSlope(points[ord[2]], points[ord[3]]);
                        if (s1 === s2 && isConvex(quadPoints)) {
                            found = true;
                            break;
                        }
                    }
                    if (found) {
                        const key = quadKey(quad);
                        if (!seen.has(key)) {
                            seen.add(key);
                            result++;
                        }
                        continue;
                    }

                    // Pair 3: ad, bc
                    const orders3 = [
                        [a, d, b, c],
                        [a, d, c, b],
                        [d, a, b, c],
                        [d, a, c, b],
                        [b, c, a, d],
                        [b, c, d, a],
                        [c, b, a, d],
                        [c, b, d, a],
                    ];
                    for (const ord of orders3) {
                        const quadPoints = ord.map(i => points[i]);
                        // check ad, bc
                        const s1 = getSlope(points[ord[0]], points[ord[1]]);
                        const s2 = getSlope(points[ord[2]], points[ord[3]]);
                        if (s1 === s2 && isConvex(quadPoints)) {
                            found = true;
                            break;
                        }
                    }
                    if (found) {
                        const key = quadKey(quad);
                        if (!seen.has(key)) {
                            seen.add(key);
                            result++;
                        }
                        continue;
                    }
                }
            }
        }
    }
    return result;
}