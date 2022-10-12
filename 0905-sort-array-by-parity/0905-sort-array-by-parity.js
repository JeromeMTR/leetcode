/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParity = function(nums) {
  // declare to zero
  let evenIndex = 0;
  
  // loop through array
  for (let i = 0; i < nums.length; i++) {
    let curVal = nums[i];
    // check if cur val is even
    if (curVal % 2 === 0) {
      const temp = nums[evenIndex];
      nums[evenIndex] = curVal;
      nums[i] = temp;
      evenIndex++;
    }
  }
  return nums;
};