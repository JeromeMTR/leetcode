// Input-Output function for secret sharing problem
function peopleAwareOfSecret(n: number, delay: number, forget: number): number {
    const MOD = 1e9 + 7;
    // dp[i]: Number of people who learn the secret at day i (1-based)
    const dp = new Array(n + 2).fill(0);
    dp[1] = 1; // On day 1, 1 person learns the secret

    for (let day = 1; day <= n; day++) {
        // For each person who learns the secret on 'day',
        // they will *start* sharing it from 'day + delay' until just before forgetting at 'day + forget'
        for (
            let shareDay = day + delay;
            shareDay < day + forget && shareDay <= n;
            shareDay++
        ) {
            dp[shareDay] = (dp[shareDay] + dp[day]) % MOD;
        }
    }

    // Total number of people who still remember the secret on day n
    // They must have learned between days [n - forget + 1, n]
    let total = 0;
    for (let day = n - forget + 1; day <= n; day++) {
        if (day > 0) {
            total = (total + dp[day]) % MOD;
        }
    }
    return total;
}

/*
Example Usage:
Input: n = 6, delay = 2, forget = 4
Output: 5
*/

console.log(peopleAwareOfSecret(6, 2, 4)); // Output: 5
console.log(peopleAwareOfSecret(4, 1, 3)); // Output: 6

/*
Implementation Notes:
- DP Array keeps track of "when" each person learns the secret.
- We forward-share for each day, but make sure not to share on or after the forget day.
- Summing only those who haven't yet forgotten by day n.

Time/Space: O(n * forget) at worst, fits constraints (n <= 1000)
*/