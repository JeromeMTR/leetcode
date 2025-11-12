/**
 * Finds the minimum number of operations to make all elements of nums equal to 1.
 * We look for the shortest subarray whose GCD is 1, then propagate its "1" to all others.
 * 
 * @param nums - Array of positive integers
 * @returns Minimum number of operations to make all elements 1, or -1 if impossible
 */
function minOperations(nums: number[]): number {
    const n = nums.length;

    // Helper: Compute gcd of two numbers
    function gcd(a: number, b: number): number {
        while (b !== 0) {
            let t = b;
            b = a % b;
            a = t;
        }
        return a;
    }

    // Step 1: Check if the array already contains a 1
    let countOnes = 0;
    for (const num of nums) {
        if (num === 1) countOnes++;
    }
    // If there is at least one 1, each non-1 becomes 1 in one operation (adjacent to a 1)
    if (countOnes > 0) {
        return n - countOnes;
    }

    // Step 2: Find the shortest subarray whose GCD is 1
    // Because making one "1" requires operations (subarrayLen - 1) to reduce it to 1,
    // then for the rest, (n-1) more moves are needed as above.
    let minLen = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < n; ++i) {
        let curr = nums[i];
        for (let j = i + 1; j < n; ++j) {
            curr = gcd(curr, nums[j]);
            if (curr == 1) {
                // (j - i) steps to get to 1
                minLen = Math.min(minLen, j - i + 1);
                break;  // No need to go further for this i
            }
        }
    }

    // Impossible if no subarray has GCD 1
    if (minLen === Number.MAX_SAFE_INTEGER) return -1;

    // To create the first 1: (minLen - 1) operations (inside subarray)
    // To propagate 1 to all others: (n - 1) operations
    return (minLen - 1) + (n - 1);
}

/*
IOCE (Input-Output-Code-Example):

Example 1:
Input: [2,6,3,4]
Output: 4
Explanation: One way is 
- GCD(3,4)=1, nums=[2,6,1,4]
- GCD(6,1)=1, nums=[2,1,1,4]
- GCD(2,1)=1, nums=[1,1,1,4]
- GCD(1,4)=1, nums=[1,1,1,1]

Example 2:
Input: [2,10,6,14]
Output: -1
Explanation: No subarray with GCD 1.

Example 3:
Input: [1,2,1,2,1,2]
Output: 4

Example 4:
Input: [3,1,2,1]
Output: 3

Example 5:
Input: [4,4]
Output: -1

Example 6:
Input: [1,1,3,3,3,4,4,4,5,5]
Output: 4
*/