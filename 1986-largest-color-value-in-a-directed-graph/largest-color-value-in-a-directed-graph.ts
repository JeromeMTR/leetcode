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