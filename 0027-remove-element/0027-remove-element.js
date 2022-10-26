/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
  // i = num array and integer val
  // o = return array.length without val int and all numbers shifted to right 
  // c = find solution and then optimize
  // e = if nums length is zero return 0, 
  
  // keep track of indexes that have 2
  // keep track of cur index
  let tracker = {};
  let swapCount = 0; 
  
  // loop through array
  for (let i = 0; i < nums.length; i++) {
    // add indexes to tracker then continue if they eql to val
    let curVal = nums[i];
    if (curVal === val) {
      tracker[i] = 1;
      swapCount++;
      continue;
    }
    // swap with first index in tracker
    for (let index in tracker) {
      nums[index] = nums[i];
      nums[i] = val;
      delete tracker[index];
      tracker[i] = 1;
      break;
    }
  }
  
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === val) return nums.slice(0, i).length;
  }
  // return swapCount > 0 ? nums.slice(0, -swapCount).length : nums.length
};