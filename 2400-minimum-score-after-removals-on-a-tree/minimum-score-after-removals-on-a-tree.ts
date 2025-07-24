function minimumScore(nums: number[], edges: number[][]): number {
    const n = nums.length;
    // Build adjacency list for easy tree traversal
    const tree: number[][] = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        tree[u].push(v);
        tree[v].push(u);
    }

    // For each node, keep: parent, subtreeXor, in/out time for ancestor checking
    const parent = Array(n).fill(-1);
    const inTime = Array(n).fill(0);
    const outTime = Array(n).fill(0);
    const subXor = Array(n).fill(0);

    let time = 0;

    // DFS to compute Xor, parents, and in/out times
    function dfs(node: number, par: number) {
        parent[node] = par;
        inTime[node] = time++;
        let xor = nums[node];
        for (const nei of tree[node]) {
            if (nei === par) continue;
            xor ^= dfs(nei, node);
        }
        subXor[node] = xor;
        outTime[node] = time++;
        return xor;
    }

    dfs(0, -1);
    const totalXor = subXor[0];

    // Helper: is a ancestor of b?
    function isAncestor(a: number, b: number) {
        return inTime[a] < inTime[b] && outTime[a] > outTime[b];
    }

    // Precompute all edges as (child, parent) (child deeper than parent!)
    const edgeNodes: [number, number][] = [];
    for (const [u, v] of edges) {
        if (parent[v] === u) {
            edgeNodes.push([v, u]);
        } else {
            edgeNodes.push([u, v]);
        }
    }

    let ans = Infinity;

    // For every unordered pair of edges
    for (let i = 0; i < edgeNodes.length; i++) {
        for (let j = i+1; j < edgeNodes.length; j++) {
            const [a, _] = edgeNodes[i];
            const [b, __] = edgeNodes[j];

            let x = subXor[a], y = subXor[b], z: number;

            // There are three cases depending on ancestor relationships:
            if (isAncestor(a, b)) {
                // b is in the subtree of a
                // partition: [b], [a except b], [rest]
                let p = subXor[b];
                let q = subXor[a] ^ subXor[b];
                let r = totalXor ^ subXor[a];
                x = p; y = q; z = r;
            } else if (isAncestor(b, a)) {
                // a is in the subtree of b
                // partition: [a], [b except a], [rest]
                let p = subXor[a];
                let q = subXor[b] ^ subXor[a];
                let r = totalXor ^ subXor[b];
                x = p; y = q; z = r;
            } else {
                // non-overlapping
                // partition: [a], [b], [rest]
                let p = subXor[a];
                let q = subXor[b];
                let r = totalXor ^ subXor[a] ^ subXor[b];
                x = p; y = q; z = r;
            }
            let mx = Math.max(x, y, z), mn = Math.min(x, y, z);
            ans = Math.min(ans, mx - mn);
        }
    }

    return ans;
}

/* === IOCE / Complete Example ===
Example 1:
Input:
    nums = [1,5,5,4,11]
    edges = [[0,1],[1,2],[1,3],[3,4]]

minimumScore(nums, edges)
Output: 9

Example 2:
Input:
    nums = [5,5,2,4,4,2]
    edges = [[0,1],[1,2],[5,2],[4,3],[1,3]]

minimumScore(nums, edges)
Output: 0
*/

// Uncomment below for basic testing:
console.log(minimumScore([1,5,5,4,11], [[0,1],[1,2],[1,3],[3,4]])); // 9
console.log(minimumScore([5,5,2,4,4,2], [[0,1],[1,2],[5,2],[4,3],[1,3]])); // 0