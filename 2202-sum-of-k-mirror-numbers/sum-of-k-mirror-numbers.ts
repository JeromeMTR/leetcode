/**
 * Helper to check if a string is a palindrome
 */
function isPalindrome(str: string): boolean {
    let l = 0, r = str.length - 1;
    while (l < r) {
        if (str[l] !== str[r]) return false;
        l++;
        r--;
    }
    return true;
}

/**
 * Helper to convert a decimal number to an arbitrary base (k)
 */
function toBaseK(num: number, k: number): string {
    if (num === 0) return "0";
    let res = "";
    while (num > 0) {
        res = (num % k).toString() + res;
        num = Math.floor(num / k);
    }
    return res;
}

/**
 * Generate palindromic numbers in increasing order, both odd and even length
 * For a given center, expand left+mirror
 */
function* generatePalindromes(): Iterable<number> {
    // Odd-length palindromes
    for (let len = 1; ; len++) { // unbounded, but will break in logic using n
        // Half length
        let lower = Math.pow(10, Math.floor((len - 1) / 2));
        let upper = Math.pow(10, Math.ceil(len / 2));
        for (let half = lower; half < upper; half++) {
            let halfStr = half.toString();
            // Construct the palindrome
            let palindromeStr = halfStr + halfStr
                .slice(0, len % 2 === 0 ? halfStr.length : halfStr.length - 1)
                .split('').reverse().join('');
            yield Number(palindromeStr);
        }
    }
}

/**
 * Find the sum of the n smallest k-mirror numbers.
 */
function kMirror(k: number, n: number): number {
    let res: number[] = [];
    for (const pal of generatePalindromes()) {
        // Check for k-palindrome
        if (isPalindrome(toBaseK(pal, k))) {
            res.push(pal);
            if (res.length === n) break;
        }
    }
    // Return the sum
    return res.reduce((a, b) => a + b, 0);
}

/* ---------- Examples / Testing ---------- */

console.log(kMirror(2, 5));   // Output: 25
console.log(kMirror(3, 7));   // Output: 499
console.log(kMirror(7, 17));  // Output: 20379000

// Output for custom cases
// console.log(kMirror(4, 10));  

/*
EXPLANATION FOR EXAMPLES:
Example 1:
k = 2, n = 5
Numbers: 1 (1), 3 (11), 5 (101), 7 (111), 9 (1001) → Sum = 25

Example 2:
k = 3, n = 7
Numbers: 1 (1), 2 (2), 4 (11), 8 (22), 121 (11111), 151 (12121), 212 (21212) => sum = 499

Time complexity: For n <= 30 this is efficient.
*/