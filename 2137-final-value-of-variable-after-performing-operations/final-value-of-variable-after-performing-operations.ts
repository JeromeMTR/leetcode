/**
 * Calculates the final value of variable X after performing a series of operations.
 * @param operations An array of operation strings ("++X", "X++", "--X", "X--")
 * @returns The final value of X after performing all operations
 */
function finalValueAfterOperations(operations: string[]): number {
    let X = 0; // Initialize X to 0

    for (const op of operations) {
        if (op.includes("++")) {
            X += 1; // Increment X for any "++" operation
        } else {
            X -= 1; // Decrement X for any "--" operation
        }
    }

    return X;
}

// --- Test cases (IOCE) ---

console.log(finalValueAfterOperations(["--X","X++","X++"])); // Output: 1
console.log(finalValueAfterOperations(["++X","++X","X++"])); // Output: 3
console.log(finalValueAfterOperations(["X++","++X","--X","X--"])); // Output: 0