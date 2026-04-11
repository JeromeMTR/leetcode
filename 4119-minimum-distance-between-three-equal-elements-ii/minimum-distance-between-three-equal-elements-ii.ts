/*
IOCE

Inputs:
- nums: number[]
  - An integer array of length n.

Output:
- number
  - Minimum possible distance of a good tuple (i, j, k),
    where i, j, k are distinct indices and nums[i] == nums[j] == nums[k].
  - Return -1 if no such tuple exists.

Edge Cases:
- Array length < 3 => answer is -1.
- No value appears at least 3 times => answer is -1.
- Exactly 3 equal values => only one possible tuple for that value.
- Multiple values have 3+ occurrences => take global minimum.
*/

function minimumDistance(nums: number[]): number {
    // Map each value to the list of indices where it appears.
    const positions = new Map<number, number[]>();

    for (let i = 0; i < nums.length; i++) {
        const val = nums[i];
        if (!positions.has(val)) {
            positions.set(val, []);
        }
        positions.get(val)!.push(i);
    }

    let answer = Infinity;

    // For each value, check every consecutive triple of occurrence indices.
    for (const idxList of positions.values()) {
        if (idxList.length < 3) continue;

        for (let i = 0; i + 2 < idxList.length; i++) {
            const left = idxList[i];
            const right = idxList[i + 2];

            // Since indices are sorted and left < mid < right:
            // distance = 2 * (right - left)
            const dist = 2 * (right - left);
            answer = Math.min(answer, dist);
        }
    }

    return answer === Infinity ? -1 : answer;
}


// Console log tests
console.log(minimumDistance([1, 2, 1, 1, 3])); // 6
console.log(minimumDistance([1, 1, 2, 3, 2, 1, 2])); // 8
console.log(minimumDistance([1])); // -1
console.log(minimumDistance([1, 1, 1])); // 4
console.log(minimumDistance([2, 3, 2, 4, 2, 5, 2])); // 8
console.log(minimumDistance([1, 2, 3, 4, 5])); // -1
