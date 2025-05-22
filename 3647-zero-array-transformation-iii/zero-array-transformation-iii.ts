// IOCE (Input, Output, Constraints, Example):
//
// Input: 
//  - nums: number[]
//  - queries: number[][]
// Output: 
//  - number (max number of queries removable such that nums can be zeroed; -1 if impossible)
// Constraints: 
//  - 1 <= nums.length <= 1e5
//  - 1 <= queries.length <= 1e5
// Example:
//   nums = [2,0,2], queries = [[0,2],[0,2],[1,1]]
//   Output: 1

function maxRemovableQueries(nums: number[], queries: number[][]): number {
    const n = nums.length;
    const m = queries.length;

    // 1. Build coverage array using a sweep line approach.
    const cover: number[] = new Array(n + 1).fill(0); // +1 for easier sweep

    for (const [l, r] of queries) {
        cover[l] += 1;
        cover[r + 1] -= 1;
    }

    // Compute prefix sum to get actual cover count for each index
    for (let i = 1; i < n; ++i) {
        cover[i] += cover[i - 1];
    }
    cover.length = n; // trim to length n

    // 2. Check baseline possibility (if any position is insufficient) 
    for (let i = 0; i < n; ++i) {
        if (cover[i] < nums[i]) {
            return -1; // Not enough total coverage to reach zero at position i
        }
    }

    // 3. Compute diff array: cover[i] - nums[i] (the "redundant over-supply" at each i)
    const diff: number[] = new Array(n);
    for (let i = 0; i < n; ++i) {
        diff[i] = cover[i] - nums[i];
        // Because cover[i] >= nums[i] by earlier check, so diff[i] >= 0
    }

    // 4. Build Sparse Table for RMQ (min in range)
    // Sparse table is most efficient for fast min queries on static arrays

    const log2 = new Array(n + 1).fill(0);
    for (let i = 2; i <= n; ++i) log2[i] = log2[i >> 1] + 1;

    const K = log2[n] + 1;
    const st: number[][] = Array.from({length: n}, () => new Array(K));

    for (let i = 0; i < n; ++i) st[i][0] = diff[i];
    for (let k = 1; (1 << k) <= n; ++k) {
        for (let i = 0; i + (1 << k) <= n; ++i) {
            st[i][k] = Math.min(st[i][k - 1], st[i + (1 << (k - 1))][k - 1]);
        }
    }

    function query(l: number, r: number): number {
        // get min diff in [l, r]
        const k = log2[r - l + 1];
        return Math.min(st[l][k], st[r - (1 << k) + 1][k]);
    }

    // 5. For each query, check if it's removable
    let removable = 0;
    for (const [l, r] of queries) {
        if (query(l, r) >= 1) {
            // If all covered positions have at least one spare, it's removable
            removable += 1;
        }
    }

    return removable;
}

// ----------- Test Examples (from prompt) ------------

const ex1_nums = [2,0,2], ex1_queries = [[0,2],[0,2],[1,1]];
console.log(maxRemovableQueries(ex1_nums, ex1_queries)); // 1

const ex2_nums = [1,1,1,1], ex2_queries = [[1,3],[0,2],[1,3],[1,2]];
console.log(maxRemovableQueries(ex2_nums, ex2_queries)); // 2

const ex3_nums = [1,2,3,4], ex3_queries = [[0,3]];
console.log(maxRemovableQueries(ex3_nums, ex3_queries)); // -1