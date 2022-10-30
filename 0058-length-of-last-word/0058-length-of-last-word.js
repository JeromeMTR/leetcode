/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
  // i: string input with spaces
  // o: lenght of last word in string
  // c: find solution and then optimize
  // e: assume there will at least be one word in s
  let len;
  
  let splitS = s.split(' ');
  console.log(splitS);
  let filter = splitS.filter(word => word);
  return filter[filter.length - 1].length;
};