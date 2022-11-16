/** 
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 */
var guessNumber = function(n) {
  let res = guess(n);
  
  if (res === -1) {
    while (res === -1) {
      n -= Math.floor(n / 2);
      res = guess(n);
    }
  } else {
    while (res === 1) {
      n += Math.floor(n / 2); 
      res = guess(n);
    }
  }
  
  while (res !== 0) {
    if (res === -1) n--;
    if (res === 1) n++;
    res = guess(n);
  }
  return n;
};