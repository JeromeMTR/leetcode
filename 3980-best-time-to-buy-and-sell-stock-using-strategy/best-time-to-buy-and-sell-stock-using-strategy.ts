/**
 * Calculates the maximum possible profit after at most one segment modification.
 * 
 * IOCE:
 * Input:
 *  - prices: number[]  // Stock prices per day
 *  - strategy: number[]  // Trading action per day (-1: buy, 0: hold, 1: sell)
 *  - k: number  // Length of the modification window (even number)
 * Output:
 *  - number  // Maximum possible profit
 * Constraints:
 *  - 2 <= prices.length == strategy.length <= 1e5
 *  - 1 <= prices[i] <= 1e5
 *  - -1 <= strategy[i] <= 1
 *  - 2 <= k <= prices.length, k is even
 */

function maxProfit(prices: number[], strategy: number[], k: number): number {
    const n = prices.length;
    let originalProfit = 0;
    
    // Compute original profit
    for (let i = 0; i < n; ++i) {
        originalProfit += strategy[i] * prices[i];
    }

    const halfK = k / 2;
    // Precompute:
    // - window sum for the first k/2 entries in the window (positions [l, l+halfK-1])
    // - window sum for the last k/2 entries in the window (positions [l+halfK, l+k-1])

    // Compute prefix sums for the two window parts
    // prefixSum[i] = sum of (strategy[i] * prices[i]) up to i-1 (0-based, prefixSum[0]=0)
    const prefixSum = new Array(n + 1).fill(0);
    for (let i = 0; i < n; ++i) {
        prefixSum[i + 1] = prefixSum[i] + strategy[i] * prices[i];
    }

    // Compute prefix sums for just prices for fast window queries
    const prefixStrategy = new Array(n + 1).fill(0); // sum of strategy[i]*prices[i]
    for (let i = 0; i < n; ++i) {
        prefixStrategy[i + 1] = prefixStrategy[i] + strategy[i] * prices[i];
    }

    // For window [l, l+k-1]:
    // - sumFirstHalf: sum over [l, l+halfK-1] of strategy[i]*prices[i]
    // - sumLastHalf:  sum over [l+halfK, l+k-1]     "
    // After modification:
    // - sumFirstHalf --> replaced with zero (as all set to 0)
    // - sumLastHalf  --> replaced with sum over all SELL, i.e. sum of 1 * prices[i] = sum of prices[i]
    // Gain for window = (new - old) = (0 - sumFirstHalf) + (sum over prices in last half - sumLastHalf)
    // = -sumFirstHalf + sumLastPrices - sumLastHalf

    // Precompute prefix sums for just prices
    const prefixPrices = new Array(n + 1).fill(0);
    for (let i = 0; i < n; ++i) {
        prefixPrices[i + 1] = prefixPrices[i] + prices[i];
    }

    let maxGain = 0;

    for (let l = 0; l <= n - k; ++l) {
        // sumFirstHalf: [l, l+halfK-1]
        const left = l;
        const right = l + halfK - 1;
        let sumFirstHalf = prefixStrategy[right + 1] - prefixStrategy[left];

        // sumLastHalf: [l+halfK, l + k - 1]
        const left2 = l + halfK;
        const right2 = l + k - 1;
        let sumLastHalf = prefixStrategy[right2 + 1] - prefixStrategy[left2];

        // sum of prices in last half
        let sumLastPrices = prefixPrices[right2 + 1] - prefixPrices[left2];

        // Gain = -sumFirstHalf + sumLastPrices - sumLastHalf
        let gain = -sumFirstHalf + sumLastPrices - sumLastHalf;

        if (gain > maxGain) {
            maxGain = gain;
        }
    }

    return originalProfit + maxGain;
}

/*
Example 1:
prices = [4,2,8], strategy = [-1,0,1], k = 2
maxProfit([4,2,8], [-1,0,1], 2) => 10

Example 2:
prices = [5,4,3], strategy = [1,1,0], k = 2
maxProfit([5,4,3], [1,1,0], 2) => 9

Edge:
prices = [3,1,2,1]
strategy = [-1,0,1,1]
k = 2
maxProfit([3,1,2,1], [-1,0,1,1], 2) => 3

prices = [1,2,1,2,1,2], strategy = [-1,-1,1,1,1,0], k = 2
maxProfit([1,2,1,2,1,2], [-1,-1,1,1,1,0], 2) => 4

prices = [1,1,3,3,3,4,4,4,5,5], strategy = [-1,0,1,1,0,1,0,0,-1,-1], k = 2
maxProfit([1,1,3,3,3,4,4,4,5,5], [-1,0,1,1,0,1,0,0,-1,-1], 2) => 4
*/