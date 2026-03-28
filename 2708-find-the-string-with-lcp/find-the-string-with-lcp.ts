/**
 * IOCE
 *
 * Inputs:
 * - lcp: number[][]
 *   An n x n matrix where lcp[i][j] is the longest common prefix length
 *   between suffixes word[i..n-1] and word[j..n-1].
 *
 * Output:
 * - string
 *   The lexicographically smallest lowercase English string that matches
 *   the given lcp matrix, or "" if no such string exists.
 *
 * Constraints:
 * - 1 <= n == lcp.length == lcp[i].length <= 1000
 * - 0 <= lcp[i][j] <= n
 *
 * Edge Cases:
 * - n = 1
 * - Invalid diagonal: lcp[i][i] must equal n - i
 * - Asymmetric matrix: lcp[i][j] !== lcp[j][i]
 * - Need more than 26 different groups/letters
 * - Matrix values that contradict actual suffix matching rules
 * - Cases where some positions must be equal because lcp[i][j] > 0
 * - Cases where some positions must be different because lcp[i][j] = 0
 */

function findTheString(lcp: number[][]): string {
    const n = lcp.length;

    // Basic sanity checks:
    // 1) diagonal must be exactly suffix length
    // 2) matrix must be symmetric
    for (let i = 0; i < n; i++) {
        if (lcp[i][i] !== n - i) return "";
        for (let j = 0; j < n; j++) {
            if (lcp[i][j] !== lcp[j][i]) return "";
        }
    }

    // Build the lexicographically smallest string.
    //
    // Greedy idea:
    // - Traverse left to right.
    // - If a position is still unassigned, give it the smallest available letter.
    // - Every position j with lcp[i][j] > 0 must have word[j] == word[i],
    //   because positive LCP means first characters of those suffixes match.
    //
    // This groups equal characters together as early/small as possible.
    const chars: string[] = new Array(n).fill("");
    let currentCharCode = "a".charCodeAt(0);

    for (let i = 0; i < n; i++) {
        if (chars[i] !== "") continue;

        if (currentCharCode > "z".charCodeAt(0)) return "";

        const ch = String.fromCharCode(currentCharCode);
        currentCharCode++;

        for (let j = i; j < n; j++) {
            if (lcp[i][j] > 0) {
                chars[j] = ch;
            }
        }
    }

    const word = chars.join("");

    // Validate by recomputing the actual LCP matrix from the built string.
    //
    // dp[i][j] = if word[i] == word[j], then 1 + dp[i+1][j+1], else 0
    // Compute from bottom-right to top-left.
    const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));

    for (let i = n - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (word[i] === word[j]) {
                dp[i][j] = 1 + dp[i + 1][j + 1];
            } else {
                dp[i][j] = 0;
            }

            if (dp[i][j] !== lcp[i][j]) {
                return "";
            }
        }
    }

    return word;
}


// -------------------- Tests --------------------

console.log(
    findTheString([
        [4, 0, 2, 0],
        [0, 3, 0, 1],
        [2, 0, 2, 0],
        [0, 1, 0, 1]
    ]),
    "=> expected: abab"
);

console.log(
    findTheString([
        [4, 3, 2, 1],
        [3, 3, 2, 1],
        [2, 2, 2, 1],
        [1, 1, 1, 1]
    ]),
    "=> expected: aaaa"
);

console.log(
    findTheString([
        [4, 3, 2, 1],
        [3, 3, 2, 1],
        [2, 2, 2, 1],
        [1, 1, 1, 3]
    ]),
    "=> expected: ''"
);

console.log(
    findTheString([[1]]),
    "=> expected: a"
);

console.log(
    findTheString([
        [2, 1],
        [1, 1]
    ]),
    "=> expected: aa"
);

console.log(
    findTheString([
        [2, 0],
        [0, 1]
    ]),
    "=> expected: ab"
);

console.log(
    findTheString([
        [2, 1],
        [0, 1]
    ]),
    "=> expected: ''"
);
