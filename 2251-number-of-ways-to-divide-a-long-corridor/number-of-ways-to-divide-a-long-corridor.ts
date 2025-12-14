// IOCE: 
// Input: A string "corridor" consisting of 'S' and 'P'
// Output: Number of ways to split corridor into sections, each with exactly 2 seats, mod 1e9+7

function numberOfWays(corridor: string): number {
    const MOD = 1e9 + 7;

    // First, count total seats
    let seatCount = 0;
    for (let c of corridor) {
        if (c === 'S') seatCount++;
    }

    // If seat count is not even or less than 2, no way to divide
    if (seatCount === 0 || seatCount % 2 !== 0) return 0;

    let totalWays = 1;
    let currentSeats = 0;
    let i = 0;
    let n = corridor.length;
    let prevSeatIdx = -1;

    while (i < n) {
        if (corridor[i] === 'S') {
            currentSeats++;
            // Each time we finish a section (found 2 seats), 
            // count the number of plants (ways to divide).
            if (currentSeats === 2) {
                // Now, find next section's first seat. 
                // The number of plants in between (+1) is the number of places to divide this section and the next

                // index of current seat is i; now step ahead to find next seat
                let j = i + 1;
                let plants = 0;
                while (j < n && corridor[j] === 'P') {
                    plants++;
                    j++;
                }
                // If there is a next section, multiply the ways
                if (j < n) {
                    totalWays = (totalWays * (plants + 1)) % MOD;
                }
                // Update position and section seat counter
                currentSeats = 0;
                i = j - 1; // minus 1 because will add 1 at end of loop
            }
        }
        i++;
    }
    return totalWays;
}

// Example IOCE tests
// console.log(numberOfWays("SSPPSPS")); // Output: 3
// console.log(numberOfWays("PPSPSP"));  // Output: 1
// console.log(numberOfWays("S"));       // Output: 0