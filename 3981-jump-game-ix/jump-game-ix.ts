/**
 * IOCE
 * ----
 * Input:
 *  - nums: number[] (length n)
 *
 * Output:
 *  - ans: number[] where ans[i] is the maximum value in nums reachable from index i
 *    by following any sequence of valid jumps.
 *
 * Jump rules from index i to j:
 *  - If j > i (jump right): allowed only if nums[j] < nums[i]
 *  - If j < i (jump left):  allowed only if nums[j] > nums[i]
 *
 * Constraints:
 *  - 1 <= n <= 1e5
 *  - 1 <= nums[i] <= 1e9
 *
 * Time complexity:
 *  - O(n log n)
 *
 * Space complexity:
 *  - O(n)
 *
 * Edge cases:
 *  - n = 1
 *  - strictly increasing / strictly decreasing arrays
 *  - all equal values (no moves possible; answer equals original values)
 *
 */

function maxValue(nums: number[]): number[] {
    const n = nums.length;
    if (n === 0) return [];

    // Precompute prefix max: [maxValue in [0..i], its index]
    const prefixMax: [number, number][] = new Array(n);
    let curMax: [number, number] = [-Infinity, -1];
    for (let i = 0; i < n; i++) {
        if (nums[i] > curMax[0]) curMax = [nums[i], i];
        prefixMax[i] = [curMax[0], curMax[1]]; // Store snapshot
    }

    const ans = new Array<number>(n);
    let r = n - 1;
    // minValFromProcessedRight: min value in segments *right* of current [0..r]
    // candidateMaxForLeft: value used for ans in current segment (propagated leftward)
    let minValFromProcessedRight = Infinity;
    let candidateMaxForLeft = 0;

    while (r >= 0) {
        const [segMax, pivotIdx] = prefixMax[r];
        const assignVal = segMax <= minValFromProcessedRight
            ? segMax
            : candidateMaxForLeft;

        let newMinForLeft = Math.min(segMax, minValFromProcessedRight);
        for (let i = pivotIdx; i <= r; i++) {
            ans[i] = assignVal;
            if (nums[i] < newMinForLeft) newMinForLeft = nums[i];
        }

        // Propagate state to next left segment [0..pivotIdx-1]
        minValFromProcessedRight = newMinForLeft;
        candidateMaxForLeft = assignVal;
        r = pivotIdx - 1;
    }
    return ans;
}

/********************
 * Console log tests
 ********************/

console.log(maxValue([2, 1, 3])); // [2,2,3]
console.log(maxValue([2, 3, 1])); // [3,3,3]
console.log(maxValue([5])); // [5]
console.log(maxValue([7, 7, 7])); // [7,7,7]
console.log(maxValue([1, 2, 3, 4])); // [4,4,4,4]
console.log(maxValue([4, 3, 2, 1])); // [4,4,4,4]
