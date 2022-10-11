/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
  // i = array of nums and k
  // o = k largest element in array
  // c = find solution and then optmize
  // e = none to be found so far
  
  nums.sort((a, b) => a - b);
  return nums[nums.length - k];
};