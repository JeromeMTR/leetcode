/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
  // i = nums and target
  // o = sum of 3 that is closest to target
  // c = find solution and then optmize
  // e = assume there will be a solution
  
  nums.sort((a, b) => a - b);
  // keep track of closest
  let closest = Infinity,
      closeSum;
  // loop through array
  for (let i = 0; i < nums.length; i++) {
    const curVal = nums[i];
    // skip duplicates
    if (i > 0 && nums[i - 1] === curVal) continue;
    // pass nums, target - curVal, next index
    findClosestPair(nums, i);
  }
  // create a helper function to find closest pair to target
  function findClosestPair(nums, index) {
    let left = index + 1,
        right = nums.length - 1;
    let newTarget = target - nums[index];
    
    while (left < right) {
      const totalSum = nums[left] + nums[right];
      let span;
      if (totalSum <= newTarget) {
        // get cur span
        span = newTarget - totalSum
        if (span <= closest) {
          closest = span;
          closeSum = totalSum + nums[index];
        }
        left++;
      }
      if (totalSum > newTarget) {
        // get cur span
        span = totalSum - newTarget;
        if (span <= closest) {
          closest = span;
          closeSum = totalSum + nums[index];
        }
        right--;
      }
    }
  }
  return closeSum;
};