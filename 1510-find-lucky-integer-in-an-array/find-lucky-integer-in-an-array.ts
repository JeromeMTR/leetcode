/**
 * Finds the largest lucky integer in an array.
 * A lucky integer is an integer whose frequency in the array equals its value.
 * @param arr - The input array of integers.
 * @returns The largest lucky integer, or -1 if none found.
 */

// IOCE
// Input: arr: number[] (array of integers)
// Output: number (largest lucky integer, or -1 if none found)
// Constraints: 1 <= arr.length <= 500, 1 <= arr[i] <= 500
// Edge cases: No lucky integer exists, multiple lucky numbers, all numbers same

function findLucky(arr: number[]): number {
    // Create a map to count frequency of each integer
    const freq: { [num: number]: number } = {};

    // Count the frequency of each number
    for (const num of arr) {
        freq[num] = (freq[num] || 0) + 1;
    }

    let result = -1; // Start with -1 (no lucky integer found)

    // Check all numbers in the frequency map
    for (const key in freq) {
        const number = parseInt(key, 10);
        const count = freq[number];
        // If frequency equals the number, it's a lucky integer
        if (number === count) {
            result = Math.max(result, number); // Keep the largest one
        }
    }

    return result;
}

// Example Usage:
console.log(findLucky([2,2,3,4]));       // Output: 2
console.log(findLucky([1,2,2,3,3,3]));   // Output: 3
console.log(findLucky([2,2,2,3,3]));     // Output: -1