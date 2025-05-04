function numEquivDominoPairs(dominoes: number[][]): number {
    const dominoMap = new Map<string, number>();
    let count = 0;

    // Iterate over each domino in the list
    for (const [a, b] of dominoes) {
        // Sort the numbers to handle the equivalence
        const key = a < b ? `${a}${b}` : `${b}${a}`;

        // Check if the key already exists in the map
        if (dominoMap.has(key)) {
            // Increment count by the number of times the same domino configuration has previously appeared
            count += dominoMap.get(key)!;
            // Update the map entry for this domino configuration
            dominoMap.set(key, dominoMap.get(key)! + 1);
        } else {
            // Initialize the map entry for this domino configuration
            dominoMap.set(key, 1);
        }
    }

    return count;
}

// Example 1
const dominoes1 = [[1, 2], [2, 1], [3, 4], [5, 6]];
console.log(numEquivDominoPairs(dominoes1)); // Output: 1

// Example 2
const dominoes2 = [[1, 2], [1, 2], [1, 1], [1, 2], [2, 2]];
console.log(numEquivDominoPairs(dominoes2)); // Output: 3

/**************
 * Explanation *
 **************
 *
 * Input: dominoes = [[1,2],[2,1],[3,4],[5,6]]
 * Output: 1
 * Explanation: The equivalent domino pairs are (0,1) where domino[0]=[1,2] is equivalent to domino[1]=[2,1].
 *
 * Input: dominoes = [[1,2],[1,2],[1,1],[1,2],[2,2]]
 * Output: 3
 * Explanation: The equivalent domino pairs are (0,1), (0,3), and (1,3).
 *
 * Constraints:
 * - 1 <= dominoes.length <= 40000
 * - dominoes[i].length == 2
 * - 1 <= dominoes[i][j] <= 9
 */