/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function(s) {
  // i = string input
  // o = return string in descending sorted order depending on letter count 
  // c = solve in big O(n) complexity
  // e = if string is empty return empty string, if string length is one return string
  
  let sortedS = '';
  let bucket = [];
  let freq = {};
  
  for (let i = 0; i <= s.length; i++) {
    bucket.push([]);
  }
  
  for (let i = 0; i < s.length; i++) {
    freq[s[i]] = ++freq[s[i]] || 1;
  }
  
  for (let key in freq) {
    let curVal = freq[key];
    
    bucket[curVal].push(key);
  }
  
  for (let i = bucket.length - 1; i > 0; i--) {
    let curTuple = bucket[i];
    for (let j = 0; j < curTuple.length; j++) {
      let tempCount = i;
      while (tempCount > 0) {
        sortedS += curTuple[j];
        tempCount--;
      }
    }
  }
  
  return sortedS;
};