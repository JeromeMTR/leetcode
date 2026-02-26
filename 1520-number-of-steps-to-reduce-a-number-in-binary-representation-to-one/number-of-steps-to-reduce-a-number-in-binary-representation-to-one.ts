/**
 * IOCE
 * I (Input):
 *   - s: string, binary representation of a positive integer (no leading zeros, s[0] === '1')
 *
 * O (Output):
 *   - number: steps to reduce the number to 1 using:
 *       - if even: divide by 2f
 *       - if odd: add 1
 *
 * C (Constraints):
 *   - 1 <= s.length <= 500
 *   - s contains only '0' and '1'
 *   - Guaranteed to reach 1
 *   - Time Complexity:  O(n), where n = s.length
 *   - Space Complexity: O(1)
 *
 * E (Edge cases):
 *   - s === "1" -> 0 steps
 *   - Large length up to 500 (cannot safely parse into JS number)
 *   - Strings with many trailing '1's causing carry propagation when adding 1 (e.g., "111...111")
 *
 *
 */

function numSteps(s: string): number {
  const n = s.length;
  if (n === 1) return 0; // s === "1"

  let steps = 0;
  let carry = 0;

  // Process from least significant bit down to the bit after the most significant
  // We stop at i = 1 because we want to end at the leading bit becoming "1".
  for (let i = n - 1; i >= 1; i--) {
    const bit = s.charCodeAt(i) - 48; // '0'->0, '1'->1
    const effective = bit + carry;

    if (effective === 0) {
      // even: ...0 -> divide by 2
      steps += 1;
      // carry stays 0
    } else if (effective === 1) {
      // odd: ...1 -> add 1 (makes it even) then divide by 2
      steps += 2;
      carry = 1; // adding 1 to a trailing 1 produces carry
    } else {
      // effective === 2: bit 1 with carry 1 => 2, even -> divide by 2
      steps += 1;
      carry = 1; // carry persists
    }
  }

  // After processing down to index 1, we handle the most significant bit.
  // If carry is 1, it may create an extra step (e.g., "111" -> "1000" then shifts).
  // With this logic, total is steps + carry.
  return steps + carry;

}

// Test cases
console.log(numSteps("1101"), "expected", 6);
console.log(numSteps("10"), "expected", 1);
console.log(numSteps("1"), "expected", 0);
console.log(numSteps("111"), "expected", 4);
console.log(numSteps("101"), "expected", 5);
console.log(numSteps("1000"), "expected", 3);
