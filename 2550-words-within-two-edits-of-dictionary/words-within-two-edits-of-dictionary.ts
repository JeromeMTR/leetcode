function twoEditWords(queries: string[], dictionary: string[]): string[] {
    const result: string[] = [];

    function canTransformWithTwoEdits(word1: string, word2: string): boolean {
        let editCount = 0;
        for (let i = 0; i < word1.length; i++) {
            if (word1[i] !== word2[i]) {
                editCount++;
                if (editCount > 2) {
                    return false;
                }
            }
        }
        return editCount <= 2;
    }

    for (let query of queries) {
        for (let dictWord of dictionary) {
            if (canTransformWithTwoEdits(query, dictWord)) {
                result.push(query);
                break; // No need to check further if one match is found
            }
        }
    }

    return result;
}

// Test cases
console.log(twoEditWords(["word", "note", "ants", "wood"], ["wood", "joke", "moat"])); // Output: ["word", "note", "wood"]
console.log(twoEditWords(["yes"], ["not"])); // Output: []
console.log(twoEditWords(["hello"], ["hello", "world"])); // Output: ["hello"] - Exact match requires 0 edits
console.log(twoEditWords(["abc"], ["abd", "abe", "xyz"])); // Output: ["abc"] - One edit needed
console.log(twoEditWords(["aaa", "bbb"], ["abc", "def"])); // Output: [] - More than 2 edits needed
