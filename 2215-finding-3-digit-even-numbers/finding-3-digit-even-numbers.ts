/**
 * Function to find all unique three-digit even numbers that can be formed
 * from the given digits, following the specified requirements.
 * 
 * @param digits - An array of integers where each element is a digit.
 * @returns A sorted array of unique integers that are even, do not have leading zeros,
 * and are formed by concatenating three elements from digits.
 * 
 * Example:
 * Input: digits = [2,1,3,0]
 * Output: [102,120,130,132,210,230,302,310,312,320]
 */
function findUniqueEvenNumbers(digits: number[]): number[] {
    const uniqueNumbers: Set<number> = new Set();

    // Helper function to check if a given number is even
    const isEven = (number: number): boolean => number % 2 === 0;

    // Iterate over each triplet of indices to select elements forming the three-digit number
    for (let i = 0; i < digits.length; i++) {
        for (let j = 0; j < digits.length; j++) {
            for (let k = 0; k < digits.length; k++) {
                // Ensure indices are distinct
                if (i !== j && j !== k && i !== k) {
                    // Form the number from the three selected digits
                    const num = digits[i] * 100 + digits[j] * 10 + digits[k];
                    
                    // Check number requirements: No leading zero and even number
                    if (digits[i] !== 0 && isEven(digits[k])) {
                        uniqueNumbers.add(num);
                    }
                }
            }
        }
    }

    // Convert the set of unique numbers to a sorted array
    return Array.from(uniqueNumbers).sort((a, b) => a - b);
}

// Example usage:
console.log(findUniqueEvenNumbers([2,1,3,0])); // Output: [102,120,130,132,210,230,302,310,312,320]
console.log(findUniqueEvenNumbers([2,2,8,8,2])); // Output: [222,228,282,288,822,828,882]
console.log(findUniqueEvenNumbers([3,7,5])); // Output: []