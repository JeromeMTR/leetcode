/**
 * Counts the number of smooth descent periods in the prices array.
 * A smooth descent period is a contiguous subarray where each element
 * (except the first) is exactly 1 less than the previous element.
 * Every single day is also a smooth descent period by itself.
 *
 * @param prices - Array representing the daily stock prices
 * @returns The number of smooth descent periods
 *
 * IOCE:
 * Input: prices = [3,2,1,4]
 * Output: 7
 * 
 * Input: prices = [8,6,7,7]
 * Output: 4
 * 
 * Input: prices = [1]
 * Output: 1
 */

// Time: O(n), Space: O(1)
function getDescentPeriods(prices: number[]): number {
    let result = 0;
    let streak = 1; // Every day at least is a descent period of length 1

    for (let i = 1; i < prices.length; i++) {
        // Check if current price is exactly 1 less than the previous day's price
        if (prices[i - 1] - prices[i] === 1) {
            streak += 1; // Extend current descent streak
        } else {
            streak = 1; // Reset streak for new period (including repeated values or jumps)
        }
        result += streak;
    }

    // Each single day is a descent period, so start result with first day
    return result + 1; 
}

/* 
Test cases:

// Example 1
console.log(getDescentPeriods([3,2,1,4])); // Output: 7

// Example 2
console.log(getDescentPeriods([8,6,7,7])); // Output: 4

// Example 3
console.log(getDescentPeriods([1])); // Output: 1

// Edge Case 1: [3,1,2,1]
console.log(getDescentPeriods([3,1,2,1])); // Output: 3

// Edge Case 2: [1,2,1,2,1,2]
console.log(getDescentPeriods([1,2,1,2,1,2])); // Output: 4

// Edge Case 3: [1,1,3,3,3,4,4,4,5,5]
console.log(getDescentPeriods([1,1,3,3,3,4,4,4,5,5])); // Output: 4
*/