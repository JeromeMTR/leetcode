/**
 * Compares two version strings as described in the problem statement.
 * 
 * IOCE:
 * Input: version1, version2: strings of dots and digits (e.g., "1.0.3.20")
 * Output: -1 if version1 < version2, 1 if version1 > version2, 0 if equal
 * Constraints:
 *  - 1 <= version1.length, version2.length <= 500
 *  - version1 and version2 only have digits and '.' (valid version numbers)
 *  - All given revisions fit in a 32-bit integer
 * 
 * Examples:
 *   compareVersion("1.2", "1.10")     => -1
 *   compareVersion("1.01", "1.001")  => 0
 *   compareVersion("1.0", "1.0.0.0") => 0
 */
function compareVersion(version1: string, version2: string): number {
    // Split version strings by '.' to get revision numbers as strings
    const revs1 = version1.split('.');
    const revs2 = version2.split('.');

    // Find the maximum length of the two revision arrays
    const maxLen = Math.max(revs1.length, revs2.length);

    // Compare each revision
    for (let i = 0; i < maxLen; i++) {
        // Parse each revision to integer, treat missing revisions as 0
        const num1 = i < revs1.length ? parseInt(revs1[i], 10) : 0;
        const num2 = i < revs2.length ? parseInt(revs2[i], 10) : 0;

        // Compare the two revision numbers
        if (num1 < num2) return -1;
        if (num1 > num2) return 1;
        // else, equal -- continue to next revision
    }

    // All revisions equal
    return 0;
}


// ---------- Examples & Testing: ------------

console.log(compareVersion("1.2", "1.10"));     // Output: -1
console.log(compareVersion("1.01", "1.001"));   // Output: 0
console.log(compareVersion("1.0", "1.0.0.0"));  // Output: 0
console.log(compareVersion("3.3.7", "3.3.7"));  // Output: 0
console.log(compareVersion("1.0.1", "1"));      // Output: 1
console.log(compareVersion("1.0.0", "1"));      // Output: 0
console.log(compareVersion("1.0.0.1", "1.0.1"));// Output: -1