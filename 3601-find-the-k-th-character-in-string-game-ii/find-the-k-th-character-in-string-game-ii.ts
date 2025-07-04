// IOCE

/** 
 * Input:
 *  - k: number; (1-indexed position to get in final string)
 *  - operations: number[]; (array of operations, 0 or 1 as described)
 * Output:
 *  - string; (k-th character of the final word after all operations)
 *
 * Constraints:
 *  - 1 <= k <= 10^14
 *  - 1 <= operations.length <= 100
 *  - operations[i] in {0,1}
 *  - Final word length >= k (guaranteed)
 *
 * Example: See provided in prompt.
 */

function getKthCharacter(k: number, operations: number[]): string {
    const n = operations.length;

    // Store the length of 'word' after each operation (inclusive)
    let lengths: bigint[] = [1n]; // 'a' is 1 char

    // Precompute lengths after every operation
    for (let i = 0; i < n; ++i) {
        let last = lengths[lengths.length - 1];
        if (operations[i] === 0) {
            lengths.push(last * 2n);
        } else {
            lengths.push(last * 2n);
        }
    }

    let pos = BigInt(k); // 1-indexed
    let shift = 0; // How many (+1)s have been *virtually* applied

    // Walk operations backward
    for (let i = n-1; i >= 0; --i) {
        let len_prev = lengths[i];
        if (pos <= len_prev) {
            // k is in the first part, just move to previous
            continue;
        }
        // In appended part
        pos = pos - len_prev;

        if (operations[i] === 1) {
            // This appended part is "next alphabet" of previous word
            // So we need to undo a "next" shift for this character
            shift += 1;
        }
    }

    // Now pos==1, since originally word = "a"
    // So the final answer is 'a' shifted right by "shift" times.
    let aCode = 'a'.charCodeAt(0);
    let finalCode = ((aCode - 97 + shift) % 26) + 97;
    return String.fromCharCode(finalCode);
}

//----------------- IO -----------------

// Helper for running a single testcase
function runExample(k: number, operations: number[], expected: string) {
    const res = getKthCharacter(k, operations);
    console.log(`getKthCharacter(${k}, [${operations}]) = '${res}' (expected: '${expected}')`, 
        res === expected ? "✅" : "❌");
}

//---- Examples ----//

runExample(5, [0,0,0], "a");
runExample(10, [0,1,0,1], "b");

// You can add more test cases as needed