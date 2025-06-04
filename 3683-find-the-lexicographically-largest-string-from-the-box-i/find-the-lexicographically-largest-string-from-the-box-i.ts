// Function to find lexicographically largest string in the box after all rounds
function lexLargestBoxPart(word: string, numFriends: number): string {
    // Length of the word
    const n = word.length;
    // Maximum possible length for one part in any split
    const maxPartLen = n - numFriends + 1;
    let maxStr = "";

    // Iterate over all substrings of length maxPartLen
    for (let i = 0; i <= n - maxPartLen; ++i) {
        const candidate = word.substring(i, i + maxPartLen);
        // Update if candidate is lex greater
        if (candidate > maxStr) {
            maxStr = candidate;
        }
    }

    return maxStr;
}

/*
IOCE EXAMPLES:
*/

// Example 1:
console.log(lexLargestBoxPart("dbca", 2)); // "dbc"

// Example 2:
console.log(lexLargestBoxPart("gggg", 4)); // "g"

// Edge case: numFriends = 1 (whole word is only possible part)
console.log(lexLargestBoxPart("zebra", 1)); // "zebra"

// Edge case: numFriends = word.length (parts are all single letters)
console.log(lexLargestBoxPart("zebra", 5)); // "z"

// Edge case: monotonically increasing
console.log(lexLargestBoxPart("abcde", 3)); // "cde"

// Edge case: word with all identical letters
console.log(lexLargestBoxPart("aaaaa", 3)); // "aa"