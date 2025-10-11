// Function to compute the maximum total damage
function maxSpellDamage(power: number[]): number {
    // Count total contribution for each unique power value
    const total = new Map<number, number>();
    for (const p of power) {
        total.set(p, (total.get(p) ?? 0) + p);
    }
    // Sort all unique damage values
    const keys = [...total.keys()].sort((a, b) => a - b);
    const n = keys.length;
    // dp[i]: max total damage for values up to keys[i]
    const dp: number[] = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        // Option 1: skip current
        let skip = i > 0 ? dp[i - 1] : 0;
        // Option 2: pick current; cannot pick adjacent (diff <= 2)
        // Find last j < i where keys[j] <= keys[i] - 3
        let j = i - 1;
        while (j >= 0 && keys[j] >= keys[i] - 2) j--;
        let pick = (j >= 0 ? dp[j] : 0) + total.get(keys[i])!;
        // Take the best of skip or pick
        dp[i] = Math.max(skip, pick);
    }
    return dp[n - 1] || 0;
}

// ================== IOCE (Input/Output/Comment/Example) ==================

// Example 1:
const input1 = [1, 1, 3, 4];
console.log("Example 1 Input:", input1);
console.log("Example 1 Output:", maxSpellDamage(input1));
// Expected Output: 6
// Explanation: Pick both 1s and 4 (damage 1+1+4=6). Cannot pick 3 if picking 1 or 4.

// Example 2:
const input2 = [7, 1, 6, 6];
console.log("Example 2 Input:", input2);
console.log("Example 2 Output:", maxSpellDamage(input2));
// Expected Output: 13
// Explanation: Pick both 6s and 1 (damage 6+6+1=13). Cannot pick 7 if picking 6.

// Edge case: all values are far apart, can pick all
const input3 = [1, 10, 20, 30];
console.log("Edge case Input:", input3);
console.log("Edge case Output:", maxSpellDamage(input3));
// Expected Output: 61

// Edge case: all consecutive, can only pick one
const input4 = [5, 6, 7, 8, 9];
console.log("Edge2 Input:", input4);
console.log("Edge2 Output:", maxSpellDamage(input4));
// Expected Output: 9

// Large input? (Let's just show it works)
const input5 = Array(100000).fill(1);
console.log("Large case Output:", maxSpellDamage(input5));
// Expected Output: 100000

/* 
Algorithm:
- For each unique power value, add up total contribution.
- Process in sorted order, dynamic programming.
- For each value, either skip it or take the last non-conflicting dp value + total at this value.
- Return the highest dp value.

Time Complexity: O(N log N) for sorting + O(U) for DP, with U unique power values (<= N).
Space Complexity: O(U)
*/