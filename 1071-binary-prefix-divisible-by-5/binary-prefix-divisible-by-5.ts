/*
Problem: For each prefix of a binary array, determine if the number formed is divisible by 5.

Approach:
- For each index, form the number by shifting left (multiply by 2) and adding current digit.
- To avoid overflow, keep the number as modulo 5 at each step (since we only care about divisibility by 5).
- For each prefix, push true if the number modulo 5 is 0, false otherwise.

Constraints:
- 1 <= nums.length <= 10^5
- nums[i] is 0 or 1

IOCE:

Input:
nums = [0,1,1]
Output:
[true, false, false]

Input:
nums = [1,1,1]
Output:
[false, false, false]

Input:
nums = [1,0,1]
Output:
[false, false, true]
*/

function prefixesDivBy5(nums: number[]): boolean[] {
    // Result array
    const result: boolean[] = [];
    // Variable to keep the current value modulo 5
    let current = 0;
    for (let i = 0; i < nums.length; ++i) {
        // Shift left by 1 (multiply by 2), add current digit, keep only mod 5
        current = ((current << 1) + nums[i]) % 5;
        // If the value is divisible by 5 (modulo 5 is 0), push true
        result.push(current === 0);
    }
    return result;
}

// Example usage:
console.log(prefixesDivBy5([0,1,1])); // [true, false, false]
console.log(prefixesDivBy5([1,1,1])); // [false, false, false]
console.log(prefixesDivBy5([1,0,1])); // [false, false, true]