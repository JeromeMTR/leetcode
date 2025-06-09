/**
 * IOCE:
 * Input: n: number, k: number
 * Output: number (the k-th lexicographically smallest)
 * Constraints: 1 <= k <= n <= 1e9
 * Example: n=13, k=2 -> 10
 */

/**
 * Counts the numbers with prefix `prefix` up to `n`
 */
function countPrefix(prefix: number, n: number): number {
    let count = 0;
    let first = prefix;
    let last = prefix;
    // At each level, count the numbers with current prefix
    while (first <= n) {
        // Add the count from first to Math.min(last, n)
        count += Math.min(last, n) - first + 1;
        first *= 10;
        last = last * 10 + 9;
    }
    return count;
}

function findKthNumber(n: number, k: number): number {
    let curr = 1;
    k -= 1; // Since '1' is the first number

    while (k > 0) {
        let count = countPrefix(curr, n);

        // If skipping the whole subtree under `curr` doesn't eat up k numbers,
        // skip to next prefix
        if (count <= k) {
            curr++;    // move to next prefix
            k -= count;
        } else {
            // Go deeper into this prefix
            curr *= 10;
            k -= 1; // take current prefix itself
        }
    }
    return curr;
}

// -- Examples:

console.log(findKthNumber(13, 2)); // Output: 10
console.log(findKthNumber(1, 1));  // Output: 1

// Additional test case
// console.log(findKthNumber(100, 10)); // Try more test cases if needed.