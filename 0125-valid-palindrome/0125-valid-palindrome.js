/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
  let removeSym = s.replace(/[^a-zA-Z0-9s]/g, '').toLowerCase();
  
  // for (let i = 0; i < s.length; i++) {
  //   const letter = checkLetter(s, s[i], i);
  //   if (letter) removeSym += letter; 
  // }

  let left = 0,
      right = removeSym.length - 1; 
  console.log(removeSym)
  while (left < right) {
    if (removeSym[left] !== removeSym[right]) return false;
    left++;
    right--;
  }
  return true;
};
  
// function checkLetter(s, char, i) {
//   let num = char * 1;
//   if (typeof num === 'number') return char;
//   let code = s.charCodeAt(i);
//   if (code >= 65 && code <= 90) return char.toLowerCase();
//   if (code >= 97 && code <= 122) return char.toLowerCase();

//   return false;
// }