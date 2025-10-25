/**
 * Calculates the total amount of money in the Leetcode bank after n days.
 *
 * @param n - The number of days Hercy saves money.
 * @returns The total amount of money saved after n days.
 */
function totalMoney(n: number): number {
    // Number of complete weeks and remaining days
    const weekCount = Math.floor(n / 7);  // number of complete weeks
    const remainingDays = n % 7;          // days in the last week

    let total = 0;

    // Add the deposits for all complete weeks.
    // For week i (0-indexed), Monday deposit is (i+1)
    // The deposits for the week: (i+1) + (i+2) + ... + (i+7)
    // This is an arithmetic sequence: sum = 7*(i+1) + 0+1+2+3+4+5+6 = 7*(i+1) + 21 = 7*(i+1) + 21
    // Simpler: For each week, sum = 7*(i+1) + (0+1+2+3+4+5+6) = 7*(i+1) + 21 = 7*(i+1) + 21
    // But better: sum of (i+1) + (i+2) + ... + (i+7) = 7*(i+1) + 21
    // Actually, sum = 7*(i+1) + sum(0..6) = 7*(i+1) + 21 = 7*(i+1+3) = 7*(i+4)

    for (let i = 0; i < weekCount; i++) {
        // Each week: deposits = (i+1) + (i+2) + ... + (i+7)
        // sum = 7*(i+1) + (0+1+2+3+4+5+6) = 7*(i+1) + 21
        total += 7 * (i + 1) + 21;
    }

    // Add the deposits for the remaining days in the last (incomplete) week
    // Deposit sequence: (weekCount+1), (weekCount+2), ..., (weekCount+remainingDays)
    // sum = (weekCount+1 + weekCount+remainingDays) * remainingDays / 2
    //     = (2*weekCount + remainingDays + 1) * remainingDays / 2
    total += ((2 * weekCount + 1 + remainingDays) * remainingDays) / 2;

    return total;
}

// ------- Example test cases -------

// Example 1
console.log(totalMoney(4));  // Output: 10

// Example 2
console.log(totalMoney(10)); // Output: 37

// Example 3
console.log(totalMoney(20)); // Output: 96

// Edge case (maximum n)
console.log(totalMoney(1000)); // Large output