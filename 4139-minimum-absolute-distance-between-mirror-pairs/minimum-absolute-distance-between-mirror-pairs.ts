/*
IOCE

Input:
- An integer array nums
- 1 <= nums.length <= 1e5
- 1 <= nums[i] <= 1e9

Output:
- Return the minimum absolute distance |i - j| among all mirror pairs (i, j)
- A mirror pair satisfies:
  - 0 <= i < j < nums.length
  - reverse(nums[i]) === nums[j]
- If no mirror pair exists, return -1

Edge Cases:
- No mirror pair exists -> return -1
- Numbers ending in zero, e.g. 120 -> reverse(120) = 21
- Same number can mirror itself if reversing gives the same number, e.g. 33
- Multiple possible pairs -> return the minimum distance
- Repeated values -> best pair is found by tracking the latest valid index
*/

function reverseNumber(x: number): number {
    let rev = 0;
    while (x > 0) {
        rev = rev * 10 + (x % 10);
        x = Math.floor(x / 10);
    }
    return rev;
}

function minMirrorPairDistance(nums: number[]): number {
    // Map: targetValue -> latest index i such that reverse(nums[i]) = targetValue
    const latestIndex = new Map<number, number>();

    let answer = Infinity;

    for (let j = 0; j < nums.length; j++) {
        const current = nums[j];

        // If some previous index i had reverse(nums[i]) = current,
        // then (i, j) is a valid mirror pair.
        if (latestIndex.has(current)) {
            const i = latestIndex.get(current)!;
            answer = Math.min(answer, j - i);
        }

        // Store current index under reverse(nums[j]),
        // because future values equal to reverse(nums[j]) can pair with j.
        const reversed = reverseNumber(current);
        latestIndex.set(reversed, j);
    }

    return answer === Infinity ? -1 : answer;
}

// Console log tests
console.log(minMirrorPairDistance([12, 21, 45, 33, 54])); // 1
console.log(minMirrorPairDistance([120, 21])); // 1
console.log(minMirrorPairDistance([21, 120])); // -1
console.log(minMirrorPairDistance([33, 33])); // 1
console.log(minMirrorPairDistance([10, 1, 100, 1])); // 1
console.log(minMirrorPairDistance([123, 321, 123, 321])); // 1
console.log(minMirrorPairDistance([1])); // -1
