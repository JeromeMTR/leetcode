// IOCE: Input, Output, Constraints, Example
// Input: values: number[]
// Output: number (minimum possible triangulation score)
// Constraints: 3 <= values.length <= 50, 1 <= values[i] <= 100
// Example: values = [1,3,1,4,1,5] => Output: 13

function minScoreTriangulation(values: number[]): number {
    const n = values.length;
    // dp[i][j] = min triangulation score between vertices i to j
    const dp: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
    
    // gap is the distance between i and j
    for (let gap = 2; gap < n; gap++) { // Must have at least 3 vertices to make a triangle
        for (let i = 0; i + gap < n; i++) {
            const j = i + gap;
            dp[i][j] = Infinity;
            // Try all possible vertices to form a triangle with i and j
            for (let k = i + 1; k < j; k++) {
                // Recursively calculate for smaller subproblems and combine with current cost
                const cost = dp[i][k] + dp[k][j] + values[i] * values[k] * values[j];
                dp[i][j] = Math.min(dp[i][j], cost);
            }
        }
    }
    // Answer for the whole polygon
    return dp[0][n - 1];
}

// ====== Examples ======

// Example 1
console.log(minScoreTriangulation([1,2,3])); // Output: 6

// Example 2
console.log(minScoreTriangulation([3,7,4,5])); // Output: 144

// Example 3
console.log(minScoreTriangulation([1,3,1,4,1,5])); // Output: 13

/*
Explanation:
- We build up solutions for all sub-polygons (i to j), using results from smaller sub-polygons.
- Each dp[i][j] holds the minimal cost to triangulate values[i]...values[j].
- For each possible triangle (i, k, j), we update dp[i][j] with the optimal result.

Time Complexity: O(n^3)
Space Complexity: O(n^2)
*/