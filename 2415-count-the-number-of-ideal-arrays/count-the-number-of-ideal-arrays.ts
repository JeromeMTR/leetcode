function countIdealArrays(n: number, maxValue: number): number {
    const MOD = 1_000_000_007;

    // dp[k][j] stores the number of ways to form arrays of length k ending with value j
    let dp: number[][] = Array.from({ length: n + 1 }, () => Array(maxValue + 1).fill(0));
    
    // Initialize for single element arrays; each number from 1 to maxValue is 1 way to form an array of length 1
    for (let j = 1; j <= maxValue; j++) {
        dp[1][j] = 1;
    }

    // Calculate number of arrays for all lengths up to n
    for (let k = 2; k <= n; k++) {
        for (let j = 1; j <= maxValue; j++) {
            // Traverse through possible arr[k-1] values which are divisors of j
            for (let divisor = 1; divisor * divisor <= j; divisor++) {
                if (j % divisor === 0) {
                    // Add possibilities of array ending with 'j' where arr[k-1] = divisor
                    dp[k][j] = (dp[k][j] + dp[k - 1][divisor]) % MOD;
                    
                    if (divisor !== j / divisor) {
                        // Add possibilities of array ending with 'j' where arr[k-1] = j / divisor
                        dp[k][j] = (dp[k][j] + dp[k - 1][j / divisor]) % MOD;
                    }
                }
            }
        }
    }

    // Sum all possibilities for arrays of length n
    let result = 0;
    for (let j = 1; j <= maxValue; j++) {
        result = (result + dp[n][j]) % MOD;
    }

    return result;
}

// Example usage
console.log(countIdealArrays(2, 5));  // Output: 10
console.log(countIdealArrays(5, 3));  // Output: 11