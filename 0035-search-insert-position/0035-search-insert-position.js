/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
  // i: number array and target number
  // o: index of target array if its in nums array, if not where it would be
  // c: find solution and then optmize
  // e: assume that there is at least one element
  let halfCount = Math.floor(nums.length/2);
  let halfElement = nums[halfCount];
  
  if (target > halfElement) {
    while (nums[halfCount] < target) {
      if (nums[halfCount] === target) return halfCount;
      halfCount++;
    }
  } else {
    while (nums[halfCount] > target) {
      if (nums[halfCount] === target) return halfCount;
      halfCount--;
    }
  }
  if (target < nums[halfCount] && halfCount === 0) return 0;
  if (halfCount === - 1) return 0;
  if (target > nums[halfCount]) return halfCount + 1;
  if (target < nums[halfCount]) return halfCount;
  return halfCount
};