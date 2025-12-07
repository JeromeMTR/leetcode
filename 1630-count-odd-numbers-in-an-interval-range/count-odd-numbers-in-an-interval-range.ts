/**
 * Counts the odd numbers between low and high (inclusive).
 * 
 * IOCE:
 * Input: low = 3, high = 7
 * Output: 3
 * Explanation: Odd numbers are [3,5,7]
 * 
 * Input: low = 8, high = 10
 * Output: 1
 * Explanation: Odd numbers are [9]
 * 
 * Constraints:
 * 0 <= low <= high <= 10^9
 * 
 * @param low - lower bound (inclusive)
 * @param high - upper bound (inclusive)
 * @returns number of odd numbers between low and high
 */
function countOdds(low: number, high: number): number {
    // The number of odds up to 'x' is Math.floor((x + 1) / 2)
    // So odds between low and high is oddsTill(high) - oddsTill(low-1)
    return Math.floor((high + 1) / 2) - Math.floor(low / 2);
}

// Example usages:
// console.log(countOdds(3, 7)); // 3
// console.log(countOdds(8, 10)); // 1