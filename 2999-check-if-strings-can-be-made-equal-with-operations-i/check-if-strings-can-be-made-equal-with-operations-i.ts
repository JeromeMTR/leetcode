/*
IOCE

Inputs:
- s1: string of length 4
- s2: string of length 4

Output:
- boolean
  - true  -> if we can make s1 equal to s2 using any number of swaps
  - false -> otherwise

Operation:
- We may swap characters at indices whose difference is exactly 2.
- For a 4-length string, the only possible swaps are:
  - index 0 <-> 2
  - index 1 <-> 3

Observation:
- Even indices {0, 2} can only swap among themselves.
- Odd indices {1, 3} can only swap among themselves.
- So the multiset/order-flexible characters at even positions in s1
  must match the even positions in s2.
- Similarly, the characters at odd positions in s1 must match the odd positions in s2.

So we just need:
- sorted([s1[0], s1[2]]) == sorted([s2[0], s2[2]])
- sorted([s1[1], s1[3]]) == sorted([s2[1], s2[3]])

Constraints:
- s1.length == s2.length == 4
- lowercase English letters only

Time Complexity:
- O(1)

Space Complexity:
- O(1)

Edge Cases:
- s1 already equals s2
- repeated characters, e.g. "aabb"
- even positions match but odd positions do not
- odd positions match but even positions do not
*/

function canBeEqual(s1: string, s2: string): boolean {
    // Get the characters at even indices (0, 2), sort them, and compare.
    const even1 = [s1[0], s1[2]].sort().join('');
    const even2 = [s2[0], s2[2]].sort().join('');

    // Get the characters at odd indices (1, 3), sort them, and compare.
    const odd1 = [s1[1], s1[3]].sort().join('');
    const odd2 = [s2[1], s2[3]].sort().join('');

    // Both groups must match.
    return even1 === even2 && odd1 === odd2;
}


// Console log tests
console.log(canBeEqual("abcd", "cdab")); // true
console.log(canBeEqual("abcd", "dacb")); // false
console.log(canBeEqual("same", "same")); // true
console.log(canBeEqual("abab", "bbaa")); // false
console.log(canBeEqual("aabb", "bbaa")); // true
console.log(canBeEqual("zzxy", "xzyz")); // false