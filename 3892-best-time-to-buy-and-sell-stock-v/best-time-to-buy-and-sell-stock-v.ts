// IOCE (Input, Output, Constraints, Examples):
//
// Input:
// - prices: number[] - prices[i] is the price of the stock on day i
// - k: number - maximum number of transactions allowed
//
// Output:
// - number - the maximum profit possible with at most k transactions
//
// Constraints:
// - 2 <= prices.length <= 1000
// - 1 <= prices[i] <= 1e9
// - 1 <= k <= prices.length / 2
//
// Examples:
// maxProfit([1,7,9,8,2], 2) === 14
// maxProfit([12,16,19,19,8,1,19,13,9], 3) === 36
// maxProfit([3,1,2,1], 2) === 3
// maxProfit([1,2,1,2,1,2], 3) === 4
// maxProfit([1,1,3,3,3,4,4,4,5,5], 2) === 4

function maxProfit(prices: number[], k: number): number {
    const n = prices.length;

    // dp[day][transactionsLeft][state]
    // state:
    // 0 = not holding (not in any transaction)
    // 1 = holding after buying (in normal transaction)
    // 2 = holding after selling (in short transaction, need to buy back)
    const dp: number[][][] = Array.from({ length: n + 1 }, () =>
        Array.from({ length: k + 1 }, () => Array(3).fill(-Infinity))
    );

    // Initialization: At day 0, 0 transactions used, not holding
    dp[0][k][0] = 0;

    for (let day = 0; day < n; ++day) {
        for (let t = 0; t <= k; ++t) {
            for (let state = 0; state < 3; ++state) {
                // Already invalid state, skip
                if (dp[day][t][state] === -Infinity) continue;

                // 1. Do nothing
                // - stay at not holding, or holding if still in transaction
                dp[day + 1][t][state] = Math.max(dp[day + 1][t][state], dp[day][t][state]);

                // 2. If in state 0 (not holding), can start a new transaction if t > 0
                if (state === 0 && t > 0) {
                    // a. Start a normal transaction: buy at prices[day] 
                    //    -> move to state 1 (holding after buy)
                    dp[day + 1][t - 1][1] = Math.max(
                        dp[day + 1][t - 1][1],
                        dp[day][t][0] - prices[day]
                    );
                    // b. Start a short sell: sell at prices[day]
                    //    -> move to state 2 (holding after sell, waiting to buy back)
                    dp[day + 1][t - 1][2] = Math.max(
                        dp[day + 1][t - 1][2],
                        dp[day][t][0] + prices[day]
                    );
                }
                // 3. If in state 1 (holding long after buy), can sell today: finish normal transaction (to state 0)
                if (state === 1) {
                    dp[day + 1][t][0] = Math.max(
                        dp[day + 1][t][0],
                        dp[day][t][1] + prices[day]
                    );
                }
                // 4. If in state 2 (holding short after sell), can buy back today: finish short transaction (to state 0)
                if (state === 2) {
                    dp[day + 1][t][0] = Math.max(
                        dp[day + 1][t][0],
                        dp[day][t][2] - prices[day]
                    );
                }
            }
        }
    }

    // The answer is the max profit at the end (any k, in state 0)
    let res = 0;
    for (let t = 0; t <= k; ++t) {
        res = Math.max(res, dp[n][t][0]);
    }
    return res;
}

// // Examples:
// console.log(maxProfit([1,7,9,8,2], 2)); // 14
// console.log(maxProfit([12,16,19,19,8,1,19,13,9], 3)); // 36
// console.log(maxProfit([3,1,2,1], 2)); // 3
// console.log(maxProfit([1,2,1,2,1,2], 3)); // 4
// console.log(maxProfit([1,1,3,3,3,4,4,4,5,5], 2)); // 4