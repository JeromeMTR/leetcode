/**
 * IOCE
 * 
 * Input: num: number, where 1 <= num <= 10^4 and num consists only of digits 6 and 9
 * Output: number - maximum number obtainable by changing at most one digit (6↔9)
 * Constraints:
 *   - 1 <= num <= 10^4
 *   - num only contains digits 6 and 9
 * Example:
 *   Input: 9669
 *   Output: 9969
 */

/**
 * Function to maximize the number by changing at most one digit (6↔9)
 * @param num - the input number
 * @returns maximized number after one change
 */
function maximum69Number(num: number): number {
    // Convert number to character array to manipulate individual digits
    const digits = num.toString().split('');
    for (let i = 0; i < digits.length; i++) {
        if (digits[i] === '6') {
            // Change the first '6' to '9' and break
            digits[i] = '9';
            break;
        }
    }
    // Join digits back and convert to number
    return parseInt(digits.join(''));
}

// Example usage
console.log(maximum69Number(9669)); // Output: 9969
console.log(maximum69Number(9996)); // Output: 9999
console.log(maximum69Number(9999)); // Output: 9999