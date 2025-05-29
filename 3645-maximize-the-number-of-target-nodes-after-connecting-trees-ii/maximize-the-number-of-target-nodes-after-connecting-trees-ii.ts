// TypeScript implementation
// I/OCE below

function maxNumberOfTargetNodes(
    edges1: number[][], 
    edges2: number[][]
): number[] {
    // Utility function: build adjacency list
    function buildGraph(edges: number[][], n: number): number[][] {
        const graph: number[][] = Array.from({length: n}, () => []);
        for (const [u,v] of edges) {
            graph[u].push(v);
            graph[v].push(u);
        }
        return graph;
    }
    // BFS to get parity labeling (even/odd depths)
    function bfsParities(graph: number[][], n: number): number[] {
        const parities: number[] = Array(n).fill(-1);
        const queue: [number, number][] = [[0, 0]]; // [node, parity]
        parities[0] = 0;
        let head = 0;
        while (head < queue.length) {
            const [node, parity] = queue[head++];
            for (const nei of graph[node]) {
                if (parities[nei] === -1) {
                    parities[nei] = parity ^ 1;
                    queue.push([nei, parity ^ 1]);
                }
            }
        }
        return parities;
    }

    // Build graphs
    const n = edges1.length + 1;
    const m = edges2.length + 1;
    const graph1 = buildGraph(edges1, n);
    const graph2 = buildGraph(edges2, m);

    // Get parity arrays (0=even, 1=odd)
    const parities1 = bfsParities(graph1, n);
    const parities2 = bfsParities(graph2, m);

    // Count even and odd nodes
    let even1 = 0, odd1 = 0;
    for (let p of parities1) if (p === 0) even1++; else odd1++;
    let even2 = 0, odd2 = 0;
    for (let p of parities2) if (p === 0) even2++; else odd2++;

    // For each node in graph1, determine answer
    const answer: number[] = [];
    for (let i = 0; i < n; ++i) {
        // For node i in tree1:
        // If parities1[i] == 0:
        //   X_even = even1
        //   X_odd = odd1
        // Else:
        //   X_even = odd1
        //   X_odd = even1
        let X_even = parities1[i] === 0 ? even1 : odd1;
        let X_odd  = parities1[i] === 0 ? odd1  : even1;
        // For tree2:
        // The optimal is to pick either odd2 or even2, whichever maximizes the answer.
        // Since we can always attach to any node in tree2
        // The parity swap works out as described above
        let maxNodes = Math.max(
            X_even + odd2, 
            X_odd  + even2
        );
        answer.push(maxNodes);
    }
    return answer;
}

// Example IOCE:

// Example 1:
const edges1a = [[0,1],[0,2],[2,3],[2,4]];
const edges2a = [[0,1],[0,2],[0,3],[2,7],[1,4],[4,5],[4,6]];
console.log(maxNumberOfTargetNodes(edges1a, edges2a)); // [8,7,7,8,8]

// Example 2:
const edges1b = [[0,1],[0,2],[0,3],[0,4]];
const edges2b = [[0,1],[1,2],[2,3]];
console.log(maxNumberOfTargetNodes(edges1b, edges2b)); // [3,6,6,6,6]