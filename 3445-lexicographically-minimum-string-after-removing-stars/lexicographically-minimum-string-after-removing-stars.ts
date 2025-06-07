/**
 * Removes all '*' according to specified rules to get lexicographically smallest string.
 *
 * @param s - The input string consisting of lowercase English letters and '*'
 * @returns The lexicographically smallest string after removing all '*'
 */
function removeStarsSmallest(s: string): string {
    // Stack to build result (characters only, skip removed chars by setting to '*')
    const stack: string[] = [];
    // For each of the 26 lowercase letters, store the positions in the stack
    const charPositions: number[][] = Array.from({length: 26}, () => []);

    // Helper to get index in our charPositions array
    const charIdx = (c: string) => c.charCodeAt(0) - 97;

    // Iterate through each character in the string
    for (let i = 0; i < s.length; ++i) {
        const ch = s[i];
        if (ch !== '*') {
            // Push character to stack
            stack.push(ch);
            // Keep track of this char's position in the stack
            charPositions[charIdx(ch)].push(stack.length - 1);
        } else {
            // Remove the smallest char to the left (among all in stack, leftmost occurance)
            // Loop from 'a' to 'z'
            for (let ci = 0; ci < 26; ++ci) {
                if (charPositions[ci].length > 0) {
                    // Remove the leftmost occurrence for the current smallest character
                    const pos = charPositions[ci].shift()!;
                    stack[pos] = '*'; // mark this as removed
                    break;
                }
            }
            // Do not add '*' to stack, it's removed
        }
    }
    // Build the final string, skipping removed (marked with '*')
    return stack.filter(c => c !== '*').join('');
}

/* IOCE */

// Example 1:
console.log(removeStarsSmallest("aaba*"));  // Output: "aab"

// Example 2:
console.log(removeStarsSmallest("abc"));    // Output: "abc"

// Example 3: (with several stars)
console.log(removeStarsSmallest("b*a*a*c*")); // Output: ""

// Example 4: (more complex)
console.log(removeStarsSmallest("abcbac*bc*a*ab*")); // Output: "abcbab"

// Example 5: All stars at end
console.log(removeStarsSmallest("zyxwvutsr*qponmlkjihgfedcba*")); // Output: "zyxwvutsrqponmlkjihgfedcb"

// Example 6: No stars
console.log(removeStarsSmallest("aaaaa")); // Output: "aaaaa"