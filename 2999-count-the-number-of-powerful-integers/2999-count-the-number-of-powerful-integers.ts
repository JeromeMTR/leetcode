function numberOfPowerfulInt(start: number, finish: number, limit: number, s: string): number {
    // i = start, finish, limit, and suffix string s
    // o = number of integers in the range [start..finish] that are "powerful"
    // c = digits of the number must be <= limit, and the number must end with s
    // e = no powerful integers in the range, return 0

    // Convert start and finish to strings for easier digit manipulation
    const start_ = (start - 1).toString(); // Adjust start to include the lower bound
    const finish_ = finish.toString();

    // Calculate the count of powerful integers in the range [start, finish]
    return calculate(finish_, s, limit) - calculate(start_, s, limit);
  }

function calculate(x: string, s: string, limit: number): number {
    // If the length of x is less than the suffix, no valid numbers exist
    if (x.length < s.length) {
      return 0;
    }

    // If the length of x equals the suffix, check if x is greater than or equal to the suffix
    if (x.length === s.length) {
      return x >= s ? 1 : 0;
    }

    // Extract the suffix from x for comparison
    const suffix = x.slice(-s.length);
    let count = 0;
    const preLen = x.length - s.length; // Length of the prefix (digits before the suffix)

    // Iterate through the prefix digits
    for (let i = 0; i < preLen; i++) {
      const digit = parseInt(x[i]); // Current digit in the prefix

      // If the current digit exceeds the limit, add all possible combinations for the remaining digits
      if (limit < digit) {
        count += Math.pow(limit + 1, preLen - i); // Add combinations for remaining digits
        return count; // Stop further processing
      }

      // Add combinations for smaller digits
      count += digit * Math.pow(limit + 1, preLen - 1 - i);
    }

    // If the suffix of x is greater than or equal to the required suffix, increment the count
    if (suffix >= s) {
      count++;
    }

    // Return the total count of powerful integers
    return count;
  }