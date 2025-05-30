/**
 * Function to find closest meeting node reachable from both starting nodes.
 * @param edges - adjacency list representing at most one edge from each node
 * @param node1 - starting node 1
 * @param node2 - starting node 2
 * @returns Index of the best node meeting the problem requirements
 */
function closestMeetingNode(edges: number[], node1: number, node2: number): number {
    // Helper: compute distances from a given node to all reachable nodes
    function getDistances(start: number): number[] {
        const n = edges.length;
        const dist = new Array<number>(n).fill(Infinity);
        let curr = start;
        let d = 0;
        // Since each node has at most one outgoing edge, this is linear
        while (curr !== -1 && dist[curr] === Infinity) {
            dist[curr] = d;
            curr = edges[curr];
            d++;
        }
        return dist;
    }

    const dist1 = getDistances(node1);
    const dist2 = getDistances(node2);

    let minMaxDist = Infinity;
    let result = -1;
    for (let i = 0; i < edges.length; i++) {
        // Only nodes reachable from BOTH nodes
        if (dist1[i] !== Infinity && dist2[i] !== Infinity) {
            const maxDist = Math.max(dist1[i], dist2[i]);
            if (maxDist < minMaxDist || (maxDist === minMaxDist && i < result)) {
                minMaxDist = maxDist;
                result = i;
            }
        }
    }
    return result;
}