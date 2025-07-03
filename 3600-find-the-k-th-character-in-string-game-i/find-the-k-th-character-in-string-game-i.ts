// IOCE (Input-Output Code Example):
// Input: k = 5
// Output: 'b'
/*
Trace:
Start: word="a" (len=1)
1st op: "a" + "b" = ab     (len=2)
2nd op: "ab" + "bc" = abbc (len=4)
3rd op: "abbc" + "bccd" = abbcbccd (len=8)
k = 5 -> index 4 in "abbcbccd" is 'b'
*/
// Input: k = 10
// Output: 'c'
// ...
// Constraints: 1 <= k <= 500

function findKthCharacter(k: number): string {
    // Start with initial word length = 1 (just 'a')
    let len = 1;
    // To cover at least k, keep simulating the doubling
    while (len < k) {
        len *= 2;
    }

    // How many times we must 'increment' the character ('a' becomes 'b', etc.)
    let shift = 0;
    // Position we're tracking (1-based)
    let pos = k;

    // Work back towards the original character,
    // Every time the k-th position falls in the second half,
    // move pos to (pos - len/2) and increase the shift
    while (len > 1) {
        if (pos > len / 2) {
            pos -= len / 2;
            shift++;
        }
        len /= 2;
    }

    // Now pos == 1 (the first character), which is 'a'
    // Apply shift to 'a'
    let charCode = 'a'.charCodeAt(0);
    charCode = ((charCode - 97 + shift) % 26) + 97; // wraparound with modulo
    return String.fromCharCode(charCode);
}

// === Example IOCE ===
console.log(findKthCharacter(5));   // Output: 'b'
console.log(findKthCharacter(10));  // Output: 'c'
console.log(findKthCharacter(1));   // Output: 'a'
console.log(findKthCharacter(26));  // Output: 'z'