/**
 * @param {number[]} nums
 * @return {number[]}
 */
var getConcatenation = function(nums) {
  // i = number of arrays
  // o = concated array of given num of array
  // c = find optmized solution
  // e = no edge cases seen
  
  const len = nums.length;
  
  for (i = 0; i < len; i++) {
    nums.push(nums[i]);
  }
  return nums;
};