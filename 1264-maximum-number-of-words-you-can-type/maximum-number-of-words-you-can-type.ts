/**
 * Counts the number of words in the text string that can be typed
 * without using any of the broken letters.
 *
 * @param text - input string containing words separated by spaces
 * @param brokenLetters - string of unique broken letter keys
 * @returns number of words that can be fully typed
 */
function canBeTypedWords(text: string, brokenLetters: string): number {
    // Step 1: Split text into individual words
    const words = text.split(' ');

    // Step 2: Convert brokenLetters into a Set for O(1) lookup
    const brokenSet = new Set(brokenLetters);

    let typableWords = 0;

    // Step 3: For each word, check if it contains any broken letter
    for (const word of words) {
        let canType = true;
        for (const ch of word) {
            if (brokenSet.has(ch)) {
                canType = false; // Found a broken letter, can't type this word
                break;
            }
        }
        if (canType) typableWords++; // No broken letter found, increment count
    }

    // Step 4: Return the final count
    return typableWords;
}

// ------------------------------------
// IOCE (Input/Output, Constraints, Examples)
// ------------------------------------

// Example 1:
console.log(canBeTypedWords("hello world", "ad")); // Output: 1

// Example 2:
console.log(canBeTypedWords("leet code", "lt")); // Output: 1

// Example 3:
console.log(canBeTypedWords("leet code", "e")); // Output: 0

// Edge cases
// No broken letters, all words can be typed
console.log(canBeTypedWords("the quick brown fox", "")); // Output: 4

// All letters broken, no word can be typed
console.log(canBeTypedWords("a bb ccc", "abc")); // Output: 0

// One word, no broken letters
console.log(canBeTypedWords("typescript", "")); // Output: 1

// --------------------------------------------
// Constraints as comments
// text.length: 1 <= text.length <= 10^4
// 0 <= brokenLetters.length <= 26
// No leading/trailing spaces, words only lowercase letters, brokenLetters distinct & lowercase