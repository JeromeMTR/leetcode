// TypeScript Solution

/**
 * Finds the minimum length of the subarray starting at each index i
 * that achieves the maximum possible bitwise OR for nums[i...n-1].
 *
 * @param nums - The input array of non-negative integers
 * @returns An array ans where ans[i] is the answer for index i
 */
function minimumSubarraysWithMaxBitwiseOR(nums: number[]): number[] {
    const n = nums.length;
    const answer: number[] = new Array(n);

    // Map to store: orValue -> minimal subarray length starting at i+1
    // Initially empty for the position n (out of bounds)
    let curr = new Map<number, number>();

    // Traverse from right to left
    for (let i = n - 1; i >= 0; --i) {
        const next = new Map<number, number>();

        // Start with just nums[i] as subarray [i, i]
        next.set(nums[i], 1);

        // For each OR-value from previous, extend to include nums[i]
        for (const [orValue, length] of curr.entries()) {
            const combined = orValue | nums[i];
            // Update minimal length for this orValue, if not seen before or smaller length found
            if (!next.has(combined) || next.get(combined)! > length + 1) {
                next.set(combined, length + 1);
            }
        }

        // For this position, answer is the minimal length for the *max* orValue
        let maxOR = 0;
        for (const key of next.keys()) {
            if (key > maxOR) maxOR = key;
        }
        answer[i] = next.get(maxOR)!;

        curr = next; // Move to next position
    }

    return answer;
}

/* -------------------- IOCE -------------------- */

// Input
const input1 = [1, 0, 2, 1, 3];
const input2 = [1, 2];

// Output
console.log(minimumSubarraysWithMaxBitwiseOR(input1)); // [3,3,2,2,1]
console.log(minimumSubarraysWithMaxBitwiseOR(input2)); // [2,1]

/* 
Explanation:
For input [1,0,2,1,3]:
- The answers are [3,3,2,2,1] as described in the problem statement.
For input [1,2]:
- The answers are [2,1].
*/