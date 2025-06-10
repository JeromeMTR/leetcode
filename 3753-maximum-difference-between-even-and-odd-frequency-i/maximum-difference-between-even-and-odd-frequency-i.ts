function maxOddEvenFrequencyDiff(s: string): number {
    // Step 1: Count frequency of each character
    const counts: Record<string, number> = {};
    for (const char of s) {
        counts[char] = (counts[char] ?? 0) + 1;
    }

    // Step 2: Partition frequencies into odd and even
    const oddFreqs: number[] = [];
    const evenFreqs: number[] = [];
    for (const freq of Object.values(counts)) {
        if (freq % 2 === 1) {
            oddFreqs.push(freq);
        } else if (freq > 0) {
            evenFreqs.push(freq);
        }
    }

    // Step 3: Find max of oddFreqs (a1), min of evenFreqs (a2)
    // We are guaranteed by constraints that both exist.
    const a1 = Math.max(...oddFreqs);
    const a2 = Math.min(...evenFreqs);

    // Step 4: Return result
    return a1 - a2;
}

// --- EXAMPLES / TEST CASES ---

console.log(maxOddEvenFrequencyDiff("aaaaabbc")); // Output: 3
console.log(maxOddEvenFrequencyDiff("abcabcab")); // Output: 1

// Edge cases
console.log(maxOddEvenFrequencyDiff("aabbc"));    // Output: 1 (odd: 'c'=1, even: 'a'=2/'b'=2 => 1-2=-1)
console.log(maxOddEvenFrequencyDiff("abcddeef")); // Output: 1 (odd: 'a','b','c','f'=1, even: 'd','e'=2 => max(1)-min(2) = -1)