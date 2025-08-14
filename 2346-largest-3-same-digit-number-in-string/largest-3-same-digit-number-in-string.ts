/**
 * Finds the maximum "good" integer substring (of length 3 and same digit) in 'num'
 * @param num - string representing a large integer
 * @returns the maximum good integer substring or empty string if none exists
 */
function largestGoodInteger(num: string): string {
    let maxGood: string = "";

    // Iterate over all substrings of length 3
    for (let i = 0; i <= num.length - 3; i++) {
        // Get the substring
        const substr = num.slice(i, i + 3);
        // Check if all characters are the same
        if (substr[0] === substr[1] && substr[1] === substr[2]) {
            // Compare and save if this substring is larger than previous maximum
            if (substr > maxGood) {
                maxGood = substr;
            }
        }
    }

    return maxGood;
}