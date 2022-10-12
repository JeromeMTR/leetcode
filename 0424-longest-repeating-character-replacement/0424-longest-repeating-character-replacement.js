/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function(s, k) {
  // i = string of uppercase letter, and the amount of letters we can replace
  // o = highest consective letters with replacement; integer
  // c = s consist of uppercase letters, find solution and then optmize
  // e = if s length is less than 1 return 0
  
  if (s.length < 1) return 0;
  
  // keep track of highest count
  let highest = 0,
      maxLetter = 0;
  // keep track of current elements in obj
  const obj = {};
  // refrence left side of array
  let left = 0;
  // loop through the string
  for (let i = 0; i < s.length; i++) {
    const curVal = s[i];
    const leftVal = s[left];
    // push cur val to obj
    obj[curVal] = ++obj[curVal] || 1;
    
    maxLetter = Math.max(maxLetter, obj[curVal]);
    
    if (i - left + 1 - maxLetter > k) {
      obj[leftVal]--;
      left++;
    }
    
    highest = Math.max(highest, i - left + 1)
    
  }
    
  return highest;
};