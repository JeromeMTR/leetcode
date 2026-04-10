/*
IOCE

Inputs:
- nums: number[]
  - An integer array of length n.

Outputs:
- number
  - Minimum possible distance of a good tuple (i, j, k),
    where i, j, k are distinct indices and nums[i] == nums[j] == nums[k].
  - Return -1 if no such tuple exists.

Constraints:
- 1 <= nums.length <= 100
- 1 <= nums[i] <= nums.length

Edge Cases:
- Array length < 3 -> answer is -1
- No number appears at least 3 times -> answer is -1
- Exactly one value appears 3 times -> compute directly
- Multiple values with many occurrences -> choose global minimum
*/

function minimumDistance(nums: number[]): number {
    const positions = new Map<number, number[]>();

    // Store all indices for each value
    for (let i = 0; i < nums.length; i++) {
        if (!positions.has(nums[i])) {
            positions.set(nums[i], []);
        }
        positions.get(nums[i])!.push(i);
    }

    let answer = Infinity;

    // For each value, check consecutive triples of indices
    for (const indices of positions.values()) {
        if (indices.length < 3) continue;

        for (let i = 0; i + 2 < indices.length; i++) {
            const distance = 2 * (indices[i + 2] - indices[i]);
            answer = Math.min(answer, distance);
        }
    }

    return answer === Infinity ? -1 : answer;
}


// Console log tests
console.log(minimumDistance([1, 2, 1, 1, 3])); // 6
console.log(minimumDistance([1, 1, 2, 3, 2, 1, 2])); // 8
console.log(minimumDistance([1])); // -1
console.log(minimumDistance([1, 1, 1])); // 4
console.log(minimumDistance([2, 2, 2, 2])); // 4
console.log(minimumDistance([1, 2, 3, 4])); // -1
console.log(minimumDistance([5, 5, 1, 5, 1, 1, 1])); // 4
