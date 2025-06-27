// Helper function to check if seq*k is a subsequence of s
function canRepeatKTimes(s: string, seq: string, k: number): boolean {
    let i = 0, j = 0, count = 0;
    while (i < s.length) {
        if (s[i] === seq[j]) {
            j++;
            if (j === seq.length) {  // Found one full seq
                j = 0;
                count++;
                if (count === k) return true;
            }
        }
        i++;
    }
    return false;
}

// Main function to find the longest subsequence repeated k times
function longestSubsequenceRepeatedK(s: string, k: number): string {
    // Step 1: letter frequency, only keep those appear at least k times
    const freq: Record<string, number> = {};
    for (const ch of s) freq[ch] = (freq[ch] || 0) + 1;
    const validChars: string[] = [];
    for (const ch in freq) {
        if (freq[ch] >= k) {
            const times = Math.floor(freq[ch] / k); // Max times this char can appear in one candidate
            for (let t = 0; t < times; t++) validChars.push(ch);
        }
    }
    // If there are no enough valid chars
    if (validChars.length === 0) return "";

    // Step 2: BFS/DFS for candidate subsequences from longest to shortest, try all lexicographically
    // As there are up to 26 chars, and sequence length max n/k <= 250, but we restrict by available chars
    // Candidates of length = L, from largest L = validChars.length down to 1
    // We need to generate all strings up to length validChars.length, using only chars in validChars
    // To maximize, we do it in lexicographically decreasing order

    for (let len = Math.floor(s.length / k); len >= 1; len--) {
        // Generate all candidate sequences of given length, using only validChars, in decreasing order
        // To avoid duplicates and excess combinatorics, use only those chars with enough freq in validChars

        // Prepare distinct candidate characters, already sorted Z..A
        const alphabet = Array.from(new Set(validChars)).sort().reverse();

        // Backtrack to generate all sequences of length `len`
        const dfs = (seq: string) => {
            if (seq.length === len) {
                if (canRepeatKTimes(s, seq, k)) return seq;
                return "";
            }
            for (const ch of alphabet) {
                // Only use if can append more of ch (limit by freq)
                if (seq.split('').filter(c => c === ch).length < Math.floor(freq[ch] / k)) {
                    const res = dfs(seq + ch);
                    if (res) return res; // early exit on the first found
                }
            }
            return "";
        }
        const found = dfs("");
        if (found) return found;
    }
    return "";
}

/*
   ======= Examples =======
*/

// Example 1
console.log(longestSubsequenceRepeatedK("letsleetcode", 2)); // "let"

// Example 2
console.log(longestSubsequenceRepeatedK("bb", 2)); // "b"

// Example 3
console.log(longestSubsequenceRepeatedK("ab", 2)); // ""