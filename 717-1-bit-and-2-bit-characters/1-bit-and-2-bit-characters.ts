/**
 * Determines if the last character is a one-bit character.
 * 
 * IOCE:
 * Input: bits = [1,0,0]
 * Output: true
 * 
 * Input: bits = [1,1,1,0]
 * Output: false
 * 
 * Approach:
 * - We traverse the bits array from left to right.
 * - If we see a 1, we skip the next bit, since 1 always starts a two-bit character (1x).
 * - If we see a 0, it's a one-bit character, we move by one index.
 * - We stop when we reach the last element; check whether we land exactly at the last index:
 *     - If so, then last char must be a one-bit character.
 *     - Else, we must have skipped over a two-bit ending.
 */

function isOneBitCharacter(bits: number[]): boolean {
    let i = 0;
    while (i < bits.length - 1) {
        // If current bit is 1, it's a two-bit character
        if (bits[i] === 1) {
            i += 2;
        } else {
            i += 1; // one-bit character
        }
    }
    // If we land at the last index, last char is a one-bit character
    return i === bits.length - 1;
}