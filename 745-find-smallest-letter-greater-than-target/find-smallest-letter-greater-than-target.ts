/**
 * Finds the smallest character in `letters` that is lexicographically greater than `target`.
 * If no such character exists, return the first character in `letters` (wraps around).
 *
 * @param letters - sorted array of lowercase English letters, at least two different ones
 * @param target - a lowercase English letter
 * @returns The next greatest letter or the first letter in `letters`
 */

// ----------- IOCE (Input, Output, Constraints, Edge cases) ----------

/*
Input:
    letters: Array<string> (sorted non-decreasing order), at least 2 different
    target: string (a lowercase English letter)
Output:
    string - smallest character in `letters` strictly greater than `target`,
             or first character if not found

Constraints:
    -  Time Complexity: O(log n), where n is the length of the `letters` array.
    - `Space Complexity: O(1), as the algorithm uses a constant amount of extra space.

Edge Cases:
    - Array could be repeated characters except one (e.g. ["a", "a", "a", "b"])
    - If all letters <= target, must wrap around to first letter
    - Target can be less than, equal to, or greater than elements
*/

function nextGreatestLetter(letters: string[], target: string): string {
    let left = 0;
    let right = letters.length - 1;

    // Use binary search to find the leftmost character > target
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (letters[mid] <= target) {
            left = mid + 1; // Move right
        } else {
            right = mid - 1; // Found a candidate, try for smaller index
        }
    }
    // If left is within bounds, return letters[left]; else (wrap around) return letters[0]
    return left < letters.length ? letters[left] : letters[0];
}

console.log(nextGreatestLetter(["c","f","j"], "a")); // "c"
console.log(nextGreatestLetter(["c","f","j"], "c")); // "f"
console.log(nextGreatestLetter(["c","f","j"], "d")); // "f"
console.log(nextGreatestLetter(["c","f","j"], "g")); // "j"
console.log(nextGreatestLetter(["c","f","j"], "j")); // "c"
console.log(nextGreatestLetter(["x","x","y","y"], "z")); // "x"
console.log(nextGreatestLetter(["a","b"], "z")); // "a"
console.log(nextGreatestLetter(["e","e","e","e","n","n","n"], "e")); // "n"
console.log(nextGreatestLetter(["a","a","b"], "a")); // "b"
console.log(nextGreatestLetter(["a","b"], "a")); // "b"
console.log(nextGreatestLetter(["a","b"], "b")); // "a"