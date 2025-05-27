/**
 * Returns num1 - num2 where:
 *   - num1: Sum of numbers [1, n] not divisible by m
 *   - num2: Sum of numbers [1, n] divisible by m
 * 
 * @param n - positive integer (range upper bound)
 * @param m - positive integer (divisor)
 * @returns Difference: num1 - num2
 */
function sumDifference(n: number, m: number): number {
    // Sum of all numbers from 1 to n is n*(n+1)/2
    const totalSum = (n * (n + 1)) / 2;
    
    // Find the number of terms in the range [1, n] divisible by m
    const k = Math.floor(n / m); // Number of multiples of m <= n

    // Sum of all numbers divisible by m in [1, n]:
    // m * 1 + m * 2 + ... + m * k = m * (1 + 2 + ... + k) = m * k * (k+1)/2
    const sumDivisibleByM = m * k * (k + 1) / 2;

    // num1: sum of numbers NOT divisible by m
    const num1 = totalSum - sumDivisibleByM;

    // num2: sum of numbers divisible by m
    const num2 = sumDivisibleByM;

    // Return num1 - num2 as required
    return num1 - num2;
}

// --- Example Usage / Simple IO ---
console.log(sumDifference(10, 3)); // Output: 19
console.log(sumDifference(5, 6));  // Output: 15
console.log(sumDifference(5, 1));  // Output: -15

/*
Explanation:
sumDifference(10, 3) returns 19:
    totalSum = 55
    sumDivisibleBy3 = 18
    num1 = 37 (sum of [1,2,4,5,7,8,10])
    num2 = 18 (sum of [3,6,9])
    37 - 18 = 19

sumDifference(5, 6) returns 15:
    sumDivisibleBy6 = 0 (no numbers <= 5 divisible by 6)
    15 - 0 = 15

sumDifference(5, 1) returns -15:
    sumDivisibleBy1 = 15 (all numbers 1 to 5 are divisible by 1)
    0 - 15 = -15
*/