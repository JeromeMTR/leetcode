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
  var start = 1;
    var end = n;   
    while(start <= end){
        var num = Math.ceil(start + (end - start)/2);
        var ask = guess(num);
        if(ask == 0) return num;
        else if(ask == -1) end = num - 1;
        else if(ask == 1) start = num + 1;
    }
    return start;
};