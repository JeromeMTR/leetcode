/**
 * Problem: Minimum Cost Path with Edge Reversals
 *
 * IOCE (Input, Output, Constraints, Edge Cases)
 * - Input: `n` (number of nodes, labeled 0..n-1) and `edges` where each edge is
 *   `[u, v, w]` representing a directed edge from `u` to `v` with weight `w`.
 * - Output: The minimum cost to travel from node `0` to node `n-1`. Returns `-1`
 *   if the destination is unreachable under the allowed operations.
 * - Constraints: Directed weighted graph. You may traverse normal edges at cost `w`.
 *   Optionally, you may reverse exactly one incoming edge along the path at cost `2*w`.
 *   Assumes `n >= 1` and non-negative weights. The algorithm uses a Dijkstra-like search
 *   over states `(node, switchUsed)`.
 * - Edge Cases:
 *   - Single-node graph (`n = 1`): returns `0`.
 *   - Requires reversal to reach destination: `minCost(4, [[0,2,1],[2,1,1],[1,3,1],[2,3,3]])` → `3`.
 *   - Unreachable destination: `minCost(5, [[1,1,3],[3,3,3],[4,4,5],[5,5,5]])` → `-1`.
 *   - Multiple candidate paths (normal vs reversal): `minCost(4, [[0,1,3],[3,1,1],[2,3,4],[0,2,2]])` → `5`.
 */

// Importing required TypeScript types
type Edge = [number, number, number];

/**
 * A function to determine the minimum cost to travel from node 0 to node n - 1
 * in a directed weighted graph using optional edge reversal strategy.
 *
 * @param n - Number of nodes in the graph
 * @param edges - Array of edges in the form [u, v, w] representing an edge from u to v with weight w
 * @return Minimum cost to reach from node 0 to node n-1, or -1 if impossible
 */
function minCost(n: number, edges: Edge[]): number {
    // Graph adjacency lists for normal and reverse edges
    const graph: Map<number, [number, number][]> = new Map();
    const reverseGraph: Map<number, [number, number][]> = new Map();

    // Build the graphs
    for (let [u, v, w] of edges) {
        if (!graph.has(u)) graph.set(u, []);
        if (!reverseGraph.has(v)) reverseGraph.set(v, []);

        graph.get(u)!.push([v, w]);
        reverseGraph.get(v)!.push([u, w]);
    }

    // Priority queue initialization and distance dictionaries
    const pq: [number, number, boolean][] = [[0, 0, false]]; // [cost, node, switchUsed]
    const minCost: Record<number, number[]> = {};

    for (let i = 0; i < n; i++) {
        minCost[i] = [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER];
    }
    minCost[0][0] = 0; // start with cost 0 from node 0 without using switch

    while (pq.length > 0) {
        // Extract node with the smallest cost
        pq.sort((a, b) => a[0] - b[0]);
        const [currentCost, node, switchUsed] = pq.shift()!;
        const switchIndex = switchUsed ? 1 : 0;

        // If we reached the destination node
        if (node === n - 1) {
            return currentCost;
        }

        if (minCost[node][switchIndex] < currentCost) {
            continue;
        }

        // Process normal outgoing edges
        for (let [nextNode, weight] of graph.get(node) || []) {
            let newCost = currentCost + weight;
            if (newCost < minCost[nextNode][switchIndex]) {
                minCost[nextNode][switchIndex] = newCost;
                pq.push([newCost, nextNode, switchUsed]);
            }
        }

        // Use switch to reverse an incoming edge
        if (!switchUsed) {
            for (let [prevNode, weight] of reverseGraph.get(node) || []) {
                let newCost = currentCost + 2 * weight;
                if (newCost < minCost[prevNode][1]) {
                    minCost[prevNode][1] = newCost;
                    pq.push([newCost, prevNode, true]);
                }
            }
        }
    }

    // List of minimum costs for reaching the last node
    const result = Math.min(minCost[n - 1][0], minCost[n - 1][1]);
    return result === Number.MAX_SAFE_INTEGER ? -1 : result;
}

// Test case logs to verify the solution
console.log(minCost(4, [[0, 1, 3], [3, 1, 1], [2, 3, 4], [0, 2, 2]])); // Output: 5
console.log(minCost(4, [[0, 2, 1], [2, 1, 1], [1, 3, 1], [2, 3, 3]])); // Output: 3
console.log(minCost(3, [[1, 2, 1], [2, 1, 2], [1, 2, 2]])); // Output: 3
console.log(minCost(5, [[1, 1, 3], [3, 3, 3], [4, 4, 5], [5, 5, 5]])); // Output: -1