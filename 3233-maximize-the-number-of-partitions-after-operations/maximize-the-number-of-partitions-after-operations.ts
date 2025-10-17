/**
 * Returns the max number of partitions achievable by changing at most one character in `s`,
 * followed by repeatedly removing the longest prefix containing at most `k` distinct chars.
 * 
 * @param s The input string
 * @param k The max distinct letters per partition
 * @returns The maximal number of partitions after one optimal change
 */
function maxPartitionsAfterChange(s: string, k: number): number {
    // Helper function to compute number of partitions for current string s
    function countPartitions(s: string, k: number): number {
        let count = 0;
        let n = s.length;
        let i = 0;

        while (i < n) {
            // Use a map to count distinct characters in the current prefix
            const set = new Set<string>();
            let j = i;
            while (j < n && (set.size < k || set.has(s[j]))) {
                set.add(s[j]);
                j++;
            }
            // The prefix is from i to j-1 (inc.) with at most k distinct
            count++;
            i = j;
        }

        return count;
    }

    const n = s.length;
    let maxParts = countPartitions(s, k); // Case of no change

    // For each position, try changing it to each different letter and get partitions
    for (let i = 0; i < n; ++i) {
        for (let c = 0; c < 26; ++c) {
            const letter = String.fromCharCode(97 + c);
            if (s[i] === letter) continue;

            // Create s' with character i changed to letter
            const changed = s.substring(0, i) + letter + s.substring(i + 1);
            // Count partitions and update answer if it's the best so far
            maxParts = Math.max(maxParts, countPartitions(changed, k));
        }
    }
    return maxParts;
}

/*
IOCE
-----

Input 1:
    s = "accca", k = 2
Output 1:
    3
    // Explanation: Max partitions possible after optimal change.

Input 2:
    s = "aabaab", k = 3
Output 2:
    1

Input 3:
    s = "xxyz", k = 1
Output 3:
    4

// Run with:
console.log(maxPartitionsAfterChange("accca", 2)); // Expected: 3
console.log(maxPartitionsAfterChange("aabaab", 3)); // Expected: 1
console.log(maxPartitionsAfterChange("xxyz", 1)); // Expected: 4
*/

// ---- Additional Test Example ----
console.log(maxPartitionsAfterChange("accca", 2));      // 3
console.log(maxPartitionsAfterChange("aabaab", 3));     // 1
console.log(maxPartitionsAfterChange("xxyz", 1));       // 4
console.log(maxPartitionsAfterChange("abcdefgh", 4));   // 2 (abcd, efgh)