/**
 * Calculates the maximum number of water bottles you can drink 
 * by exchanging empty bottles for new ones.
 * 
 * @param numBottles - Initial number of full water bottles
 * @param numExchange - Number of empty bottles required to exchange for one full bottle
 * @returns Maximum number of bottles you can drink
 */
function numWaterBottles(numBottles: number, numExchange: number): number {
    // Total number of bottles drunk, initially you have numBottles full bottles.
    let totalDrank = numBottles;
    // Number of empty bottles after drinking all
    let emptyBottles = numBottles;

    // While the number of empty bottles is enough for an exchange
    while (emptyBottles >= numExchange) {
        // Number of new full bottles can get in this round
        const newBottles = Math.floor(emptyBottles / numExchange);
        // Add them to the total count
        totalDrank += newBottles;
        // Update the number of empty bottles:
        // Used up: newBottles * numExchange
        // Gained: newBottles (the ones just drunk)
        emptyBottles = emptyBottles - newBottles * numExchange + newBottles;
    }

    return totalDrank;
}

// --- IOCE: Input/Output/Console Example ---

// Example 1:
console.log(numWaterBottles(9, 3)); // Output: 13

// Example 2:
console.log(numWaterBottles(15, 4)); // Output: 19

// Example 3 (additional):
console.log(numWaterBottles(5, 5)); // Output: 6
// Explanations:
// - Drink 5 bottles -> 5 empty
// - Exchange 5 empty for 1 full -> drink it (6 total) -> 1 new empty
// - Cannot exchange again

/**
 * Example output:
 * 13
 * 19
 * 6
 */