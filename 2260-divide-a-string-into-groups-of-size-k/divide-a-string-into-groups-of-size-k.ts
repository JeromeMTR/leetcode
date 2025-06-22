// IOCE

// Input:
//  s: string - The original string to partition
//  k: number - The group size
//  fill: string - The fill character to pad the last group if needed

// Output:
//  string[] - The array of groups after partitioning

// Constraints:
//  1 <= s.length <= 100
//  1 <= k <= 100
//  fill is a single lowercase English letter
//  s consists of lowercase English letters only

// Example 1:
//  Input: s = "abcdefghi", k = 3, fill = "x"
//  Output: ["abc","def","ghi"]

// Example 2:
//  Input: s = "abcdefghij", k = 3, fill = "x"
//  Output: ["abc","def","ghi","jxx"]

function divideString(s: string, k: number, fill: string): string[] {
    const result: string[] = []; // Array to hold the groups
    const n = s.length;
    // Iterate through the string in steps of k
    for (let i = 0; i < n; i += k) {
        // Take substring of length k starting at i
        let group = s.slice(i, i + k);
        // If group is less than k, pad it with fill character
        if (group.length < k) {
            group = group + fill.repeat(k - group.length);
        }
        result.push(group);
    }
    return result;
}

// ---- Test cases ----
console.log(divideString("abcdefghi", 3, "x"));   // ["abc", "def", "ghi"]
console.log(divideString("abcdefghij", 3, "x"));  // ["abc", "def", "ghi", "jxx"]
console.log(divideString("ab", 4, "z"));          // ["abzz"]
console.log(divideString("a", 1, "z"));           // ["a"]