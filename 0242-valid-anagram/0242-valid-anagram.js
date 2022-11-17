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
  let sMap = {},
      tMap = {};
  
  // add all letters to hash map
  for (letter of s) {
    sMap[letter] = sMap[letter] + 1 || 1;
  }
  
  // add all letters to hash map
  for (letter of t) {
    tMap[letter] = tMap[letter] + 1 || 1;
  }
  // loop through hashmap
    // compare cur val and tMaps key val and return false if not the same
  for (var key in sMap) {
    if (!tMap[key]) return false;
    if (sMap[key] !== tMap[key]) return false;
  }
  
  return true;  
};