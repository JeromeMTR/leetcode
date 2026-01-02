
/**
 * IOCE:
 * I: `colors` as a lowercase string of length n (nodes 0..n-1),
 *    `edges` as directed pairs [u, v] with 0 <= u, v < n.
 * O: The maximum count of any single color along a path; return -1 if the graph contains a cycle.
 * C: Time ~ O(n + 26 * m) where m = edges.length (constant 26 letters), Space ~ O(n * 26 + m).
 * E: Cycles (self-loops or longer cycles) -> -1; multiple sources; disconnected graphs;
 *    all same color; single node; large sparse graphs.
 */


function largestPathValue(colors: string, edges: number[][]): number {
    const n = colors.length;
    const adj: number[][] = Array.from({ length: n }, () => []);
    const indegree = new Array(n).fill(0);

    // Build the graph
    for (const [u, v] of edges) {
        adj[u].push(v);
        indegree[v]++;
    }

    // count[node][color] = max path count arriving at node of that color
    // colors are 26 lowercase letters
    const count: number[][] = Array.from({ length: n }, () => new Array(26).fill(0));

    const queue: number[] = [];
    // Initialize: Queue nodes with zero indegree (sources)
    for (let i = 0; i < n; ++i) {
        if (indegree[i] === 0) queue.push(i);
        count[i][colors.charCodeAt(i) - 97] = 1; // node itself counts as 1 of its color
    }

    let visited = 0;
    let answer = 0;

    // Topological sort via BFS
    while (queue.length > 0) {
        const u = queue.shift()!;
        visited++;
        // Update answer: max count of any color at node u
        for (let c = 0; c < 26; ++c) {
            answer = Math.max(answer, count[u][c]);
        }

        // For each neighbor, propagate color counts
        for (const v of adj[u]) {
            for (let c = 0; c < 26; ++c) {
                // If it's the neighbor's color add 1 if coming through u
                const plus = (c === colors.charCodeAt(v) - 97) ? 1 : 0;
                // Take max: keep existing or propagate
                count[v][c] = Math.max(count[v][c], count[u][c] + plus);
            }
            indegree[v]--;
            if (indegree[v] === 0) queue.push(v);
        }
    }

    // If not all nodes are visited, a cycle exists.
    return visited === n ? answer : -1;
}

// ---- Pretty Graph Test Logger ----
function buildAdjList(n: number, edges: number[][]): number[][] {
    const adj: number[][] = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) adj[u].push(v);
    for (const a of adj) a.sort((x, y) => x - y);
    return adj;
}

function formatAdj(adj: number[][]): string {
    const lines: string[] = [];
    const width = Math.max(...adj.map((_, i) => String(i).length), 1);
    for (let i = 0; i < adj.length; i++) {
        const node = String(i).padStart(width, ' ');
        lines.push(`${node} -> [${adj[i].join(', ')}]`);
    }
    return lines.join('\n');
}

function printGraphCase(name: string, colors: string, edges: number[][], expected: number) {
    const n = colors.length;
    const got = largestPathValue(colors, edges);
    const pass = got === expected;
    const adj = buildAdjList(n, edges);
    const header = `\n=== ${name} ===`;
    const meta = `nodes=${n} colors="${colors}"`;
    const graph = formatAdj(adj);
    const status = pass ? 'PASS ✅' : `FAIL ❌ (got=${got})`;
    console.log(`${header}\n${meta}\n${graph}\nexpected=${expected}  ${status}`);
}

// ---- Testcases ----
printGraphCase(
    'Example 1 (DAG)',
    'abaca',
    [[0, 1], [0, 2], [2, 3], [3, 4]],
    3
);

printGraphCase(
    'Example 2 (Cycle)',
    'a',
    [[0, 0]],
    -1
);

printGraphCase(
    'Multiple colors path',
    'zzzz',
    [[0, 1], [1, 2], [2, 3]],
    4
);