/**
 * Maximum Distance Between a Pair of Values With Different Colors
 *
 * IOCE
 * ----
 * Input:
 * - colors: number[]
 *   - colors[i] represents the color of the i-th house
 *
 * Output:
 * - number
 *   - the maximum distance between two houses having different colors
 *
 * Constraints:
 * - 2 <= colors.length <= 100
 * - 0 <= colors[i] <= 100
 * - At least two houses have different colors
 *
 * Time Complexity:
 * - O(n)
 *
 * Space Complexity:
 * - O(1)
 *
 * Edge Cases:
 * - Only 2 houses, and they have different colors -> answer is 1
 * - The maximum distance is between first and last house
 * - All houses except one have the same color
 * - Different color appears only somewhere in the middle
 */

function maxDistance(colors: number[]): number {
    const n = colors.length;

    let answer = 0;

    // Find farthest house from the right that differs from the first house
    for (let i = n - 1; i >= 0; i--) {
        if (colors[i] !== colors[0]) {
            answer = Math.max(answer, i);
            break;
        }
    }

    // Find farthest house from the left that differs from the last house
    for (let i = 0; i < n; i++) {
        if (colors[i] !== colors[n - 1]) {
            answer = Math.max(answer, n - 1 - i);
            break;
        }
    }

    return answer;
}


// Console log tests
console.log(maxDistance([1, 1, 1, 6, 1, 1, 1])); // 3
console.log(maxDistance([1, 8, 3, 8, 3]));       // 4
console.log(maxDistance([0, 1]));                // 1
console.log(maxDistance([1, 2, 1, 1, 1]));       // 4
console.log(maxDistance([5, 5, 5, 5, 9]));       // 4
console.log(maxDistance([9, 5, 5, 5, 5]));       // 4
