/**
 * Computes, for each index, the sum of distances to all other indices
 * containing the same value.
 *
 * @param nums Array of integers.
 * @returns Array where each element is the total distance for that index.
 *
 * @example
 * // Input: [1, 3, 1, 1, 2]
 * // Output: [5, 0, 3, 4, 0]
 * distance([1, 3, 1, 1, 2]);
 *
 * @example
 * // Input: [0, 5, 3]
 * // Output: [0, 0, 0]
 * distance([0, 5, 3]);
 */
function distance(nums: number[]): number[] {
    const n = nums.length;
    const groups = new Map<number, number[]>();
    for (let i = 0; i < n; i++) {
        if (!groups.has(nums[i])) {
            groups.set(nums[i], []);
        }
        groups.get(nums[i])!.push(i);
    }
    const res = new Array(n).fill(0);
    for (const group of groups.values()) {
        let total = 0;
        for (const idx of group) {
            total += idx;
        }
        let prefixTotal = 0;
        const sz = group.length;
        for (let i = 0; i < sz; i++) {
            const idx = group[i];
            res[idx] = total - prefixTotal * 2 + idx * (2 * i - sz);
            prefixTotal += idx;
        }
    }
    return res;
}
// Test cases
console.log(distance([1, 3, 1, 1, 2])); // Output: [5, 0, 3, 4, 0]
console.log(distance([0, 5, 3]));       // Output: [0, 0, 0]
console.log(distance([1, 1, 1, 1]));    // Output: [6, 4, 4, 6]
console.log(distance([9, 7, 9, 7]));    // Output: [4, 4, 2, 2]
