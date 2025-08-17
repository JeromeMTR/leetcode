/**
 * Return the probability that Alice holds n or fewer points after stopping.
 * @param n The max number of points accepted (inclusive)
 * @param k Alice keeps drawing until she gets at least k points
 * @param maxPts Alice can gain between 1 to maxPts inclusive for each draw
 * @returns Probability (as a number)
 */
function new21Game(n: number, k: number, maxPts: number): number {
    // Special case: If k == 0, Alice never draws, so probability is 1 if n >= 0.
    if (k === 0 || n >= k + maxPts - 1) {
        return 1.0;
    }
    
    const dp: number[] = new Array(n + 1).fill(0);
    dp[0] = 1.0;           // Start with 0 points: probability 1

    let windowSum = 1.0;   // Running sum of last maxPts dp[] values (for transitions)
    let result = 0.0;      // To accumulate final answer

    // dp[x]: Probability of having x points
    for (let i = 1; i <= n; ++i) {
        // Probability derived by the previous maxPts states
        dp[i] = windowSum / maxPts;

        if (i < k) {
            // Can keep drawing, add to windowSum
            windowSum += dp[i];
        } else {
            // Can't draw anymore, so dp[i] is a possible end result
            result += dp[i];
        }

        // Maintain sliding window
        if (i - maxPts >= 0) {
            // Slide the window; remove the value that's now too old
            windowSum -= dp[i - maxPts];
        }
    }

    return result;
}

// Example usage
console.log(new21Game(10, 1, 10));   // Output: 1.00000
console.log(new21Game(6, 1, 10));    // Output: 0.60000
console.log(new21Game(21, 17, 10));  // Output: 0.73278