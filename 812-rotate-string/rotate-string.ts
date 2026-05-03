/**
 * Buddy / Rotate String Problem
 *
 * IOCE
 * ----
 * Inputs:
 * - s: string
 * - goal: string
 *
 * Output:
 * - boolean
 *   - true  -> if s can become goal after some number of left shifts
 *   - false -> otherwise
 *
 * Constraints:
 * - 1 <= s.length, goal.length <= 100
 * - s and goal contain only lowercase English letters
 *
 * Time Complexity:
 * - O(n)
 * Space Complexity:
 * - O(n)
 *
 * Edge Cases:
 * - s and goal have different lengths -> false
 * - s and goal are already equal -> true
 * - single-character strings
 * - repeated characters, e.g. s = "aaaa", goal = "aaaa"
 */

function rotateString(s: string, goal: string): boolean {
    // If lengths differ, goal cannot be a rotation of s.
    if (s.length !== goal.length) {
        return false;
    }

    // Concatenate s with itself.
    // If goal is a valid rotation, it must appear inside this doubled string.
    const doubled = s + s;

    return doubled.includes(goal);
}


// Console log tests
console.log(rotateString("abcde", "cdeab")); // true
console.log(rotateString("abcde", "abced")); // false
console.log(rotateString("a", "a"));         // true
console.log(rotateString("aa", "aa"));       // true
console.log(rotateString("waterbottle", "erbottlewat")); // true
console.log(rotateString("abc", "cab"));     // true
console.log(rotateString("abc", "acb"));     // false
console.log(rotateString("abc", "abcd"));    // false
console.log(rotateString("abc", "abc"));     // true
console.log(rotateString("abc", "def"));     // false
console.log(rotateString("abc", "cba"));     // false
console.log(rotateString("abcde", "eabcd")); // true
console.log(rotateString("abcde", "deabc"));
console.log(rotateString("abcde", "abcde")); // true
console.log(rotateString("abcde", "xyzab")); // false
