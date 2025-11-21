/**
 * IOCE (Input / Output / Constraints / Example)
 * Input: string s (3 <= s.length <= 10^5), consisting of only lowercase English letters.
 * Output: number (number of unique palindromic subsequences of length 3)
 * Constraints: Only lowercase letters. Subsequence, not substring.
 * Example: s = "aabca" => Output: 3
 */

function countPalindromicSubsequence(s: string): number {
    // Set to keep unique palindromic triplets
    const palSet = new Set<string>();

    // We focus on form: c1 c2 c1, where c1 and c2 are lowercase chars
    // For each character ('a'...'z'), find first and last occurrence
    for (let c = 0; c < 26; ++c) {
        const ch = String.fromCharCode(97 + c);

        let first = -1, last = -1;
        for (let i = 0; i < s.length; ++i) {
            if (s[i] === ch) {
                if (first === -1) first = i;
                last = i;
            }
        }

        // No possible palindromic subsequence if char appears < 2 times
        if (first === -1 || first === last) continue;

        // Count all chars that appear between first and last occurrence
        const middleSet = new Set<string>();
        for (let i = first + 1; i < last; ++i) {
            middleSet.add(s[i]);
        }

        // For each distinct middle character, create palindrome c1+c2+c1
        for (const midch of middleSet) {
            palSet.add(ch + midch + ch);
        }
    }

    return palSet.size;
}

// Example runs
console.log(countPalindromicSubsequence("aabca")); // 3
console.log(countPalindromicSubsequence("adc")); // 0
console.log(countPalindromicSubsequence("bbcbaba")); // 4