// IOCE: Input-Output Code Example with Comments

function minCostToMakeBasketsEqual(basket1: number[], basket2: number[]): number {
    // Count frequency of all fruits in both baskets
    const freq = new Map<number, number>();
    for (const fruit of basket1) freq.set(fruit, (freq.get(fruit) || 0) + 1);
    for (const fruit of basket2) freq.set(fruit, (freq.get(fruit) || 0) - 1);
    
    // If any fruit appears odd number of times in total, impossible to make baskets equal
    for (const v of freq.values()) {
        if (Math.abs(v) % 2 !== 0) return -1;
    }

    // Find the value of the smallest fruit in ALL baskets (for optimal swaps)
    const minElement = Math.min(...basket1, ...basket2);

    // Collect differences to swap, only keep the extra counts for future swaps
    const toSwap: number[] = [];

    for (const [fruit, diff] of freq.entries()) {
        // Only enqueue needed swaps for extra in either basket
        for (let i = 0; i < Math.abs(diff) / 2; ++i) {
            toSwap.push(fruit);
        }
    }

    toSwap.sort((a, b) => a - b);

    // Total swaps needed is half of toSwap (since each swap fixes 2 out-of-place items)
    let totalCost = 0, n = toSwap.length / 2;
    // Always pair smallest (cheapest) out-of-place item with the largest
    for (let i = 0; i < n; ++i) {
        // For each "swap", the cost is min(direct swap, 2*minElement via double swap through minElement)
        totalCost += Math.min(toSwap[i], 2 * minElement);
    }
    return totalCost;
}

// Example Usage with IO
const basket1a = [4, 2, 2, 2], basket2a = [1, 4, 1, 2];
const basket1b = [2, 3, 4, 1], basket2b = [3, 2, 5, 1];

console.log(minCostToMakeBasketsEqual(basket1a, basket2a)); // Output: 1
console.log(minCostToMakeBasketsEqual(basket1b, basket2b)); // Output: -1