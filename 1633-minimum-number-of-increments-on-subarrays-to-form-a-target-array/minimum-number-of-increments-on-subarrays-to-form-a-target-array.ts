// Function to compute minimum number of operations
function minNumberOperations(target: number[]): number {
    // 'ops' will store the total number of operations needed
    let ops = target[0]; // The first element always needs target[0] increments from 0

    // Iterate from second element to the end
    for (let i = 1; i < target.length; i++) {
        // If current is greater than previous, we need (target[i] - target[i-1]) more increments
        if (target[i] > target[i-1]) {
            ops += target[i] - target[i-1];
        }
    }
    return ops;
}

/* 
IOCE - Input/Output/Constraints/Examples

Input: target = [1,2,3,2,1]
Output: 3

Explanation:
- [0,0,0,0,0] -> [1,1,1,1,1] (op 1, +1 everywhere)
- [1,2,2,2,1] (op 2, +1 to 1~3)
- [1,2,3,2,1] (op 3, +1 at 2)
*/

// Test cases
console.log(minNumberOperations([1,2,3,2,1])); // Output: 3
console.log(minNumberOperations([3,1,1,2]));   // Output: 4
console.log(minNumberOperations([3,1,5,4,2])); // Output: 7
console.log(minNumberOperations([1,1,1,1]));   // Output: 1
console.log(minNumberOperations([100000]));    // Output: 100000