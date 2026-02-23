/**
 * IOCE
 * Inputs:
 *  - s: binary string consisting of '0' and '1'
 *  - k: integer (length of binary codes)
 *
 * Output:
 *  - boolean: true if every binary code of length k appears as a substring of s; otherwise false
 *
 * Constraints:
 *  - 1 <= s.length <= 5 * 10^5
 *  - 1 <= k <= 20
 *  - s[i] in {'0','1'}
 *
 * Time Complexity:
 *  - O(n)
 *
 * Space Complexity:
 *  - O(2^k) for seen codes (k <= 20, so at most ~1,048,576)
 *
 * Edge Cases:
 *  - If s.length < k: impossible to contain any length-k substring -> false
 *  - If number of substrings (n-k+1) < 2^k: not enough windows to cover all codes -> false
 *  - k = 1: just need both '0' and '1' to appear
 */

function hasAllCodes(s: string, k: number): boolean {
  const n = s.length;
  if (n < k) return false;

  const need = 1 << k; // total number of binary codes length k
  const windows = n - k + 1;
  if (windows < need) return false; // pigeonhole/pruning

  // seen[code] = 1 if code appears
  const seen = new Uint8Array(need);

  // Rolling hash over bits: keep last k bits in an integer
  let code = 0;
  const mask = need - 1; // (1<<k) - 1

  // Build first k bits
  for (let i = 0; i < k; i++) {
    code = (code << 1) | (s.charCodeAt(i) - 48); // '0'->0, '1'->1
  }

  let count = 0;
  if (seen[code] === 0) {
    seen[code] = 1;
    count++;
  }

  // Slide window across the string, updating code in O(1)
  for (let i = k; i < n; i++) {
    code = ((code << 1) & mask) | (s.charCodeAt(i) - 48);
    if (seen[code] === 0) {
      seen[code] = 1;
      count++;
      if (count === need) return true; // early exit
    }
  }

  return count === need;
}

/***********************
 * Console log tests
 ***********************/
console.log(hasAllCodes("00110110", 2), "=> true");
console.log(hasAllCodes("0110", 1), "=> true");
console.log(hasAllCodes("0110", 2), "=> false");

// Additional edge tests
console.log(hasAllCodes("0", 1), "=> false");           // missing '1'
console.log(hasAllCodes("01", 1), "=> true");           // has both
console.log(hasAllCodes("01", 2), "=> false");          // only "01", missing others
console.log(hasAllCodes("000000", 2), "=> false");      // only "00"
console.log(hasAllCodes("00110", 2), "=> true");        // has "00","01","11","10"