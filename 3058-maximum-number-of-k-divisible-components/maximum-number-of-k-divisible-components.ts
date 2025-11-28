/**
 * IOCE (Inputs, Outputs, Constraints, Examples)
 * 
 * Inputs:
 *  - n: number of nodes in the tree.
 *  - edges: number[][], each edge [a, b] represents an undirected edge.
 *  - values: number[], values[i] is the value of node i.
 *  - k: number, desired divisor.
 * 
 * Outputs:
 *  - Maximum number of components you can get after removing edges, so that each component's sum is divisible by k.
 * 
 * Constraints:
 *  - 1 <= n <= 3 * 10^4
 *  - 0 <= ai, bi < n
 *  - values.length == n
 *  - 0 <= values[i] <= 10^9
 *  - 1 <= k <= 10^9
 *  - sum(values) is divisible by k
 *  - edges makes a tree
 * 
 * Examples:
 *  - Example 1:
 *    n = 5, edges = [[0,2],[1,2],[1,3],[2,4]], values = [1,8,1,4,4], k = 6
 *    Output: 2
 *  - Example 2:
 *    n = 7, edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]], values = [3,0,6,1,5,2,1], k = 3
 *    Output: 3
 */

function maxKDivisibleComponents(
    n: number,
    edges: number[][],
    values: number[],
    k: number
): number {

    // Build adjacency list
    const adj: number[][] = Array.from({length: n}, () => []);
    for (const [u,v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }

    // Edge cuts counter
    let cuts = 0;

    /**
     * Post-order traversal: returns the total sum of subtree rooted at `node`.
     * 
     * For every child, if the child's subtree sum is divisible by k, we can cut the connecting edge,
     * increasing the number of possible components. We increase the cut count, but we DONT propagate that
     * child's sum upward, as the subtree is considered a separate component.
     * 
     * Otherwise, add the subtree sum to the parent's for further processing.
     */
    function dfs(node: number, parent: number): number {
        let sum = values[node];
        for (const nei of adj[node]) {
            if (nei === parent) continue;
            const childSum = dfs(nei, node);
            // If the child's subtree sum is divisible by k, we can make a valid component here.
            if (childSum % k === 0) {
                cuts++;
                // Do not propagate child's sum; it's now a component of its own.
            } else {
                sum += childSum;
            }
        }
        return sum;
    }

    // Start DFS from the root (node 0, or any node).
    // The problem guarantees the sum(values) is divisible by k
    // so the whole tree is always a valid single component.
    dfs(0, -1);

    // The maximum number of components is number of cuts + 1 (original connected component).
    return cuts + 1;
}