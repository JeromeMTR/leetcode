// Function to count the valid subarrays
function countSubarrays(nums: number[], k: number): number {
    // Initialize variables
    let count = 0;     // To store the count of valid subarrays
    let maxVal = Math.max(...nums); // Find the maximum value in the array
    let n = nums.length;            // Number of elements in the array
    let currentMaxCount = 0;        // Number of times maxVal appears in the current window
    let start = 0;      // Start of the current sliding window

    // Iterate over the array with 'end' as the end of the current sliding window
    for (let end = 0; end < n; end++) {
        // If the current element is equal to the max value, increment the max value count
        if (nums[end] === maxVal) {
            currentMaxCount++;
        }

        // If the current max value count is equal or greater than 'k', count the subarrays
        while (currentMaxCount >= k) {
            // Since we can contract the window from the start while maintaining 'k' occurrences of max,
            // all subarrays from start to end are valid
            count += (n - end); // Add all possible end positions till the end of the array

            // Move the start of the window ahead to explore further possible subarrays
            if (nums[start] == maxVal) {
                currentMaxCount--; // Reduce the count if we move past a maximum element
            }
            start++; // Move the window start forward
        }
    }

    // Return the total count of valid subarrays
    return count;
}

// Example I/OCE
const example1 = countSubarrays([1, 3, 2, 3, 3], 2);
console.log(example1); // Output: 6

const example2 = countSubarrays([1, 4, 2, 1], 3);
console.log(example2); // Output: 0