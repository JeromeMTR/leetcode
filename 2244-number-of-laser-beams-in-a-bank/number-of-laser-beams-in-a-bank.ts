/**
 * Given a 0-indexed binary string array representing a bank floor plan,
 * returns the number of valid laser beams.
 *
 * Each beam connects one device in an upper non-empty row to one in a lower
 * non-empty row with no devices in any rows between these.
 */
function numberOfBeams(bank: string[]): number {
    // Step 1: For each row, count the number of devices ('1's)
    const deviceCounts: number[] = bank.map(row =>
        row.split('').reduce((cnt, ch) => cnt + (ch === '1' ? 1 : 0), 0)
    );

    // Step 2: Only consider rows that have at least one device
    const nonEmptyRows: number[] = deviceCounts.filter(cnt => cnt > 0);

    // Step 3: For each pair of consecutive non-empty rows,
    // the number of beams is product of devices in both rows
    let totalBeams = 0;
    for (let i = 0; i < nonEmptyRows.length - 1; ++i) {
        totalBeams += nonEmptyRows[i] * nonEmptyRows[i + 1];
        // Each device in row[i] can connect to each in row[i+1]
    }

    return totalBeams;
}

// Example usage:
console.log(numberOfBeams(["011001","000000","010100","001000"])); // Output: 8
console.log(numberOfBeams(["000","111","000"]));                   // Output: 0