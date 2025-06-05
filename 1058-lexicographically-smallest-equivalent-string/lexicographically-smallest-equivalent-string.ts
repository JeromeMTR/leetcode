/**
 * Given two equivalence strings s1 and s2, and a base string,
 * return the lexicographically smallest string equivalent to baseStr
 * under the equivalency constraints.
 */
function smallestEquivalentString(s1: string, s2: string, baseStr: string): string {
    // Parent array for union-find: one entry for each lowercase letter
    // Initialize: each letter is its own parent
    const parent: number[] = Array(26).fill(0).map((_, i) => i);

    // Find function with path compression, returns parent of character
    function find(x: number): number {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }

    // Union function: always attach the larger to the smaller (to ensure minimal char is the parent)
    function union(x: number, y: number): void {
        const parX = find(x);
        const parY = find(y);
        if (parX === parY) return;
        if (parX < parY) {
            parent[parY] = parX;
        } else {
            parent[parX] = parY;
        }
    }

    // Step 1: Build connections from s1/s2
    for (let i = 0; i < s1.length; i++) {
        // Calculate character indices ('a' -> 0, ..., 'z' -> 25)
        const idx1 = s1.charCodeAt(i) - 97;
        const idx2 = s2.charCodeAt(i) - 97;
        union(idx1, idx2);
    }

    // Step 2: Construct result for baseStr
    let result = '';
    for (let ch of baseStr) {
        const idx = ch.charCodeAt(0) - 97;
        const rep = find(idx);
        result += String.fromCharCode(rep + 97);
    }

    return result;
}

// ----------- IOCE -----------

// Example 1
console.log(smallestEquivalentString("parker", "morris", "parser")); // "makkek"

// Example 2
console.log(smallestEquivalentString("hello", "world", "hold"));     // "hdld"

// Example 3
console.log(smallestEquivalentString("leetcode", "programs", "sourcecode")); // "aauaaaaada"

// Edge: No equivalences
console.log(smallestEquivalentString("abc", "def", "ghi"));         // "ghi"
// Edge: Every char is equivalent
console.log(smallestEquivalentString("abc", "bca", "cab"));         // "aaa"