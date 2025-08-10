/**
 * Determines if the digits of n can be reordered to form a power of two.
 * @param n The integer to check.
 * @returns True if possible, else false.
 */
function reorderedPowerOf2(n: number): boolean {
    // Helper: Get the digit signature (sorted string of digits)
    function digitSignature(num: number): string {
        return num.toString().split('').sort().join('');
    }

    const nSignature = digitSignature(n);

    // Try all powers of two up to 10^9
    for (let i = 0; i < 31; ++i) { // 2^30 = 1073741824 > 10^9
        const powerOfTwo = 1 << i;
        if (digitSignature(powerOfTwo) === nSignature) {
            return true;
        }
    }
    return false;
}

/*
IOCE: Input/Output/Commented Examples

Example 1:
Input: n = 1
Output: true
Explanation: 1 is 2^0

Example 2:
Input: n = 10
Output: false
Explanation: No permutation is a power of 2

Example 3:
Input: n = 46
Output: true
Explanation: 64 is 2^6

Example 4:
Input: n = 24
Output: false
Explanation: 24 can be reordered as 42, 24, etc. but none are a power of 2

*/
console.log(reorderedPowerOf2(1));    // true
console.log(reorderedPowerOf2(10));   // false
console.log(reorderedPowerOf2(46));   // true
console.log(reorderedPowerOf2(24));   // false