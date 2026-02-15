/**
 * IOCE
 * Inputs:
 *   - a: string (binary string using only '0' and '1', length 1..10^4, no leading zeros except "0")
 *   - b: string (binary string using only '0' and '1', length 1..10^4, no leading zeros except "0")
 *
 * Output:
 *   - string: the binary sum of a and b, also as a binary string with no leading zeros (unless the result is "0").
 *
 * Constraints:
 *   - 1 <= a.length, b.length <= 10^4
 *   - a and b consist only of '0' or '1'
 *   - No leading zeros except for "0"
 *   - O(n), where n = max(a.length, b.length)
 *   -  O(n) for the result
 *
 * Edge Cases:
 *   - One or both inputs are "0" (e.g., "0" + "0" -> "0", "0" + "1" -> "1")
 *   - Inputs of different lengths (e.g., "1" + "1111")
 *   - Carry propagation across all digits (e.g., "1111" + "1" -> "10000")
 */


function addBinary(a: string, b: string): string {
  let i = a.length - 1;
  let j = b.length - 1;
  let carry = 0;
  const result: string[] = [];

  // Process from the end towards the start
  while (i >= 0 || j >= 0 || carry !== 0) {
    const bitA = i >= 0 ? (a.charCodeAt(i) - 48) : 0; // '0' -> 48, '1' -> 49
    const bitB = j >= 0 ? (b.charCodeAt(j) - 48) : 0;
    const sum = bitA + bitB + carry;

    // sum can be 0..3 => result bit is sum % 2, new carry is Math.floor(sum / 2)
    result.push((sum & 1).toString()); // faster than (sum % 2).toString()
    carry = sum >> 1; // faster than Math.floor(sum / 2)

    i--;
    j--;
  }

  result.reverse();
  return result.join('');
}

console.log(addBinary("0", "0"));
console.log(addBinary("0", "1"));
console.log(addBinary("1", "0"));
console.log(addBinary("1", "1"));
