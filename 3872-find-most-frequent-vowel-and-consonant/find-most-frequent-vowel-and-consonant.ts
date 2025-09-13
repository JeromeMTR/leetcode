/**
 * Returns the sum of the maximum vowel and consonant frequencies in s.
 * @param s The input string
 * @returns number The sum as described above
 */
function maxVowelConsonantFrequencySum(s: string): number {
    // Define set of vowels for quick lookup
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);

    // Frequency maps for vowels and consonants
    const vowelFrequency: { [c: string]: number } = {};
    const consonantFrequency: { [c: string]: number } = {};

    // Iterate over each character in s
    for (const c of s) {
        if (vowels.has(c)) {
            // Count vowels
            vowelFrequency[c] = (vowelFrequency[c] || 0) + 1;
        } else {
            // Count consonants
            consonantFrequency[c] = (consonantFrequency[c] || 0) + 1;
        }
    }

    // Find max frequency for vowels
    let maxVowel = 0;
    for (const count of Object.values(vowelFrequency)) {
        if (count > maxVowel) maxVowel = count;
    }

    // Find max frequency for consonants
    let maxConsonant = 0;
    for (const count of Object.values(consonantFrequency)) {
        if (count > maxConsonant) maxConsonant = count;
    }

    // Return their sum
    return maxVowel + maxConsonant;
}

// --- Examples / Test cases ---

// Example 1
console.log(maxVowelConsonantFrequencySum("successes"));
// Output: 6

// Example 2
console.log(maxVowelConsonantFrequencySum("aeiaeia"));
// Output: 3

// Edge: only consonants
console.log(maxVowelConsonantFrequencySum("bcdfg"));
// Output: 1 (max consonant freq is 1, vowel freq is 0)

// Edge: only vowels
console.log(maxVowelConsonantFrequencySum("aeiouaeiou"));
// Output: 2 (all vowel freq is 2, consonant freq is 0)