// Function to find the length of the smallest number made only of '1's and divisible by k
function smallestRepunitDivByK(k: number): number {
    // If k is even or ends with 5, there is no such number
    if (k % 2 === 0 || k % 5 === 0) return -1;

    let remainder = 0;
    // We only need to check up to k iterations, because of the Pigeonhole Principle
    for (let length = 1; length <= k; length++) {
        // Construct the next remainder as if we appended a '1' digit at the end
        // (remainder * 10 + 1) % k
        remainder = (remainder * 10 + 1) % k;
        // If at any point remainder is zero, we've found our answer
        if (remainder === 0) return length;
    }
    // If not found within k iterations, it is impossible
    return -1;
}

/*
IOCE

// Input: k = 1
console.log(smallestRepunitDivByK(1)); // Output: 1

// Input: k = 2
console.log(smallestRepunitDivByK(2)); // Output: -1

// Input: k = 3
console.log(smallestRepunitDivByK(3)); // Output: 3

// More test cases:
// Input: k = 7
console.log(smallestRepunitDivByK(7)); // Output: 6 (111111 is divisible by 7)

// Input: k = 13
console.log(smallestRepunitDivByK(13)); // Output: 6 (111111 is divisible by 13)
*/