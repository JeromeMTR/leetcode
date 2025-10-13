/**
 * Returns the array after deleting all words that are anagrams of their previous word.
 * @param {string[]} words - The array of words.
 * @return {string[]} The reduced array.
 */
function removeAnagrams(words: string[]): string[] {
    // Function to get the canonical (sorted) form of a word
    function canonical(s: string): string {
        return s.split('').sort().join('');
    }

    const result: string[] = [];

    for (const word of words) {
        // If result is empty, add first word
        if (result.length === 0) {
            result.push(word);
        } else {
            // Compare current word's sorted form to previous result's sorted form
            if (canonical(word) !== canonical(result[result.length - 1])) {
                result.push(word);
            }
            // If it's an anagram, skip (do not add)
        }
    }

    return result;
}

/* ================== IOCE ===================== */

// Input: words = ["abba","baba","bbaa","cd","cd"]
const input1 = ["abba", "baba", "bbaa", "cd", "cd"];
// Output: ["abba","cd"]
console.log(removeAnagrams(input1)); // ["abba", "cd"]

// Input: words = ["a","b","c","d","e"]
const input2 = ["a","b","c","d","e"];
// Output: ["a","b","c","d","e"]
console.log(removeAnagrams(input2)); // ["a","b","c","d","e"]

// Input: words = ["aa","aa","aa"]
const input3 = ["aa","aa","aa"];
// Output: ["aa"]
console.log(removeAnagrams(input3)); // ["aa"]

// Edge case: single word
const input4 = ["abc"];
// Output: ["abc"]
console.log(removeAnagrams(input4)); // ["abc"]