/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function(s) {
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
  console.log(bucket);
  
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