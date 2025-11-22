/**
 * For each number, to make it divisible by 3, we need to add or subtract (num % 3) or (3 - num % 3), whichever is smaller.
 * - If num % 3 == 0 => already divisible: 0 steps
 * - If num % 3 == 1 => add 2 or subtract 1. 1 step
 * - If num % 3 == 2 => add 1 or subtract 2. 1 step
 * So, for each number, min(num % 3, 3 - num % 3)
 * But we must use only +-1 operations.
 */
function minOperations(nums: number[]): number {
    let ops = 0;
    for (const num of nums) {
        // Steps to nearest multiple of 3
        ops += Math.min(num % 3, 3 - (num % 3));
    }
    return ops;
}

/* 
IOCE - Input Output Constraints and Examples

Example 1:
Input: [1,2,3,4]
1 -> 1%3=1: need 1 op (subtract 1)
2 -> 2%3=2: need 1 op (add 1)
3 -> 0: already divisible
4 -> 1: need 1 op (subtract 1)
Output: 3

Example 2:
Input: [3,6,9]
Output: 0

Edge Example:
Input: [3,1,2,1]
3->0:0
1->1:1
2->2:1
1->1:1
Output: 3

Input: [1,2,1,2,1,2]
Each 1 and 2 needs 1 operation: total 6 ops

Input: [1,1,3,3,3,4,4,4,5,5]
1->1:1
1->1:1
3->0:0
3->0:0
3->0:0
4->1:1
4->1:1
4->1:1
5->2:1
5->2:1
Sum: 6

So, the approach matches problem statement and examples.
*/

// Test cases
console.log(minOperations([1,2,3,4])); // 3
console.log(minOperations([3,6,9])); // 0
console.log(minOperations([3,1,2,1])); // 3
console.log(minOperations([1,2,1,2,1,2])); // 6
console.log(minOperations([1,1,3,3,3,4,4,4,5,5])); // 6

/*
Constraints:
1 <= nums.length <= 50
1 <= nums[i] <= 50
*/