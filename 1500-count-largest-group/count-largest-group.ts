function countLargestGroup(n: number): number {
    const digitSumGroups: { [key: number]: number } = {};

    // Helper function to calculate sum of digits
    const sumOfDigits = (num: number): number => {
        let sum = 0;
        while (num > 0) {
            sum += num % 10;
            num = Math.floor(num / 10);
        }
        return sum;
    };

    // Fill the groups based on sum of digits
    for (let i = 1; i <= n; i++) {
        const sumDigits = sumOfDigits(i);
        if (digitSumGroups[sumDigits] === undefined) {
            digitSumGroups[sumDigits] = 0;
        }
        digitSumGroups[sumDigits]++;
    }

    // Find the size of the largest group
    let maxGroupSize = 0;
    for (const size of Object.values(digitSumGroups)) {
        if (size > maxGroupSize) {
            maxGroupSize = size;
        }
    }

    // Count how many groups have the max size
    let largestGroupCount = 0;
    for (const size of Object.values(digitSumGroups)) {
        if (size === maxGroupSize) {
            largestGroupCount++;
        }
    }

    return largestGroupCount;
}

// IOCE: Input/Output examples with comments
console.log(countLargestGroup(13)); // Output: 4
// Explanation: Groups are formed by sums of digits: [1,10], [2,11], [3,12], [4,13], etc.
// There are 4 groups of size 2, which is the largest size.

console.log(countLargestGroup(2)); // Output: 2
// Explanation: Groups [1] and [2] each have one element. Both are the largest, thus count is 2.