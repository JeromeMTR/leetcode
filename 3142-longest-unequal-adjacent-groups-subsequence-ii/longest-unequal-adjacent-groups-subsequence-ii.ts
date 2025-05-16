function getWordsInLongestSubsequence(words: string[], groups: number[]): string[] {
    return longestValidSubsequence(words, groups)
};
// Helper to calculate hamming distance between two strings of equal length
function hamming(a: string, b: string): number {
    let cnt = 0;
    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) cnt++;
    }
    return cnt;
}

/**
 * Finds the longest subsequence of indices satisfying group and hamming constraints.
 * @param words The string array
 * @param groups The group numbers array
 * @returns The words (strings) in the longest valid subsequence
 */
function longestValidSubsequence(words: string[], groups: number[]): string[] {
    const n = words.length;
    // dp[i] = length of the longest valid subsequence ending with i
    const dp: number[] = Array(n).fill(1); // minimum 1 (the single element itself)
    // prev[i] = previous index in subsequence before i (for path reconstruction)
    const prev: number[] = Array(n).fill(-1);

    // For each i, try to extend the chain to each j > i (maintain order for subsequence)
    for (let i = 0; i < n; ++i) {
        for (let j = i + 1; j < n; ++j) {
            if (
                groups[i] !== groups[j] &&
                words[i].length === words[j].length &&
                hamming(words[i], words[j]) === 1
            ) {
                // Can j come after i in a valid chain?
                if (dp[j] < dp[i] + 1) {
                    dp[j] = dp[i] + 1;
                    prev[j] = i;
                }
            }
        }
    }

    // Find the index where subsequence is the longest
    let maxLen = 0;
    let endIdx = 0;
    for (let i = 0; i < n; ++i) {
        if (dp[i] > maxLen) {
            maxLen = dp[i];
            endIdx = i;
        }
    }

    // Reconstruct the sequence via prev[]
    const resIdx: number[] = [];
    let cur = endIdx;
    while (cur !== -1) {
        resIdx.push(cur);
        cur = prev[cur];
    }
    resIdx.reverse();

    // Map indices to words
    return resIdx.map(idx => words[idx]);
}

// ===============================
//   IOCE (Input-Output-Code-Example)
// ===============================

// Example 1:
const words1 = ["bab","dab","cab"];
const groups1 = [1,2,2];
console.log(longestValidSubsequence(words1, groups1));
// Output: Possible ["bab", "cab"] or ["bab", "dab"]

// Example 2:
const words2 = ["a","b","c","d"];
const groups2 = [1,2,3,4];
console.log(longestValidSubsequence(words2, groups2));
// Output: ["a", "b", "c", "d"]

// Example 3 (Edge): only one element
const words3 = ["abc"];
const groups3 = [1];
console.log(longestValidSubsequence(words3, groups3));
// Output: ["abc"]

/*
 * COMMENTS:
 * - Time complexity: O(n^2 * L), L is word max length, n <= 1000, so this is fast enough.
 * - Uses DP to build the allowed chains, and backtracks to build the chain words.
 * - Hamming distance is only computed for pairs of same length.
 */