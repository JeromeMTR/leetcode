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
  
  let anagram = true;
  if (s.length !== t.length) return false;
  
  // instiate two maps 
  let sMap = new Map(),
      tMap = new Map();
  
  // add all letters to hash map
  for (letter of s) {
    sMap.set(letter, (sMap.get(letter) || 0) + 1);
  }
  
  // add all letters to hash map
  for (letter of t) {
    tMap.set(letter, (tMap.get(letter) || 0) + 1);
  }
  
  // loop through hashmap
  sMap.forEach((val, key) => {
    // compare cur val and tMaps key val and return false if not the same
    if (!tMap.has(key)) anagram = false;
    if (val !== tMap.get(key)) anagram = false;
  })
  
  return anagram;  
};