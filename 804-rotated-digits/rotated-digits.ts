/*
IOCE

Inputs:
- n: number
  - An integer representing the upper bound of the range [1, n]

Outputs:
- number
  - The count of "good" numbers in the range [1, n]

Constraints:
- 1 <= n <= 10^4

Edge Cases:
- n = 1 => output 0
- Numbers containing invalid digits: 3, 4, 7 are not valid after rotation
- Numbers with only unchanged rotating digits (0, 1, 8) are valid but NOT good
  - Example: 1, 10, 88
- A number is good only if:
  1. All digits are valid after rotation
  2. At least one digit changes after rotation
*/

function rotatedDigits(n: number): number {
    let count = 0;

    for (let i = 1; i <= n; i++) {
        if (isValid(i)) {
            count++;
        }
    }

    return count;
}

function isValid(num: number): boolean {
    let hasChangedDigit = false;
    let current = num;

    while (current > 0) {
        const digit = current % 10;

        // Invalid digits after rotation
        if (digit === 3 || digit === 4 || digit === 7) {
            return false;
        }

        // Digits that change after rotation
        if (digit === 2 || digit === 5 || digit === 6 || digit === 9) {
            hasChangedDigit = true;
        }

        current = Math.floor(current / 10);
    }

    return hasChangedDigit;
}

// Console log tests
console.log(rotatedDigits(10)); // 4
console.log(rotatedDigits(1));  // 0
console.log(rotatedDigits(2));  // 1
console.log(rotatedDigits(20)); // 9
console.log(rotatedDigits(100)); // verify larger case
