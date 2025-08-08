// Soup Servings Solution in TypeScript

/**
 * Calculates the probability that soup A is emptied before soup B
 * plus half the probability that both are emptied at the same time.
 * 
 * @param n Initial mL of each soup
 * @returns Probability (number between 0 and 1)
 */
function soupServings(n: number): number {
    // IOCE examples
    // Input: 50 => Output: 0.625
    // Input: 100 => Output: 0.71875
    
    // Use scaling: work in multiples of 25 ml
    if (n >= 4800) return 1.0; // For large n, probability ≈ 1 (proof in LeetCode discussions)
    
    const N = Math.ceil(n / 25);
    // Memoization table: dp[i][j] = answer for (i, j) units of A/B left
    const memo: Map<string, number> = new Map();

    // Helper: dp(a, b) = probability for a units A left, b units B left
    function dp(a: number, b: number): number {
        // Base Cases:
        if (a <= 0 && b <= 0) return 0.5; // Both finished on same step
        if (a <= 0) return 1.0; // A finishes first
        if (b <= 0) return 0.0; // B finishes first

        const key = `${a},${b}`;
        if (memo.has(key)) return memo.get(key)!;

        // Each operation, and their resultant state
        // [serveA, serveB]
        const options: [number, number][] = [
            [4, 0], // 100ml A, 0ml B
            [3, 1], // 75ml A, 25ml B
            [2, 2], // 50ml A, 50ml B
            [1, 3], // 25ml A, 75ml B
        ];

        let prob = 0;
        for (const [da, db] of options) {
            prob += dp(a - da, b - db);
        }
        prob *= 0.25;

        memo.set(key, prob);
        return prob;
    }

    return dp(N, N);
}

// ---- IOCE ----
console.log(soupServings(50));    // Output: 0.625
console.log(soupServings(100));   // Output: 0.71875
console.log(soupServings(0));     // Output: 0.5
console.log(soupServings(1000));  // Output: 0.97656

/*

Output:
0.625
0.71875
0.5
0.9765625

*/

// For large n, output approaches 1 quickly
console.log(soupServings(10000)); // Output: 1