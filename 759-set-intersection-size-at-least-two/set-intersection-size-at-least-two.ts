// IOCE (Input Output Constraints and Examples)
// Input: intervals: number[][]
// Output: number (minimum size of containing set)

// The main idea: Greedy. Sort intervals by end, and always try to pick the largest numbers possible that can help satisfy as many intervals as possible, ensuring at least two selections per interval.

// Step-by-step:
// 1. Sort intervals by the end, breaking ties by start descending (to handle overlaps).
// 2. For each interval, maintain a seen array where we record all the numbers selected so far.
// 3. For each interval, check how many of the necessary numbers (in that range) are already in the set.
// 4. If fewer than 2, add the minimum necessary unique numbers from the right end of the interval to the answer set.

function minSetSize(intervals: number[][]): number {
    // Step 1: Sort by end ascending, then by start descending
    intervals.sort((a, b) => {
        if (a[1] !== b[1]) return a[1] - b[1];
        return b[0] - a[0];
    });

    // Step 2: Set to store current selected numbers for the result
    const nums = new Set<number>();

    // For each interval, track which numbers have been picked in its range
    let last = -1, secondLast = -1; // last two numbers picked

    for (let i = 0; i < intervals.length; i++) {
        const [start, end] = intervals[i];
        let count = 0;

        // Check if last and secondLast picked are in the current interval
        if (last >= start && last <= end) count++;
        if (secondLast >= start && secondLast <= end) count++;

        // Always ensure both are different
        if (count === 2) continue;

        // Need to pick more numbers: pick from end, making sure we don't pick the same as before
        // Add to the set, and update last and secondLast
        if (count === 1) {
            // Only one covered. Add the largest in [start, end] that is not already last/secondLast
            const pick = end === last ? end - 1 : end;
            nums.add(pick);
            secondLast = last;
            last = pick;
        } else {
            // None covered. Need to add two numbers: end-1 and end
            nums.add(end - 1);
            nums.add(end);
            secondLast = end - 1;
            last = end;
        }
    }

    return nums.size;
}

// --- Explanations and Example Use ---
// Example 1:
console.log(minSetSize([[1,3],[3,7],[8,9]])); // Output: 5

// Example 2:
console.log(minSetSize([[1,3],[1,4],[2,5],[3,5]])); // Output: 3

// Example 3:
console.log(minSetSize([[1,2],[2,3],[2,4],[4,5]])); // Output: 5

// Custom case:
// console.log(minSetSize([[1,1],[3,3],[3,4],[4,4],[5,5]])); // Output: 4