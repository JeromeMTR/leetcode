/**
 * Function to check for the presence of three consecutive odd numbers in an array.
 * 
 * @param arr - Array of integers to be checked
 * @returns boolean - Returns true if three consecutive odd numbers are found, otherwise false
 */
function threeConsecutiveOdds(arr: number[]): boolean {
    // Initialize a counter for consecutive odd numbers
    let consecutiveOddCount = 0;
    
    // Iterate through each number in the array
    for (let i = 0; i < arr.length; i++) {
        // Check if the current number is odd
        if (arr[i] % 2 !== 0) {
            // Increment the counter for consecutive odd numbers
            consecutiveOddCount++;
            // Check if there have been three consecutive odds
            if (consecutiveOddCount === 3) {
                return true;  // Return true immediately if found
            }
        } else {
            // Reset counter if the current number is not odd
            consecutiveOddCount = 0;
        }
    }
    
    // If loop finishes without finding 3 consecutive odds, return false
    return false;
}

// Example usage:

// Example 1
const arr1 = [2, 6, 4, 1];
console.log(threeConsecutiveOdds(arr1));  // Output: false

// Example 2
const arr2 = [1, 2, 34, 3, 4, 5, 7, 23, 12];
console.log(threeConsecutiveOdds(arr2));  // Output: true