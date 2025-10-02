/**
 * Calculates the maximum number of water bottles that can be drunk,
 * given initial full bottles and a dynamic exchange rate for empty ones.
 * 
 * @param numBottles Initial full bottles.
 * @param numExchange Starting exchange rate for empty-to-full conversion.
 * @returns The maximum number of bottles drunk.
 */
function maxBottlesDrunk(numBottles: number, numExchange: number): number {
    // INPUT: numBottles - initial full bottles, numExchange - starting exchange cost

    // OUTPUT: integer; maximum bottles that can be drunk

    // CONSTRAINTS: 1 <= numBottles <= 100; 1 <= numExchange <= 100

    // EXAMPLES:
    // maxBottlesDrunk(13, 6) => 15
    // maxBottlesDrunk(10, 3) => 13

    let bottlesDrunk = 0;         // Total bottles drunk
    let full = numBottles;        // Current number of full bottles
    let empty = 0;                // Current number of empty bottles
    let exchange = numExchange;   // Current exchange cost

    // Main loop: continue as long as there is anything to drink or exchange!
    while (full > 0) {
        // Step 1: Drink all available full bottles
        bottlesDrunk += full;     // Accumulate drunk bottles
        empty += full;            // All drunk bottles become empty
        full = 0;                 // No more full bottles

        // Step 2: Try a single exchange at current exchange cost
        if (empty >= exchange) {
            empty -= exchange;    // Use up empties for exchange
            full = 1;             // Get one new full bottle
            exchange += 1;        // Exchange cost increases for next round
        } else {
            // Not enough empties to exchange, break out of the loop
            break;
        }
    }

    return bottlesDrunk;
}

// Example IOCE testing
console.log(maxBottlesDrunk(13, 6));    // Output: 15
console.log(maxBottlesDrunk(10, 3));    // Output: 13