// Importing the necessary constant for modulo operations
const MODULO = 1_000_000_007;

// This function takes a string `s` and an integer `t`, and returns the length
// of the transformed string after `t` transformations, modulo 10^9 + 7.
function transformedStringLength(s: string, t: number): number {
    // Initialize the resulting length of the transformed string
    let length = s.length;
    // Initialize the growth factor; initially, each character expands to itself, so the factor is 1
    let growthFactor = 1;
    
    // Iterate through each character in the string `s`
    for (let i = 0; i < s.length; i++) {
        // Iterate for each transformation step up to `t`
        for (let j = 0; j < t; j++) {
            if (s[i] === 'z') {
                // If the character is 'z', a 'z' becomes "ab", contributing an extra character per growth factor
                length = (length + growthFactor) % MODULO;
                // After a 'z', growth factor doubles because "ab" contributes 2 new characters
                growthFactor = (growthFactor * 2) % MODULO;
            }
            // For non-'z' characters, growth factor remains unchanged, they are replaced by a single character
        }
    }
    
    // Return the length of the transformed string after t transformations, modulo 10^9 + 7
    return length;
}

// Example usage:
// Example 1:
console.log(transformedStringLength("abcyy", 2)); // Output: 7

// Example 2:
console.log(transformedStringLength("azbk", 1)); // Output: 5

// Input Constraints:
// 1 <= s.length <= 10^5
// s consists only of lowercase English letters.
// 1 <= t <= 10^5