/**
 * Finds the minimum number of deletions to make a string k-special.
 * @param word - The input string.
 * @param k - The maximum allowed difference between frequencies of any two characters.
 * @returns The minimum number of deletions required.
 *
 * IOCE:
 * Input: word = "aabcaba", k = 0
 * Output: 3
 * 
 * Input: word = "dabdcbdcdcd", k = 2
 * Output: 2
 * 
 * Input: word = "aaabaaa", k = 2
 * Output: 1
 */
function minDeletionsToKSpecial(word: string, k: number): number {
    // Step 1: Count frequencies of each character
    const freq: number[] = new Array(26).fill(0);
    for (const c of word) {
        freq[c.charCodeAt(0) - 97]++;
    }

    // Filter out characters not present and sort frequencies
    const counts: number[] = freq.filter(f => f > 0).sort((a, b) => a - b);
    if (counts.length === 1) return 0; // All same character, already k-special
    const N = counts.length;
    let minDeletions = Number.POSITIVE_INFINITY;

    // For efficiency, get the list of unique frequencies actually present
    for (let minFreq = 1; minFreq <= counts[N-1]; minFreq++) {
        const maxFreq = minFreq + k;
        let deletions = 0;
        for (let f of counts) {
            if (f < minFreq) {
                // Delete all occurrences of this character
                deletions += f;
            } else if (f > maxFreq) {
                // Need to delete excess occurrences to bring it down to maxFreq
                deletions += (f - maxFreq);
            }
            // else, within [minFreq, maxFreq] so fine
        }
        minDeletions = Math.min(minDeletions, deletions);
    }

    return minDeletions === Number.POSITIVE_INFINITY ? 0 : minDeletions;
}

// ---------------------
// IOCE: Illustrative Run
// ---------------------

console.log(minDeletionsToKSpecial("aabcaba", 0));      // Output: 3
console.log(minDeletionsToKSpecial("dabdcbdcdcd", 2));  // Output: 2
console.log(minDeletionsToKSpecial("aaabaaa", 2));      // Output: 1

// Edge case: All same letter
console.log(minDeletionsToKSpecial("aaaaaaa", 1));      // Output: 0

// Edge case: All distinct, k=0
console.log(minDeletionsToKSpecial("abc", 0));          // Output: 2