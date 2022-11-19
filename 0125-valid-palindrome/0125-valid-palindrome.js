/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
  // i: string input
  // o: boolean depending on palandrome or not
  // c: time complexity of O(n) 
  // e: if string is empty return true
  const removeSym = s.replace(/[^a-zA-Z0-9s]/g, '').toLowerCase();
  let left = 0,
      right = removeSym.length - 1;
  while (left < right) {
    if (removeSym[left] !== removeSym[right]) return false;
    left++;
    right--;
  }
  return true;
};
