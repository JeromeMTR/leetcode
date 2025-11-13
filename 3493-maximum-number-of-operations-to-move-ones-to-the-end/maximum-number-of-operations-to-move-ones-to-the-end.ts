// Function to return the maximum number of operations as described
function maxOperations(s: string): number {
    // Counter to track the number of '1's encountered so far
    let countOne: number = 0;
    // Answer variable to store the total number of operations needed
    let ans: number = 0;
    // Index to iterate through the string
    let i: number = 0;

    // Iterate through each character in the string
    while (i < s.length) {
        // If current character is '0'
        if (s[i] === "0") {
            // Skip consecutive '0's since they don't require separate operations
            // All consecutive '0's can be handled together in one operation block
            while (i + 1 < s.length && s[i + 1] === "0") {
                i++;
            }
            // Add the count of '1's seen so far to the answer
            // Each '1' to the left of this '0' block needs to move past all '0's in this block
            ans += countOne;
        } else {
            // If current character is '1', increment the counter
            countOne++;
        }
        // Move to the next character
        i++;
    }
    // Return the total number of operations needed
    return ans;
}

/*
IOCE
====

EXAMPLE 1:
----------
Input: "1001101"
Output: 4
Explanation: See problem statement.

EXAMPLE 2:
----------
Input: "00111"
Output: 0

Edge:
-----
Input: "1"
Output: 0

Input: "0"
Output: 0

Input: "101010"
Output: 3

Input: "000111"
Output: 0
*/

// Sample IO Test
console.log(maxOperations("1001101")); // 4
console.log(maxOperations("00111")); // 0
console.log(maxOperations("1")); // 0
console.log(maxOperations("101010")); // 3
console.log(maxOperations("000111")); // 0