/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
  const result = [];
  
  let digitsJoined = digits.join('')
  digitsJoined = (BigInt(digitsJoined) + BigInt(1)).toString();
  for (let i = 0; i < digitsJoined.length; i++)  {
    result.push(digitsJoined[i]);
  }
  return result;
};