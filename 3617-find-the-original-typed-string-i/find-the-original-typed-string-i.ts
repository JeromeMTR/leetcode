// IOCE
// Input: string 'word'
// Output: number (total possible original strings)

// Example:
// Input: "abbcccc"
// Output: 5

function possibleOriginalStrings(word: string): number {
    // To store possible strings: 1 for "no error", plus any others found
    let total = 1; // case: no repeated-key error

    let i = 0;
    const n = word.length;

    // Traverse the string to group contiguous characters
    while (i < n) {
        let j = i;
        // Expand as long as next character is same
        while (j + 1 < n && word[j + 1] === word[i]) {
            j++;
        }
        const groupLength = j - i + 1;
        if (groupLength >= 2) {
            // For this group, it's possible Alice repeated this key,
            // so the intended original could have been length 1,2,...groupLength-1
            // That's (groupLength - 1) new possibilities
            total += (groupLength - 1);
        }
        i = j + 1; // move to next group
    }

    return total;
}

/* 
// Example testcases
console.log(possibleOriginalStrings("abbcccc")); // 5
console.log(possibleOriginalStrings("abcd"));    // 1
console.log(possibleOriginalStrings("aaaa"));    // 4
console.log(possibleOriginalStrings("a"));       // 1
console.log(possibleOriginalStrings("abcc"));    // 3
*/