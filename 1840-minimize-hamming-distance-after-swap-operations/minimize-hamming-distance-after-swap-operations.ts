/*
IOCE

Inputs:
- source: number[]         -> original array
- target: number[]         -> desired array to compare with
- allowedSwaps: number[][] -> each pair [a, b] means source[a] and source[b] can be swapped

Output:
- number -> minimum possible Hamming distance between source and target
           after performing any number of allowed swaps

Idea:
- If two indices are connected through allowed swaps, then values inside that connected component
  can be rearranged arbitrarily.
- So for each connected component:
  - collect frequencies of values from source
  - try to match values needed by target in the same component
  - unmatched positions contribute to Hamming distance

Constraints:
- 1 <= n <= 1e5
- 0 <= allowedSwaps.length <= 1e5

Time Complexity:
- O(n * alpha(n) + m * alpha(n)) where:
  - n = source.length
  - m = allowedSwaps.length
- Practically near O(n + m)

Space Complexity:
- O(n) for DSU and grouping/maps

Edge Cases:
- No allowed swaps at all
- Entire array is one connected component
- Duplicate values inside a component
- source already equals target
- source and target have completely different values
*/

class DSU {
    parent: number[];
    rank: number[];

    constructor(n: number) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = new Array(n).fill(0);
    }

    find(x: number): number {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(a: number, b: number): void {
        let rootA = this.find(a);
        let rootB = this.find(b);

        if (rootA === rootB) return;

        if (this.rank[rootA] < this.rank[rootB]) {
            this.parent[rootA] = rootB;
        } else if (this.rank[rootA] > this.rank[rootB]) {
            this.parent[rootB] = rootA;
        } else {
            this.parent[rootB] = rootA;
            this.rank[rootA]++;
        }
    }
}

function minimumHammingDistance(
    source: number[],
    target: number[],
    allowedSwaps: number[][]
): number {
    const n = source.length;
    const dsu = new DSU(n);

    // Union all allowed swap indices
    for (const [a, b] of allowedSwaps) {
        dsu.union(a, b);
    }

    // Group indices by connected component root
    const groups = new Map<number, number[]>();
    for (let i = 0; i < n; i++) {
        const root = dsu.find(i);
        if (!groups.has(root)) groups.set(root, []);
        groups.get(root)!.push(i);
    }

    let mismatches = 0;

    // For each component, compare multisets
    for (const indices of groups.values()) {
        const freq = new Map<number, number>();

        // Count source values inside this component
        for (const idx of indices) {
            freq.set(source[idx], (freq.get(source[idx]) || 0) + 1);
        }

        // Try to match target values using source frequencies
        for (const idx of indices) {
            const needed = target[idx];
            const count = freq.get(needed) || 0;

            if (count > 0) {
                freq.set(needed, count - 1);
            } else {
                mismatches++;
            }
        }
    }

    return mismatches;
}


// -------------------- Tests --------------------

console.log(
    minimumHammingDistance(
        [1, 2, 3, 4],
        [2, 1, 4, 5],
        [[0, 1], [2, 3]]
    ),
    "Expected: 1"
);

console.log(
    minimumHammingDistance(
        [1, 2, 3, 4],
        [1, 3, 2, 4],
        []
    ),
    "Expected: 2"
);

console.log(
    minimumHammingDistance(
        [5, 1, 2, 4, 3],
        [1, 5, 4, 2, 3],
        [[0, 4], [4, 2], [1, 3], [1, 4]]
    ),
    "Expected: 0"
);

console.log(
    minimumHammingDistance(
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        []
    ),
    "Expected: 0"
);

console.log(
    minimumHammingDistance(
        [1, 2, 1, 2],
        [2, 1, 2, 1],
        [[0, 1], [1, 2], [2, 3]]
    ),
    "Expected: 0"
);

console.log(
    minimumHammingDistance(
        [1, 2, 3],
        [4, 5, 6],
        [[0, 1], [1, 2]]
    ),
    "Expected: 3"
);