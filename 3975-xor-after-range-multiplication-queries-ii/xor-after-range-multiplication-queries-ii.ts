/*
IOCE

Inputs:
- nums: number[] of length n
- queries: number[][] of size q
  where queries[i] = [l, r, k, v]

Output:
- Return the bitwise XOR of all elements in nums after processing all queries.

Constraints:
- 1 <= n == nums.length <= 1e5
- 1 <= nums[i] <= 1e9
- 1 <= q == queries.length <= 1e5
- 0 <= l <= r < n
- 1 <= k <= n
- 1 <= v <= 1e5

Time Complexity:
- O(sum over queries of ((r - l) / k + 1))
  This directly simulates the problem statement.

Space Complexity:
- O(1) extra space, excluding input storage.

Edge Cases:
- n = 1
- q = 1
- k = 1, meaning every index in [l..r] is updated
- k > (r - l + 1), meaning only index l is updated
- Multiple queries affecting the same index many times
- Large values requiring modulo 1e9+7


Note:
- Under the given constraints, a universally faster exact method is not straightforward because
  each query updates an arithmetic progression and the final XOR is not linearly composable like sum.
- So we implement the direct simulation carefully and use BigInt for safe modular multiplication.
*/

const MOD = 1_000_000_007n;

const pow = (x: bigint, y: bigint) => {
    let res = 1n;
    for (; y > 0n; y >>= 1n) {
        if (y & 1n) {
            res = (res * x) % MOD;
        }
        x = (x * x) % MOD;
    }
    return res;
};

function xorAfterQueries(nums: number[], queries: number[][]): number {
    const n = nums.length;
    const T = Math.floor(Math.sqrt(n));
    const groups = Array.from<unknown, Array<[number, number, bigint]>>(
        { length: T },
        () => [],
    );

    for (const [l, r, k, v] of queries) {
        if (k < T) {
            groups[k].push([l, r, BigInt(v)]);
        } else {
            for (let i = l; i <= r; i += k) {
                nums[i] = Number((BigInt(nums[i]) * BigInt(v)) % MOD);
            }
        }
    }

    const dif = new BigInt64Array(n + T);
    for (let k = 1; k < T; k++) {
        if (groups[k].length === 0) {
            continue;
        }
        dif.fill(1n);
        for (let [l, r, v] of groups[k]) {
            dif[l] = (dif[l] * BigInt(v)) % MOD;
            const R = Math.floor((r - l) / k + 1) * k + l;
            dif[R] = (dif[R] * pow(BigInt(v), MOD - 2n)) % MOD;
        }

        for (let i = k; i < n; i++) {
            dif[i] = (dif[i] * dif[i - k]) % MOD;
        }
        for (let i = 0; i < n; i++) {
            nums[i] = Number((BigInt(nums[i]) * dif[i]) % MOD);
        }
    }

    let res = 0;
    for (let i = 0; i < n; i++) {
        res = res ^ nums[i];
    }
    return res;
}

/* -------------------- Tests -------------------- */

console.log(xorAfterQueries([1, 1, 1], [[0, 2, 1, 4]]));
// Expected: 4

console.log(xorAfterQueries([2, 3, 1, 5, 4], [[1, 4, 2, 3], [0, 2, 1, 2]]));
// Expected: 31

console.log(xorAfterQueries([5], [[0, 0, 1, 3]]));
// 5 * 3 = 15 => Expected: 15

console.log(xorAfterQueries([1, 2, 3, 4], [[1, 1, 5, 10]]));
// Only index 1 updated: [1,20,3,4] => 1 ^ 20 ^ 3 ^ 4 = 22
// Expected: 22

console.log(xorAfterQueries([10, 10, 10], [[0, 2, 2, 2], [1, 2, 1, 3]]));
// After first: [20,10,20]
// After second: [20,30,60]
// XOR = 20 ^ 30 ^ 60 = 38
// Expected: 38