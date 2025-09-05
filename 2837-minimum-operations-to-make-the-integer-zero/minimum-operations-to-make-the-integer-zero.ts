/**
 * Calculates the minimum number of operations needed to make num1 equal to 0
 * by repeatedly subtracting 2^i + num2 for any i in [0,60].
 * Returns -1 if impossible.
 * IOCE included.
 */
function minimumOperations(num1: number, num2: number): number {
    function makeTheIntegerZero(num1: number, num2: number): number {
    let k = 1;
    while (true) {
        let x: bigint = BigInt(num1) - BigInt(num2) * BigInt(k);
        if (x < BigInt(k)) {
            return -1;
        }
        if (k >= bitCount(x)) {
            return k;
        }
        k++;
    }
}

function bitCount(n: bigint): number {
    let count = 0;
    while (n !== 0n) {
        count++;
        n &= n - 1n;
    }
    return count;
}
}

// ---- IOCE ----
// Example 1
const num1_1 = 3, num2_1 = -2;
console.log(`Input: num1 = ${num1_1}, num2 = ${num2_1}`);
console.log(`Output: ${minimumOperations(num1_1, num2_1)}`); // 3

// Example 2
const num1_2 = 5, num2_2 = 7;
console.log(`Input: num1 = ${num1_2}, num2 = ${num2_2}`);
console.log(`Output: ${minimumOperations(num1_2, num2_2)}`); // -1

// You can add more test cases as needed!