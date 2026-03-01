/**
 * IOCE
 * I: n (string) - positive decimal integer, no leading zeros, length up to 1e5
 * O: number - minimum count of positive deci-binary numbers (digits only 0/1, no leading zeros) whose sum equals n
 * C:
 *   - Time: O(n)
 *   - Space: O(1)
 * E (edge cases):
 *   - Single digit: "1" => 1, "9" => 9
 *   - Very large length (1e5): must be linear scan
 *   - Mixed digits with zeros: "1010" => 1 (max digit is 1)
 *
 * @param n - A positive decimal integer as a string (no leading zeros, length up to 1e5).
 *
 */

function minPartitions(n: string): number {
  let maxDigit = 0;
  for (let i = 0; i < n.length; i++) {
    const d = n.charCodeAt(i) - 48;
    if (d > maxDigit) maxDigit = d;
    if (maxDigit === 9) return 9;
  }
  return maxDigit;
}

/************* console.log testcases  *************/
console.log(minPartitions("32"), "=> expected 3");
console.log(minPartitions("82734"), "=> expected 8");
console.log(minPartitions("27346209830709182346"), "=> expected 9");
console.log(minPartitions("1"), "=> expected 1");
console.log(minPartitions("10"), "=> expected 1");
console.log(minPartitions("99999"), "=> expected 9");
console.log(minPartitions("100000"), "=> expected 1");
