/**
 * Returns the number of distinct bitwise ORs of all non-empty subarrays of arr.
 * @param arr Input array of integers
 * @returns Number of unique bitwise OR results
 */
function subarrayBitwiseORs(arr: number[]): number {
    // Set to store all unique bitwise ORs across all subarrays
    const allResults: Set<number> = new Set();

    // Set to keep track of OR results for subarrays ending at previous index
    let prev: Set<number> = new Set();

    // Traverse the array
    for (const num of arr) {
        // Start a new set for current index: always include current number (single-element subarray)
        const curr: Set<number> = new Set([num]);

        // For each OR-result from previous step, 'extend' those subarrays by including current num
        for (const bitwiseResult of prev) {
            curr.add(bitwiseResult | num);
        }

        // Merge current results into the global result
        for (const val of curr) {
            allResults.add(val);
        }

        // Prepare for next iteration
        prev = curr;
    }

    return allResults.size;
}

// ----------------- IOCE: Input/Output Demonstration -----------------

// Example 1
const arr1 = [0];
console.log(subarrayBitwiseORs(arr1)); // Output: 1

// Example 2
const arr2 = [1, 1, 2];
console.log(subarrayBitwiseORs(arr2)); // Output: 3

// Example 3
const arr3 = [1, 2, 4];
console.log(subarrayBitwiseORs(arr3)); // Output: 6

// Custom Example
const arr4 = [7, 7, 7];
console.log(subarrayBitwiseORs(arr4)); // Output: 1

/**
Example Output:
1
3
6
1
*/