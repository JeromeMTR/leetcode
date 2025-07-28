// IOCE -- Input, Output, Constraints, Example

/**
 * Input:
 *   nums: number[] (1 <= nums.length <= 16, 1 <= nums[i] <= 10^5)
 * Output:
 *   number -- the number of non-empty subsets whose bitwise OR is maximal
 *
 * Example:
 *   Input:  [3,1]
 *   Output: 2          // [3], [3,1] both OR to 3
 */

function countMaxOrSubsets(nums: number[]): number {
    // First, find the maximum OR possible by combining every element (since OR is "inclusive")
    let maxOr = 0;
    for (const n of nums) {
        maxOr |= n;
    }

    let count = 0; // Number of valid subsets

    /**
     * DFS helper to try all possible index selections!
     * @param idx   Which index are we at?
     * @param curOr The current OR value of the subset being formed
     * @returns void
     */
    function dfs(idx: number, curOr: number) {
        // Base case: if we've considered all indices
        if (idx === nums.length) {
            if (curOr === maxOr && curOr !== 0) count++;
            return;
        }
        // Choice 1: include nums[idx] in the subset
        dfs(idx + 1, curOr | nums[idx]);
        // Choice 2: don't include nums[idx] in the subset
        dfs(idx + 1, curOr);
    }

    // We don't want to count the empty subset, so we start curOr = 0, 
    // but only count non-zero ORs (since with all nums>0, OR=0 only if subset is empty).
    dfs(0, 0);

    return count;
}

// --- Example Driver Code --- //
const ex1 = [3,1];
console.log(countMaxOrSubsets(ex1)); // Output: 2

const ex2 = [2,2,2];
console.log(countMaxOrSubsets(ex2)); // Output: 7

const ex3 = [3,2,1,5];
console.log(countMaxOrSubsets(ex3)); // Output: 6