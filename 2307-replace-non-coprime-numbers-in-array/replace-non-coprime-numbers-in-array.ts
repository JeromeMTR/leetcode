// Helper function to compute GCD of a and b (Euclidean Algorithm)
function gcd(a: number, b: number): number {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}

// Helper function to compute LCM of a and b
function lcm(a: number, b: number): number {
    return a * b / gcd(a, b);
}

/**
 * Replace adjacent non-coprime numbers in the array until stable.
 * @param nums Input list of integers
 * @returns Final modified array after all replacements
 */
function replaceNonCoprimes(nums: number[]): number[] {
    const stack: number[] = [];
    for (let num of nums) {
        // Try to merge with stack top as long as non-coprime
        while (stack.length > 0 && gcd(stack[stack.length - 1], num) > 1) {
            const top = stack.pop()!;
            num = lcm(top, num);
        }
        stack.push(num);
    }
    return stack;
}

/* =======================
   IOCE: Input/Output/Corner/Explanation
   ======================= */

// Example 1:
const input1 = [6,4,3,2,7,6,2];
// Expects [12,7,6] after combining adjacent non-coprimes as in the step-by-step
console.log("Example 1 Output:", replaceNonCoprimes(input1)); // [12,7,6]

// Example 2:
const input2 = [2,2,1,1,3,3,3];
// Expects [2,1,1,3]
console.log("Example 2 Output:", replaceNonCoprimes(input2)); // [2,1,1,3]

// Example 3 (Corner: All coprime)
const input3 = [2,3,5,7,11];
// Expects [2,3,5,7,11] (no pairs non-coprime)
console.log("All Coprime Output:", replaceNonCoprimes(input3)); // [2,3,5,7,11]

// Example 4 (Corner: All same)
const input4 = [5,5,5,5,5];
// All get merged into one via LCM(5,5)=5 until one left: [5]
console.log("All Same Output:", replaceNonCoprimes(input4)); // [5]

// Example 5 (Large input, non-coprime at ends)
const input5 = [2, 4, 3, 10, 5];
// 2,4 -> 4; [4,3,10,5], 10,5->10; [4,3,10]; 4,3 & 3,10 coprime; done.
console.log("Mix Output:", replaceNonCoprimes(input5)); // [4,3,10]