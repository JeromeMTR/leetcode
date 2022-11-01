/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  // i: array of strings
  // o: longest common prefix
  // c: find solution and then optimize
  // e: if no common prefix return emptry string, consists of only lowercase englis letters
  
  // keep track of prefixes 
  let prefix = strs[0];
  // loop through array 
  for (let i = 1; i < strs.length; i++) {
    let lowest = strs[i].length < prefix.length ? strs[i] : prefix;
    let curPrefix = '';
    
    if (strs[i][0] !== prefix[0]) return '';
    
    for (let j = 0; j < lowest.length; j++) {
      // find common prefix
      if (strs[i].slice(0, j + 1) === prefix.slice(0, j + 1)) {
        curPrefix = strs[i].slice(0, j + 1)
      }
    }
    // update prefix 
    prefix = curPrefix
  }
  // return prefix
  return prefix;
};