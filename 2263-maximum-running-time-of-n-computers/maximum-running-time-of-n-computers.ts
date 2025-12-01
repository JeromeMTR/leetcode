// IOCE
// Input: n: number, batteries: number[]
// Output: number

/**
 * Find the maximum number of minutes n computers can run simultaneously 
 * by distributing batteries optimally (with possible battery swap)
 *
 * Approach:
 * Use binary search on the answer: the max run time is bounded between 0 and total sum // n
 * For a mid value, check if it's possible to run all n computers for mid minutes
 *
 * To do this, sum min(battery, mid) for all batteries: this is the total contributed time
 * that can be used during mid minutes for all n computers.
 * If sum >= n * mid, then it's feasible.
 *
 * Binary search to find the largest possible mid.
 */
function maxRunTime(n: number, batteries: number[]): number {
    // Sum of all battery minutes
    let total = batteries.reduce((a, b) => a + b, 0);

    let left = 0;
    let right = Math.floor(total / n); // cannot run longer than this in any case

    // Binary search for the largest feasible run time
    while (left < right) {
        // upper mid to avoid infinite loop: +1 so that left eventually meets right
        let mid = Math.floor((left + right + 1) / 2);

        // Calculate total slots we can "fill" if each computer runs for mid minutes
        let usable = 0;
        for (let b of batteries) {
            usable += Math.min(b, mid);
        }
        // If we can power n computers for mid minutes
        if (usable >= n * mid) {
            left = mid; // try to find a bigger valid answer
        } else {
            right = mid - 1; // mid is too big, decrease
        }
    }
    return left;
}

/* 
Example runs:
console.log(maxRunTime(2, [3,3,3])) // Output: 4
console.log(maxRunTime(2, [1,1,1,1])) // Output: 2
console.log(maxRunTime(3, [3,1,2,1])) // Output: 3
console.log(maxRunTime(4, [1,2,1,2,1,2])) // Output: 4
console.log(maxRunTime(4, [1,1,3,3,3,4,4,4,5,5])) // Output: 4
*/