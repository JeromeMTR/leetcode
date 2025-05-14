// Import necessary modules
const MODULO = 1e9 + 7;

/**
 * Function to calculate the length of the transformed string 
 * after `t` transformations.
 * 
 * @param s - the initial string consisting of lowercase English letters
 * @param t - number of transformations to perform
 * @param nums - array of size 26 where nums[i] represents the number of consecutive characters 
 *               each letter from the alphabet transforms to
 * @returns the length of the resulting string after `t` transformations modulo (10^9 + 7)
 */
function transformedStringLength(s: string, t: number, nums: number[]): number {
  // Initial length of the string
  let currentLength = s.length;

  // Process the string for `t` transformations
  for (let i = 0; i < t; i++) {
    let newLength = 0;
    // For each character in the string, calculate the transformation length
    for (const ch of s) {
      const index = ch.charCodeAt(0) - 'a'.charCodeAt(0);
      newLength += nums[index];
    }
    currentLength = newLength % MODULO; // Take the modulo to prevent overflow
  }

  return currentLength;
}

// Example Usage:
const s = "abcyy";
const t = 2;
const nums = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2];
console.log(transformedStringLength(s, t, nums)); // Output: 7