/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var lengthOfLongestSubstringKDistinct = function(s, k) {
  // i = s: string, k: integer
  // o = length of longest at most distinct k chars
  
  // declare and assing starting var
  let longest = 0,
      startWindow = 0,
      tracker = {};
  
  // loop over string
  for (let i = 0; i < s.length; i++) {
    // keep track of right char
    const rightChar = s[i];
    
    if (!(rightChar in tracker)) {
      tracker[rightChar] = 0;
    }
    
    tracker[rightChar]++;
    
    // keep looping if tracker length is higher than k
    while (Object.keys(tracker).length > k) {
      // track left char
      const leftChar = s[startWindow];
      tracker[leftChar]--;
      
      // check if left char is 0
      if (tracker[leftChar] === 0)  {
        // delete key in tracker which means there is no other
        // letter inside window
        delete tracker[leftChar];
        
      }
      startWindow++;
    }
    longest = Math.max(longest, i - startWindow + 1);
  }
  return longest
};