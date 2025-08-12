function numberOfWays(n: number, x: number): number {
    const MOD = 1e9 + 7;

    // Memoization table
    // dp[currentNum][currentN] = number of ways
    const dp: number[][] = Array.from({length: n + 2}, _ => Array(n + 1).fill(-1));

    // Recursive function: try to make up 'remain' using numbers starting from 'num'
    function dfs(num: number, remain: number): number {
        // Base cases
        if (remain === 0) return 1;    // found a valid way
        if (remain < 0) return 0;      // overshot, invalid
        // If already computed
        if (dp[num][remain] !== -1) return dp[num][remain];
        
        // Compute num^x
        const power = Math.pow(num, x);
        if (power > remain) {
            // No need to try larger 'num', as powers will only increase
            dp[num][remain] = 0;
        } else {
            // Either skip current 'num', or use it
            dp[num][remain] = (dfs(num + 1, remain) + dfs(num + 1, remain - power)) % MOD;
        }
        return dp[num][remain];
    }

    return dfs(1, n);
}