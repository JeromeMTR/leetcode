/**
 * Finds all pairs of numbers with the minimum absolute difference.
 *
 * IOCE (Input, Output, Constraints, Examples)
 * - Input: An array of integers `arr` (assumed distinct per problem constraints).
 * - Output: An array of pairs (each pair is a two-element array) representing all
 *   adjacent values with the minimal absolute difference after sorting.
 * - Constraints: The function sorts the input array in-place. Problem assumes
 *   `arr.length >= 2` and all values are distinct; duplicates in examples are for illustration.
 * - Examples: See `@example` tags below.
 *
 * @param {number[]} arr - Array of integers to analyze; will be sorted in-place.
 * @returns {number[][]} All pairs with the smallest absolute difference, sorted by value.
 *
 * @example
 * // returns [[1,2],[2,3],[3,4]]
 * minimumAbsDifference([4, 2, 1, 3]);
 *
 * @example
 * // returns [[1,3]]
 * minimumAbsDifference([1, 3, 6, 10, 15]);
 *
 * @example
 * // returns [[-14,-10],[19,23],[23,27]]
 * minimumAbsDifference([3, 8, -10, 23, 19, -4, -14, 27]);
 *
 * @remarks
 * The algorithm sorts the array, then scans adjacent pairs to track the minimum difference.
 * Time complexity is O(n log n) due to sorting; the scan is O(n). Space complexity is O(1)
 * extra (excluding the output), since sorting is in-place and only a few variables are used.
 */
function minimumAbsDifference(arr: number[]): number[][] {
    // Sort the array to easily find pairs with minimum difference
    arr.sort((a, b) => a - b);

    const result: number[][] = [];
    let minDiff = Infinity;

    // Iterate through the array to find the minimum difference
    for (let i = 0; i < arr.length - 1; i++) {
        const diff = arr[i + 1] - arr[i];

        if (diff < minDiff) {
            minDiff = diff;
            result.length = 0; // Clear result array for new minimum difference
        }

        if (diff === minDiff) {
            result.push([arr[i], arr[i + 1]]);
        }
    }

    return result;
}

// Example test cases:
console.log(minimumAbsDifference([4, 2, 1, 3])); // Output: [[1,2],[2,3],[3,4]]
console.log(minimumAbsDifference([1, 3, 6, 10, 15])); // Output: [[1,3]]
console.log(minimumAbsDifference([3, 8, -10, 23, 19, -4, -14, 27])); // Output: [[-14,-10],[19,23],[23,27]]

// Additional test cases for validation:
console.log(minimumAbsDifference([3, 1, 2, 1])); // Explanation: Arr is [1,1,2,3], minimum difference but must note distinct - invalid input as per constraints
console.log(minimumAbsDifference([1, 2, 1, 2, 1, 2])); // Explanation: Invalid input as per constraints
console.log(minimumAbsDifference([1, 1, 3, 3, 3, 4, 4, 4, 5, 5])); // Explanation: Invalid input as per constraints