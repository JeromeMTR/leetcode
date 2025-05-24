/**
 * Given an array of words and a character x, returns the indices
 * of words that contain character x.
 * 
 * @param words - Array of words
 * @param x - Character to search for
 * @returns - Indices where words contain x
 */
function findWordsContaining(words: string[], x: string): number[] {
    // Result array to store matching indices
    const res: number[] = [];

    // Loop through every word with its index
    for (let i = 0; i < words.length; i++) {
        // If current word includes character x
        if (words[i].includes(x)) {
            // Add index i to result
            res.push(i);
        }
    }

    return res;
}