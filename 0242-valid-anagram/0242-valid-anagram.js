/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  // i: two string inputs
  // o: true or false depending on anagram
  // c: find solution and then optimize
  // e: if they are not the same lenght return false
  
  if (s.length !== t.length) return false;
  
  // instiate two maps 
  let sMap = new Map(),
      tMap = new Map();
  
  for (letter of s) {
    sMap.set(letter, (sMap.get(letter) || 0) + 1);
  }
  
  for (letter of t) {
    tMap.set(letter, (tMap.get(letter) || 0) + 1);
  }
  
  for (letter of s) {
    const same = tMap.get(letter) === sMap.get(letter);
    if (!same) return false;
  }
  
  return true;  
};