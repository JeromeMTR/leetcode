/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  // i = string input
  // o = integer on longest substring without repeats
  // c = find solution and then optmize
  // e = it will consist of letters, digits, symbols and spaces
  // if the string length is zero then return 0;
  
  // keep track of longest
  // keep track front of scope
  // keep track of char obj
  let longest = 0,
      front = 0,
      chars = {};
  
  // loop through string 
  for (let i = 0; i < s.length; i++) {
    // place the current char in obj
    !chars[s[i]] ? chars[s[i]] = 1 : chars[s[i]]++;
    // check if that current char value is greater than 1
    while (chars[s[i]] > 1) {
      chars[s[front]]--;
      if (chars[s[front]] === 0) {
        delete chars[s[front]];
      }
      front++;
    }
  
    // reassign the longest to compared longest
    longest = Math.max(longest, i - front + 1);
  }
  
  return longest;
};