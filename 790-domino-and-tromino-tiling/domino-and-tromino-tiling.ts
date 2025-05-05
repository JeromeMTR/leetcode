function numTilings(n: number): number {
    const MOD = 1000000007;
    
    // Edge case
    if (n === 1) return 1;
    if (n === 2) return 2;
    
    // Define the dp array
    const dp: number[] = new Array(n + 1).fill(0);
    dp[0] = 1;
    dp[1] = 1;
    dp[2] = 2;

    // Using DP to fill the table
    for (let i = 3; i <= n; i++) {
        dp[i] = (2 * dp[i - 1] + dp[i - 3]) % MOD;
    }

    return dp[n];
}

// IOCE (Input, Output, Comments, Edge cases)
// Input: numTilings(3)
// Output: 5 (the five different ways to tile the 2x3 board)
// Input: numTilings(1)
// Output: 1
// Edge Cases: 
// - The minimum input value testing (n=1)
// - Large input values to evaluate performance (n=1000)
// The function handles modular arithmetic to prevent overflow and works efficiently up to n=1000.