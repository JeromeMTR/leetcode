// IOCE (Input, Output, Constraints, Complexity, Example)
// Input: s1: string, s2: string
// Output: number (minimum ASCII delete sum to make strings equal)
// Constraints: 0 <= s1.length, s2.length <= 1000; characters use ASCII codes
// Complexity: Time O(m*n), Space O(m*n) using DP
// Example: s1 = "sea", s2 = "eat" -> 231

function minimumDeleteSum(s1: string, s2: string): number {
    const m = s1.length;
    const n = s2.length;

    // Create a 2D dp array
    const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

    // Fill first column
    for (let i = 1; i <= m; i++) {
        dp[i][0] = dp[i - 1][0] + s1.charCodeAt(i - 1);
    }

    // Fill first row
    for (let j = 1; j <= n; j++) {
        dp[0][j] = dp[0][j - 1] + s2.charCodeAt(j - 1);
    }

    // Fill the rest of the dp table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                // If characters match, no need to delete; take the previous matched sum
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                // If not match, consider deleting either from s1 or s2 and take the minimum ASCII sum
                dp[i][j] = Math.min(
                    dp[i - 1][j] + s1.charCodeAt(i - 1), // delete from s1
                    dp[i][j - 1] + s2.charCodeAt(j - 1)  // delete from s2
                );
            }
        }
    }

    return dp[m][n];
}

// Test cases to verify correct implementation:
console.log(minimumDeleteSum("sea", "eat")); // 231
console.log(minimumDeleteSum("delete", "leet")); // 403
console.log(minimumDeleteSum("a", "a")); // 0
console.log(minimumDeleteSum("x", "y")); // x.charCodeAt(0) + y.charCodeAt(0)