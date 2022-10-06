/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  // i = array
  // o = array of unique nums in array
  // c = sorted array, try to solve first and then optimize
  // e = if array length is less than 1 return [] array
  
  let i = 0,
      nonDup = 1;
  
  while (i < nums.length) {
    // check if prev index of non dup matches current index
    if (nums[nonDup - 1] !== nums[i]) {
      // swap the current index element 
      nums[nonDup] = nums[i];
      // increment nonDup
      nonDup++;
    }
    
    // increase i count to eventually stop loop
    i++;
  }
  
  return nonDup;
};