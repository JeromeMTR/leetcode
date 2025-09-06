/**
 * For each query [l, r], computes sum of depths (steps to zero),
 * then returns ceil(sum / 2) for each,
 * and returns total sum over all queries.
 *
 * IOCE included below.
 */

function sumOfDepths(l: number, r: number): number {
    let total = 0;
    let t = 1;
    while (true) {
        // leftmost value for this depth
        let lo = Math.max(l, Math.pow(4, t - 1));
        let hi = Math.min(r, Math.pow(4, t) - 1);
        if (lo > hi) break;
        let cnt = hi - lo + 1;
        total += cnt * t;
        t++;
        // avoid infinite loop when t is too large
        if (lo === Math.pow(4, t - 1) && hi === Math.pow(4, t) - 1 && hi === r) break;
    }
    return total;
}

function minOperationsForQuery(l: number, r: number): number {
    const totalDepths = sumOfDepths(l, r);
    // Since each op reduces 2 numbers, total needed is ceil(totalDepths / 2)
    return Math.floor((totalDepths + 1) / 2);
}

function minOperationsSum(queries: number[][]): number {
    let answer = 0;
    for (const [l, r] of queries) {
        answer += minOperationsForQuery(l, r);
    }
    return answer;
}

// --- IOCE (Input Output Commented Example) ---

// Example 1
const queries1 = [[1,2],[2,4]];
console.log(minOperationsSum(queries1)); // Output: 3

// Example 2
const queries2 = [[2,6]];
console.log(minOperationsSum(queries2)); // Output: 4

// Edge Case: Large range
// queries3 = [[1, 100000000]];
// console.log(minOperationsSum(queries3));
// Should run in small time due to log_4(N) complexity.


// --- Comments ---
// sumOfDepths: For given l and r, finds by ranges whose depth is t.
// minOperationsForQuery: Uses total depths sum, divides by 2 (two elements per operation).
// minOperationsSum: Accumulates over all queries.