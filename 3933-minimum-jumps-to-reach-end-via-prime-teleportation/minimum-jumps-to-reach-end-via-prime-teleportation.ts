/*
IOCE

I - Inputs:
    - nums: integer array of length n
    - 1 <= n <= 1e5
    - 1 <= nums[i] <= 1e6

O - Output:
    - Return the minimum number of jumps needed to go from index 0 to index n - 1

C - Constraints:
    - n can be as large as 100000, so an O(n^2) approach will time out
    - nums[i] can be up to 1e6, so prime/factor preprocessing is feasible with sieve/SPF

E - Edge Cases:
    - n = 1 => already at destination, answer = 0
    - nums[i] = 1 => not prime, cannot teleport

*/

function minJumps(nums: number[]): number {
    const n = nums.length;
    if (n === 1) return 0;

    const maxVal = Math.max(...nums);

    // Build SPF (Smallest Prime Factor) sieve
    const spf = new Array<number>(maxVal + 1).fill(0);
    for (let i = 2; i <= maxVal; i++) {
        if (spf[i] === 0) {
            spf[i] = i;
            if (i <= Math.floor(maxVal / i)) {
                for (let j = i * i; j <= maxVal; j += i) {
                    if (spf[j] === 0) spf[j] = i;
                }
            }
        }
    }

    // Returns distinct prime factors of x
    function getDistinctPrimeFactors(x: number): number[] {
        const factors: number[] = [];
        while (x > 1) {
            const p = spf[x];
            factors.push(p);
            while (x % p === 0) x = Math.floor(x / p);
        }
        return factors;
    }

    // Map prime factor -> list of indices whose value is divisible by that prime
    const divisibleByPrime = new Map<number, number[]>();

    for (let i = 0; i < n; i++) {
        if (nums[i] === 1) continue;
        const factors = getDistinctPrimeFactors(nums[i]);
        for (const p of factors) {
            if (!divisibleByPrime.has(p)) divisibleByPrime.set(p, []);
            divisibleByPrime.get(p)!.push(i);
        }
    }

    // BFS setup
    const visited = new Array<boolean>(n).fill(false);
    visited[0] = true;

    // Each prime teleport group should be expanded only once
    const usedPrime = new Set<number>();

    let queue: number[] = [0];
    let steps = 0;

    while (queue.length > 0) {
        const nextQueue: number[] = [];

        for (const i of queue) {
            if (i === n - 1) return steps;

            // Adjacent step: i - 1
            if (i - 1 >= 0 && !visited[i - 1]) {
                visited[i - 1] = true;
                nextQueue.push(i - 1);
            }

            // Adjacent step: i + 1
            if (i + 1 < n && !visited[i + 1]) {
                visited[i + 1] = true;
                nextQueue.push(i + 1);
            }

            // Prime teleportation: only if nums[i] itself is prime
            const val = nums[i];
            if (val >= 2 && spf[val] === val && !usedPrime.has(val)) {
                usedPrime.add(val);
                const targets = divisibleByPrime.get(val) || [];
                for (const j of targets) {
                    if (!visited[j]) {
                        visited[j] = true;
                        nextQueue.push(j);
                    }
                }
            }
        }

        queue = nextQueue;
        steps++;
    }

    // In this problem destination is always reachable through adjacent moves
    return -1;
}


// --------------------
// Console log tests
// --------------------

console.log(minJumps([1, 2, 4, 6])); // Expected: 2
console.log(minJumps([2, 3, 4, 7, 9])); // Expected: 2
console.log(minJumps([4, 6, 5, 8])); // Expected: 3
console.log(minJumps([1])); // Expected: 0
console.log(minJumps([2, 4, 8, 16])); // Expected: 1 (0 -> 3 via prime 2 teleport)
console.log(minJumps([6, 10, 15, 7, 14])); // Expected: 4 or possibly less depending on path; actual output shown
console.log(minJumps([5, 10, 15, 20, 25])); // Expected: 1 (0 -> 4 via prime 5 teleport)
console.log(minJumps([1, 1, 1, 1])); // Expected: 3