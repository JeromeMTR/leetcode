function canTransformToZeroArray(nums: number[], queries: number[][]): boolean {
    const n = nums.length;
    const diff = new Array(n + 1).fill(0); // size n+1 for boundary

    // Building difference array
    for (const [l, r] of queries) {
        diff[l]++;
        if (r + 1 < diff.length) diff[r + 1]--;
    }

    // Calculate covers by prefix sum
    let cover = 0;
    for (let i = 0; i < n; i++) {
        cover += diff[i];
        if (nums[i] > cover) {
            // Not enough opportunities to bring nums[i] to zero
            return false;
        }
    }
    return true;
}

/* IOCE (Input, Output, Constraints, Example) */

// Example 1
console.log(canTransformToZeroArray([1,0,1], [[0,2]])); // true

// Example 2
console.log(canTransformToZeroArray([4,3,2,1], [[1,3],[0,2]])); // false

// Edge Case: already zero
console.log(canTransformToZeroArray([0,0,0], [[0,2],[1,1]])); // true

// Edge Case: can't zero complete
console.log(canTransformToZeroArray([1,0,1], [[0,1]])); // false

/*
Constraints:
- 1 <= nums.length <= 1e5
- 0 <= nums[i] <= 1e5
- 1 <= queries.length <= 1e5
- 0 <= l <= r < nums.length
*/

// For large input
// let bigNums = new Array(1e5).fill(1);
// let bigQueries = [[0,1e5-1]];
// console.log(canTransformToZeroArray(bigNums, bigQueries)); // true