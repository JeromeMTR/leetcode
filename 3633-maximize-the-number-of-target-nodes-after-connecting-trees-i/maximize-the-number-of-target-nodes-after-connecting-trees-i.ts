// Helper function to build adjacency list from edge list
function buildAdj(n: number, edges: number[][]): number[][] {
    const adj: number[][] = Array.from({length: n}, () => []);
    for(const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }
    return adj;
}

// BFS to get at each distance <= k, how many nodes are there
function bfsDistances(adj: number[][], k: number): number[][] {
    const n = adj.length;
    // res[i][d] := number of nodes at distance ≤ d from i (at 0 .. k)
    const res: number[][] = Array.from({length: n}, () => Array(k+1).fill(0));
    for(let i = 0; i < n; ++i) {
        const q: [number, number][] = [[i, 0]];
        const visited = Array(n).fill(false);
        visited[i] = true;
        let count = 0;
        let levelCounts: number[] = Array(k+1).fill(0);
        // BFS up to max distance k
        while (q.length > 0) {
            const [node, dist] = q.shift()!;
            if (dist > k) break;
            levelCounts[dist]++;
            for (const neigh of adj[node]) {
                if (!visited[neigh] && dist+1 <= k) {
                    visited[neigh] = true;
                    q.push([neigh, dist+1]);
                }
            }
        }
        // Prefix sum: res[i][d] = total up to distance d
        res[i][0] = 1;
        for (let d = 1; d <= k; ++d)
            res[i][d] = res[i][d-1] + levelCounts[d];
    }
    return res;
}

/**
 * Calculate the maximum possible number of nodes target 
 * to each node in the first tree after connecting to
 * a node in the second tree, given distance k.
 * @param edges1 - first tree edges
 * @param edges2 - second tree edges
 * @param k - max allowed path length
 * @returns answer for each node in tree1
 */
function maxNumOfTargets(
    edges1: number[][], 
    edges2: number[][],
    k: number
): number[] {
    const n = edges1.length + 1;
    const m = edges2.length + 1;
    const adj1 = buildAdj(n, edges1);
    const adj2 = buildAdj(m, edges2);

    // Number of tree1 nodes within distance ≤ k from i
    const res1 = bfsDistances(adj1, k);

    // REQS: For each node in tree2, number of tree2 nodes within distance ≤ k-1 from j
    // (because crossing the added edge costs 1)
    let k2 = k - 1;
    let res2: number[][] = [];
    if (k2 >= 0) {
        res2 = bfsDistances(adj2, k2);
    } else {
        // k = 0, so can't reach anything in tree2 except itself
        // Each node only reaches itself
        res2 = Array.from({length: m}, () => [1]);
    }

    // For every node in tree2, get the max coverage in root of k-1
    const tree2Coverages = res2.map(arr => arr[Math.min(Math.max(k2,0), arr.length-1)]);
    const maxCoverTree2 = Math.max(...tree2Coverages);

    // For every node in tree1
    const answer: number[] = [];
    for(let u = 0; u < n; ++u) {
        // Coverage in tree1 is all nodes within ≤ k from u
        // Coverage in tree2 is max over all j: nodes within ≤ (k-1) from j
        answer.push(res1[u][k] + maxCoverTree2);
    }
    return answer;
}

// ===== IOCE (Input-output code example) =====

const edges1_1 = [[0,1],[0,2],[2,3],[2,4]];
const edges2_1 = [[0,1],[0,2],[0,3],[2,7],[1,4],[4,5],[4,6]];
const k1 = 2;
console.log('Example 1 Output:', maxNumOfTargets(edges1_1, edges2_1, k1)); // [9,7,9,8,8]

const edges1_2 = [[0,1],[0,2],[0,3],[0,4]];
const edges2_2 = [[0,1],[1,2],[2,3]];
const k2 = 1;
console.log('Example 2 Output:', maxNumOfTargets(edges1_2, edges2_2, k2)); // [6,3,3,3,3]