/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function(n) {
  // i = integer 
  // o = true or false
  // c = input is higher or equal to 1, find a working solutino and then find an optmized solution
  // e = if input is less than 1 return false
  
  // declare and assign variables to keep track of
  let trail = n,
      scout = n;
  
  // keep looping until trail is equal 1
  while (trail !== 1) {
    // loop through trail and sum
    scout = splitSquareSum(scout);
    scout = splitSquareSum(scout);
    trail = splitSquareSum(trail);
    
    // check if trail and scout match
    if (trail === 1) return true;
    if (trail === scout) return false;
      // return false
  }
  return true;
};

function splitSquareSum(int) {
  let sum = 0;
  int = int.toString();
  for (let i = 0; i < int.length; i++) {
    sum += int[i] ** 2;
  }
  return sum
}