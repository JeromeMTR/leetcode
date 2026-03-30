/*
IOCE

1) Inputs
- s1: string
- s2: string
Both strings:
- have the same length n
- contain only lowercase English letters

2) Output
- boolean
- true  => if we can make s1 and s2 equal using the allowed swaps
- false => otherwise

3) Constraints
- 1 <= n <= 1e5
- Time complexity target: O(n)
- Space complexity target: O(1)

Edge Cases
- n = 1:
  - no swap matters, so strings must already match
- Strings already equal
- Same total character counts but different parity-group counts => false
- Large input size => must avoid sorting each group if possible
*/

function checkStrings(s1: string, s2: string): boolean {
    const even1 = new Array<number>(26).fill(0);
    const odd1 = new Array<number>(26).fill(0);
    const even2 = new Array<number>(26).fill(0);
    const odd2 = new Array<number>(26).fill(0);

    for (let i = 0; i < s1.length; i++) {
        const idx1 = s1.charCodeAt(i) - 97; // 'a' = 97
        const idx2 = s2.charCodeAt(i) - 97;

        if (i % 2 === 0) {
            even1[idx1]++;
            even2[idx2]++;
        } else {
            odd1[idx1]++;
            odd2[idx2]++;
        }
    }

    for (let c = 0; c < 26; c++) {
        if (even1[c] !== even2[c] || odd1[c] !== odd2[c]) {
            return false;
        }
    }

    return true;
}

// Console log tests
console.log(checkStrings("abcdba", "cabdab")); // true
console.log(checkStrings("abe", "bea")); // false
console.log(checkStrings("a", "a")); // true
console.log(checkStrings("a", "b")); // false
console.log(checkStrings("abc", "cba")); // true
console.log(checkStrings("abcd", "cdab")); // false
