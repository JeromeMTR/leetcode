/**
 * Finds the two repeated numbers in the nums array.
 *
 * @param nums - An array of integers with two repeated numbers.
 * @returns An array containing the two repeated numbers (order doesn't matter).
 */
function findTwoRepeated(nums: number[]): number[] {
    const n = nums.length - 2; // Given: nums contains numbers from 0 to n-1, but two appear twice
    const count = new Array(n).fill(0); // Count occurrences for 0..n-1

    // Count occurrences
    for (const num of nums) {
        count[num]++;
    }

    const result: number[] = [];
    // Find numbers that occur more than once
    for (let i = 0; i < n; i++) {
        if (count[i] === 2) {
            result.push(i);
        }
    }

    // Problem guarantee: only 2 repeated elements
    return result;
}

// ---- Test cases ----

// Example 1
console.log(findTwoRepeated([0,1,1,0])); // Output: [0,1]

// Example 2
console.log(findTwoRepeated([0,3,2,1,3,2])); // Output: [2,3]

// Example 3
console.log(findTwoRepeated([7,1,5,4,3,4,6,0,9,5,8,2])); // Output: [4,5]