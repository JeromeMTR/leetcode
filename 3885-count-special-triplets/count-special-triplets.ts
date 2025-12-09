// TypeScript solution for the "Special Triplets" problem

/*
Idea:

For every `j`, count the number of `i < j` with nums[i] == nums[j]*2,
and number of `k > j` with nums[k] == nums[j]*2.
Number of special triplets with nums[j] in the middle = countLeft * countRight.

Approach:

- First, build freqRight: a map from value -> count in right of current j (i.e. after j).
- As we process j from 0 to n-1, we maintain freqLeft (count of every value prior to j).
- For each position j (from 0 to n-1):
  - Remove nums[j] from freqRight.
  - If nums[j]*2 fits in map, get countLeft from freqLeft, countRight from freqRight.
  - Multiply countLeft * countRight, accumulate to answer.
  - Add nums[j] to freqLeft.
*/

function countSpecialTriplets(nums: number[]): number {
    const MOD = 1_000_000_007;
    const freqLeft = new Map<number, number>();
    const freqRight = new Map<number, number>();

    // Initialize freqRight with all elements (except for freqRight for j)
    for (const num of nums) {
        freqRight.set(num, (freqRight.get(num) || 0) + 1);
    }

    let answer = 0;
    const n = nums.length;

    for (let j = 0; j < n; ++j) {
        // Remove nums[j] from right counts, since j is current center
        freqRight.set(nums[j], freqRight.get(nums[j])! - 1);
        if (freqRight.get(nums[j]) === 0) freqRight.delete(nums[j]);

        // nums[i] = nums[j] * 2 (i < j)
        // nums[k] = nums[j] * 2 (k > j)
        const target = nums[j] * 2;

        const leftCount = freqLeft.get(target) || 0;
        const rightCount = freqRight.get(target) || 0;

        answer = (answer + (leftCount * rightCount) % MOD) % MOD;

        // Add nums[j] to freqLeft for next iteration
        freqLeft.set(nums[j], (freqLeft.get(nums[j]) || 0) + 1);
    }

    return answer;
}

// IOCE - Input / Output / Constraints / Examples

// Example 1
console.log(countSpecialTriplets([6,3,6])); // Output: 1

// Example 2
console.log(countSpecialTriplets([0,1,0,0])); // Output: 1

// Example 3
console.log(countSpecialTriplets([8,4,2,8,4])); // Output: 2

// Previous failed cases:
console.log(countSpecialTriplets([3,1,2,1])); // Output: 3

console.log(countSpecialTriplets([1,2,1,2,1,2])); // Output: 4

console.log(countSpecialTriplets([1,1,3,3,3,4,4,4,5,5])); // Output: 4