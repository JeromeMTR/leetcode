/**
 * Returns the total frequencies of elements in nums such that those elements all have the maximum frequency.
 * @param nums - The input array of positive integers.
 * @returns The sum of frequencies for elements with the maximum frequency.
 */
function maxFrequencyCount(nums: number[]): number {
    // Store frequency of each number
    const freqMap: Record<number, number> = {};

    // Count the frequency
    for (const num of nums) {
        freqMap[num] = (freqMap[num] || 0) + 1;
    }

    // Find the maximum frequency
    let maxFreq = 0;
    for (const freq of Object.values(freqMap)) {
        if (freq > maxFreq) {
            maxFreq = freq;
        }
    }

    // Count the total frequencies for elements with max frequency
    let total = 0;
    for (const num of nums) {
        if (freqMap[num] === maxFreq) {
            total++;
        }
    }

    return total;
}

/* Example Test Cases */

// Example 1
console.log(maxFrequencyCount([1,2,2,3,1,4])); // Output: 4

// Example 2
console.log(maxFrequencyCount([1,2,3,4,5])); // Output: 5

// Custom Example
console.log(maxFrequencyCount([2,2,2,3,3,1,1])); // Output: 3

// Edge case: Only one element
console.log(maxFrequencyCount([5])); // Output: 1

// Edge case: All the same element
console.log(maxFrequencyCount([7,7,7])); // Output: 3