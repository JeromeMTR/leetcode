/**
 * Helper to check if character is a vowel (both cases)
 */
function isVowel(ch: string): boolean {
    return 'aeiouAEIOU'.includes(ch);
}

/**
 * Main function to permute the string retaining consonant positions and sorting vowels by ASCII order.
 * @param s Input string
 * @returns New permuted string t
 */
function sortVowels(s: string): string {
    const n = s.length;
    // Step 1: Extract all vowels from the string
    const vowels: string[] = [];
    for (let i = 0; i < n; i++) {
        if (isVowel(s[i])) {
            vowels.push(s[i]);
        }
    }

    // Step 2: Sort the vowels by ASCII value (default string sort suffices)
    vowels.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));

    // Step 3: Reconstruct the string, replacing vowels by their sorted values
    let vowelIdx = 0;
    let result: string[] = [];
    for (let i = 0; i < n; i++) {
        if (isVowel(s[i])) {
            // Take the next sorted vowel
            result.push(vowels[vowelIdx]);
            vowelIdx++;
        } else {
            // Keep consonant as is
            result.push(s[i]);
        }
    }

    // Step 4: Return the joined string
    return result.join('');
}


// --- Example usage (IOCE) ---

const tests = [
    {input: "lEetcOde", expected: "lEOtcede"},
    {input: "lYmpH", expected: "lYmpH"},
    {input: "Abcde", expected: "Abcde"},
    {input: "bAuIe", expected: "bAIeu"},
];

for (const {input, expected} of tests) {
    const output = sortVowels(input);
    console.log(`Input: ${input} | Output: ${output} | Expected: ${expected} | Pass: ${output === expected}`);
}

/*
Output:
Input: lEetcOde | Output: lEOtcede | Expected: lEOtcede | Pass: true
Input: lYmpH | Output: lYmpH | Expected: lYmpH | Pass: true
Input: Abcde | Output: Abcde | Expected: Abcde | Pass: true
Input: bAuIe | Output: bAIeu | Expected: bAIeu | Pass: true
*/