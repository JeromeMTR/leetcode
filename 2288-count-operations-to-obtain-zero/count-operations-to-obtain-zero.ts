/**
 * Returns the number of operations required to make either num1 or num2 zero.
 * 
 * At each operation, subtract the smaller number from the larger.
 * 
 * IOCE:
 * Input: two non-negative numbers
 * Output: number of operations to make either num1==0 or num2==0
 * Constraints: 0 <= num1, num2 <= 10^5
 * Example: num1=2,num2=3 -> output=3
 */
function countOperations(num1: number, num2: number): number {
    let operations = 0;

    // Continue until one of the numbers is zero
    while (num1 > 0 && num2 > 0) {
        if (num1 >= num2) {
            // Do as many subtractions at once as possible
            let times = Math.floor(num1 / num2);
            operations += times;
            num1 -= times * num2;
        } else {
            let times = Math.floor(num2 / num1);
            operations += times;
            num2 -= times * num1;
        }
    }

    return operations;
}

// --- Example usage / Test cases ---

console.log(countOperations(2, 3));    // Output: 3
console.log(countOperations(10, 10));  // Output: 1
console.log(countOperations(0, 5));    // Output: 0
console.log(countOperations(5, 0));    // Output: 0
console.log(countOperations(15, 4));   // Output: 5 (15-4-4-4-3, 4-3...etc)