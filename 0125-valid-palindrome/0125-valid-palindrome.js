/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
  let removeSym = s.replace(/[^a-zA-Z0-9s]/g, '').toLowerCase();
  
  let left = 0,
      right = removeSym.length - 1;
  while (left < right) {
    if (removeSym[left] !== removeSym[right]) return false;
    left++;
    right--;
  }
  return true;
};
