/*
IOCE

1) Inputs
- nums: number[] of length n
- queries: number[][] of length q
  where each query = [l, r, k, v]

2) Output
- Return a number:
  the bitwise XOR of all elements in nums after applying all queries.

3) Constraints
- 1 <= n <= 1000
- 1 <= nums[i] <= 1e9
- 1 <= q <= 1000
- 0 <= l <= r < n
- 1 <= k <= n
- 1 <= v <= 1e5

4) Time / Space Complexity
- Direct simulation works well because constraints are small.
- For each query, we visit indices:
    l, l+k, l+2k, ...
  until > r
- Worst-case total operations:
    O(q * n)
  because k can be 1.
- Final XOR pass:
    O(n)
- Total: O(q * n + n) = O(q * n)
- Space: O(1) extra space (ignoring output)

5) Edge Cases
- Single element array
- Single query
- k > (r - l), so only one index is updated
- v = 1, so query changes nothing
- Multiple queries affecting same index many times
- Large multiplication values:
  must use modulo 1e9+7 after every update
- XOR should be computed on final values only

Approach
- Simulate each query exactly as described.
- Use modulo MOD = 1_000_000_007 for each multiplication.
- After all queries, XOR all elements and return the result.

Note for TypeScript
- nums[i] can become up to MOD-1, which fits safely in JS number.
- Since nums[i] * v <= about 1e9 * 1e5 = 1e14, it is still within safe integer range in JavaScript.
*/

function xorAfterQueries(nums: number[], queries: number[][]): number {
    const MOD = 1_000_000_007;

    for (const [l, r, k, v] of queries) {
        for (let idx = l; idx <= r; idx += k) {
            nums[idx] = (nums[idx] * v) % MOD;
        }
    }

    let answer = 0;
    for (const value of nums) {
        answer ^= value;
    }

    return answer;
}

// -------------------- Tests --------------------

console.log(
    xorAfterQueries([1, 1, 1], [[0, 2, 1, 4]]),
    "expected:",
    4
);

console.log(
    xorAfterQueries([2, 3, 1, 5, 4], [[1, 4, 2, 3], [0, 2, 1, 2]]),
    "expected:",
    31
);

console.log(
    xorAfterQueries([5], [[0, 0, 1, 7]]),
    "expected:",
    35
);

console.log(
    xorAfterQueries([1, 2, 3, 4], [[1, 3, 5, 10]]),
    "expected:",
    (1 ^ 20 ^ 3 ^ 4) // only index 1 updated
);

console.log(
    xorAfterQueries([10, 20, 30], [[0, 2, 1, 1]]),
    "expected:",
    (10 ^ 20 ^ 30) // unchanged because v = 1
);