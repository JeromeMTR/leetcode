/**
 * Remove the minimum number of characters so that
 * no three consecutive characters are equal.
 * @param s - input string
 * @returns the "fancy" string
 */
function makeFancyString(s: string): string {
    // We'll build the result as an array for O(1) append
    const res: string[] = [];

    // Loop over each character
    for (let i = 0; i < s.length; i++) {
        // If the last two appended chars are the same as s[i],
        // skip this character (i.e., do not push it)
        const n = res.length;
        if (n >= 2 && res[n - 1] === s[i] && res[n - 2] === s[i]) {
            // This would cause three in a row; skip it
            continue;
        }
        res.push(s[i]);
    }

    // Join array back to string and return
    return res.join('');
}

// IO: Example test harness
function main() {
    const testCases = [
        { input: "leeeetcode", expected: "leetcode" },
        { input: "aabaaaa", expected: "aabaa" },
        { input: "aab", expected: "aab" },
        // Custom test case: 10 a's
        { input: "aaaaaaaaaa", expected: "aa" + "aa" + "aa" + "aa".slice(0, 2) }, // "aa"*5 = "aaaaaaaaaa" -> every time skip after two. should be "aa"
    ];
    for (const { input, expected } of testCases) {
        const output = makeFancyString(input);
        console.log(`Input: ${input}\nOutput: ${output}\nExpected: ${expected}\nPass: ${output === expected}\n`);
    }
}

// Run the tests
main();