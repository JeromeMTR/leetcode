/**
 * Returns the length of the longest palindrome that can be made by concatenating given words.
 * 
 * @param words - array of two-letter, lowercase letter strings
 * @returns number - length of the longest possible palindrome string
 */
function longestPalindrome(words: string[]): number {
    // Step 1: Count occurrences of each word
    const counter = new Map<string, number>();
    for (const word of words) {
        counter.set(word, (counter.get(word) ?? 0) + 1);
    }

    let result = 0;
    let hasCentral = false; // Whether we can use a central palindromic word

    // Step 2: Iterate over all keys in the counter
    for (const [word, count] of counter.entries()) {
        const reversed = word[1] + word[0];

        if (word === reversed) {
            // Palindromic word: e.g. "gg"
            // We can form as many pairs as count // 2
            const pairs = Math.floor(count / 2);
            result += pairs * 4; // Each pair contributes 4 characters
            if (count % 2 === 1) hasCentral = true;
        } else if (word < reversed && counter.has(reversed)) {
            // Only process one direction to avoid double counting (by string order)
            // Non-palindromic pairs: use as many as min(count, counter.get(reversed))
            const pairs = Math.min(count, counter.get(reversed)!);
            result += pairs * 4;
        }
    }

    // Step 3: Add the central palindromic word if any
    if (hasCentral) result += 2;

    return result;
}

// ------------------------
// Examples (IOCE) - Run and check
console.log(longestPalindrome(["lc","cl","gg"]));               // Output: 6
console.log(longestPalindrome(["ab","ty","yt","lc","cl","ab"]));// Output: 8
console.log(longestPalindrome(["cc","ll","xx"]));               // Output: 2
console.log(longestPalindrome(["ab"]));                         // Output: 0
console.log(longestPalindrome(["aa", "aa", "aa"]));             // Output: 6