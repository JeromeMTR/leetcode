// TypeScript solution to count valid subsequences with min+max <= target
const MOD = 1e9 + 7;

/**
 * Returns the number of valid subsequences such that min+max <= target
 * @param nums Array of integers
 * @param target Integer
 * @returns number (modulo 10^9+7)
 */
function numSubseq(nums: number[], target: number): number {
    const n = nums.length;
    // Sort input to easily find min and max using pointers
    nums.sort((a, b) => a - b);

    // Precompute powers of 2 modulo MOD
    const pow2 = new Array(n).fill(1);
    for (let i = 1; i < n; i++) {
        pow2[i] = (pow2[i-1] * 2) % MOD;
    }

    let left = 0, right = n-1, result = 0;

    while (left <= right) {
        // If the sum of min (nums[left]) and max (nums[right]) is over target, try a smaller max
        if (nums[left] + nums[right] > target) {
            right--;
        } else {
            // For subsequences starting at left and ending at any subset between left and right:
            // the count is 2^(right-left) because for each position in between you can pick or not.
            result = (result + pow2[right-left]) % MOD;
            left++;
        }
    }

    return result;
}

/* ======================= Example Usage and Test Cases ===================== */

// Example 1:
console.log(numSubseq([3,5,6,7], 9)); 
// Output: 4

// Example 2:
console.log(numSubseq([3,3,6,8], 10));
// Output: 6

// Example 3:
console.log(numSubseq([2,3,3,4,6,7], 12));
// Output: 61

// Example 4: Large input lower bound
console.log(numSubseq([1], 2)); 
// Output: 1

// Example 5: No valid subsequences
console.log(numSubseq([5,5,5], 5)); 
// Output: 0

/* ======================= End of Test Cases ===================== */