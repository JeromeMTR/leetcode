/**
 * Returns the lexicographically smallest string after applying the allowed operations.
 *
 * @param s - the initial string of digits (even length, digits only)
 * @param a - the value to add to odd indices
 * @param b - the right rotation length
 * @returns   - the lexicographically smallest string possible
 */
function findLexSmallestString(s: string, a: number, b: number): string {
    // Using BFS to explore all possible variations
    const seen = new Set<string>();
    let minStr = s;

    const queue: string[] = [s];
    seen.add(s);

    while (queue.length > 0) {
        const curr = queue.shift()!;
        // Update the minimum string seen so far
        if (curr < minStr) minStr = curr;

        // Operation 1: Add `a` to all odd indices
        let chars = curr.split('');
        for (let i = 1; i < chars.length; i += 2) {
            chars[i] = ((parseInt(chars[i]) + a) % 10).toString();
        }
        const added = chars.join('');
        if (!seen.has(added)) {
            seen.add(added);
            queue.push(added);
        }

        // Operation 2: Rotate right by `b`
        // With (s.length - b) + (0...b)
        const rotated = curr.slice(curr.length - b) + curr.slice(0, curr.length - b);
        if (!seen.has(rotated)) {
            seen.add(rotated);
            queue.push(rotated);
        }
    }

    return minStr;
}

// IOCE

// Input: s = "5525", a = 9, b = 2
console.log(findLexSmallestString("5525", 9, 2)); // Output: "2050"

// Input: s = "74", a = 5, b = 1
console.log(findLexSmallestString("74", 5, 1));   // Output: "24"

// Input: s = "0011", a = 4, b = 2
console.log(findLexSmallestString("0011", 4, 2)); // Output: "0011"

// Constraint test (length = 2, s only 0..9, a=1..9, b=1..1)
// Input: s="21", a=1, b=1
console.log(findLexSmallestString("21", 1, 1));   // Should process correctly