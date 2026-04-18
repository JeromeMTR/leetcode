/*
IOCE

Inputs:
- n: an integer

Output:
- Return an integer representing the mirror distance of n
- mirror distance = abs(n - reverse(n))

Constraints:
- 1 <= n <= 1e9

Edge Cases:
- Single digit number, e.g. n = 7 -> reverse is same, answer = 0
- Number ending with zero, e.g. n = 10 -> reverse(10) = 1
- Palindrome number, e.g. n = 121 -> answer = 0
- Largest constraint values still fit easily in number operations
*/

function mirrorDistance(n: number): number {
    let original = n;
    let reversed = 0;

    // Reverse digits of n
    while (n > 0) {
        const digit = n % 10;
        reversed = reversed * 10 + digit;
        n = Math.floor(n / 10);
    }

    // Return absolute difference
    return Math.abs(original - reversed);
}

// Console log tests
console.log(mirrorDistance(25)); // 27
console.log(mirrorDistance(10)); // 9
console.log(mirrorDistance(7));  // 0
console.log(mirrorDistance(121)); // 0
console.log(mirrorDistance(100)); // 99
console.log(mirrorDistance(908)); // 101
console.log(mirrorDistance(123456789)); // 864197532
