/**
 * Given an integer n, return all numbers in the range [1, n] sorted in lexicographical order.
 * Algorithm is O(n) time and O(1) extra space.
 * 
 * @param {number} n
 * @return {number[]}
 */
function lexicalOrder(n: number): number[] {
    const result: number[] = [];
    let current = 1;
    for (let i = 0; i < n; i++) {
        result.push(current);
        // Try to go to the next level if possible.
        if (current * 10 <= n) {
            current *= 10;
        } else {
            // No more children, find the next sibling
            while (current % 10 === 9 || current + 1 > n) {
                // Backtrack up while we are at the rightmost sibling or exceed n
                current = Math.floor(current / 10);
            }
            current++;
        }
    }
    return result;
}

// IOCE

// Input Example 1:
const input1 = 13;
console.log(`Input: n = ${input1}`); // Output: [1,10,11,12,13,2,3,4,5,6,7,8,9]
console.log("Output:", lexicalOrder(input1));

// Input Example 2:
const input2 = 2;
console.log(`Input: n = ${input2}`); // Output: [1,2]
console.log("Output:", lexicalOrder(input2));

/*
Explanation:
- For n=13: [1,10,11,12,13,2,3,4,5,6,7,8,9]
- For n=2: [1,2]
*/