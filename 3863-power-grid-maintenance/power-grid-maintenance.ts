// DSU (Disjoint Set Union / Union-Find) with Path Compression for static components
class DSU {
    parent: number[];

    constructor(public size: number) {
        this.parent = Array.from({ length: size }, (_, i) => i);
    }

    // Union operation: merge v into u's component
    join(u: number, v: number) {
        this.parent[this.find(v)] = this.find(u);
    }

    // Find operation (with path compression)
    find(x: number): number {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }
}

/**
 * Power Station Maintenance Query Solver
 * @param c         number of stations (1-based ids)
 * @param connections  bidirectional connections ([u, v] pairs)
 * @param queries   queries (each is [1,x] or [2,x])
 * @returns number[] outputs for `type 1` queries (in order)
 */
function processQueries(
    c: number,
    connections: number[][],
    queries: number[][]
): number[] {
    // 1. Build static connected components using DSU
    const dsu = new DSU(c + 1); // Use c+1 for convenience (1-based)

    for (const [u, v] of connections) {
        dsu.join(u, v);
    }

    // 2. Track station online/offline status.
    //    We precompute all final station statuses after all actions, then process queries in reverse to restore state.
    const online: boolean[] = new Array<boolean>(c + 1).fill(true);
    const offlineCounts: number[] = new Array<number>(c + 1).fill(0); // How many times [2, x] fires for station x

    // Mark all offlines (this is the "final" offline state before reversals)
    for (const [op, x] of queries) {
        if (op === 2) {
            online[x] = false;
            offlineCounts[x]++;
        }
    }

    // 3. For each grid's root, track the *smallest online station* (initally).
    //    We use a Map<gridRoot, minOnlineStationInGrid>
    const minOnlineStationInGrid = new Map<number, number>();
    for (let i = 1; i <= c; ++i) {
        if (online[i]) {
            const root = dsu.find(i);
            if (!minOnlineStationInGrid.has(root) || i < minOnlineStationInGrid.get(root)!) {
                minOnlineStationInGrid.set(root, i);
            }
        }
    }

    const ans: number[] = [];

    // 4. Process queries in *reverse*, restoring stations as appropriate, maintaining grid mins
    for (let q = queries.length - 1; q >= 0; --q) {
        const [op, x] = queries[q];
        const root = dsu.find(x);
        const minOnline = minOnlineStationInGrid.get(root) ?? -1;

        if (op === 1) {
            // Maintenance check
            if (online[x]) {
                ans.push(x); // If online, resolve by itself
            } else {
                ans.push(minOnline); // Else, resolve by grid min Online station (could be -1 if none)
            }
        }
        if (op === 2) {
            // Undo offline: as we process in reverse, we "turn station x back online" if this was its last disable
            if (offlineCounts[x] > 1) {
                offlineCounts[x]--;
            } else {
                online[x] = true;
                if (minOnlineStationInGrid.get(root) === undefined || minOnlineStationInGrid.get(root)! === -1 || x < minOnlineStationInGrid.get(root)!) {
                    minOnlineStationInGrid.set(root, x); // Update grid's minimal online station if needed
                }
            }
        }
    }

    // Since answered in reverse, reverse ans before returning
    return ans.reverse();
}

// ---- I/O FOR TESTING (Uncomment for Playground/Local Test) ----
/*
const c1 = 5;
const connections1 = [[1,2],[2,3],[3,4],[4,5]];
const queries1 = [[1,3],[2,1],[1,1],[2,2],[1,2]];
console.log(processQueries(c1, connections1, queries1)); // [3,2,3]

const c2 = 3;
const connections2: number[][] = [];
const queries2 = [[1,1],[2,1],[1,1]];
console.log(processQueries(c2, connections2, queries2)); // [1,-1]
*/