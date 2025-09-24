/**
 * Returns the fraction of numerator/denominator as a string,
 * enclosing repeating decimals in parentheses.
 *
 * @param numerator - an integer (-2^31 <= numerator <= 2^31-1)
 * @param denominator - a nonzero integer (-2^31 <= denominator <= 2^31-1)
 * @returns a string representation of the fraction
 *
 * IOCE:
 * Input:  numerator = 1, denominator = 2
 * Output: "0.5"
 *
 * Input:  numerator = 2, denominator = 1
 * Output: "2"
 *
 * Input:  numerator = 4, denominator = 333
 * Output: "0.(012)"
 */
function fractionToDecimal(numerator: number, denominator: number): string {
  // Handle zero numerator
  if (numerator === 0) return "0";

  let result = "";

  // If the result is negative, remember the sign
  if ((numerator < 0) !== (denominator < 0)) {
    result += "-";
  }

  // Work with positive values to avoid issues with -2^31
  const num = Math.abs(numerator);
  const den = Math.abs(denominator);

  // Get the integer part
  const integerPart = Math.floor(num / den);
  result += integerPart.toString();

  // Get the initial remainder
  let remainder = num % den;

  // If perfectly divisible, no fractional part
  if (remainder === 0) return result;

  result += ".";

  // For the decimal part: map from remainder to result length (position)
  const remainderPos = new Map<number, number>();

  while (remainder !== 0) {
    // If we've seen this remainder before, it's a cycle
    if (remainderPos.has(remainder)) {
      const pos = remainderPos.get(remainder)!; // Index where this remainder was first seen
      // Insert '(' at the start position, and append ')' at the end
      return result.slice(0, pos) + "(" + result.slice(pos) + ")";
    }
    // Remember the position where this remainder is first seen
    remainderPos.set(remainder, result.length);

    remainder *= 10;
    const digit = Math.floor(remainder / den);
    result += digit.toString();

    remainder = remainder % den;
  }

  return result;
}

// --- Example Test Cases ---

// IOCE: Inputs and Outputs
console.log(fractionToDecimal(1, 2));      // Output: "0.5"
console.log(fractionToDecimal(2, 1));      // Output: "2"
console.log(fractionToDecimal(4, 333));    // Output: "0.(012)"
console.log(fractionToDecimal(1, 6));      // Output: "0.1(6)"
console.log(fractionToDecimal(-50, 8));    // Output: "-6.25"
console.log(fractionToDecimal(7, -12));    // Output: "-0.58(3)"
console.log(fractionToDecimal(0, 7));      // Output: "0"