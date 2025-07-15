/**
 * Determines if a given word is valid per specified criteria:
 * - At least 3 characters.
 * - Only digits and English letters allowed.
 * - Includes at least one vowel and at least one consonant.
 * 
 * @param word Input string to check.
 * @returns true if word is valid, false otherwise.
 */
function isValidWord(word: string): boolean {
    // Check length
    if (word.length < 3) return false;

    let hasVowel = false;
    let hasConsonant = false;
    
    // Define vowels
    const vowels = 'aeiouAEIOU';
    
    // Check each character
    for (let c of word) {
        // If char is not letter or digit, return false
        if (!/^[a-zA-Z0-9]$/.test(c)) return false;
        
        // If it's a letter
        if (/[a-zA-Z]/.test(c)) {
            if (vowels.includes(c)) {
                hasVowel = true;
            } else {
                hasConsonant = true;
            }
        }
        // digits are ignored for vowel/consonant check
    }
    return hasVowel && hasConsonant;
}

// ---------- IOCE Tests ----------

console.log(isValidWord("234Adas")); // true
console.log(isValidWord("b3"));      // false
console.log(isValidWord("a3$e"));    // false
console.log(isValidWord("u7w"));     // true
console.log(isValidWord("777"));     // false
console.log(isValidWord("AEI3OU"));  // false

/*
IO: isValidWord("234Adas") → true
IO: isValidWord("b3")      → false
IO: isValidWord("a3$e")    → false
IO: isValidWord("u7w")     → true
IO: isValidWord("777")     → false
IO: isValidWord("AEI3OU")  → false
*/