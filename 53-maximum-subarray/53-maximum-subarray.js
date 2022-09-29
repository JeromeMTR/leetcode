/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    // i = array
    // o = greatest sum in subarray
    let totalSum = nums[0],
        maxSum = totalSum;
  
    for (let i = 1; i < nums.length; i++) {
      let num = nums[i];

      if (num > totalSum && num + totalSum < num) {
        totalSum = num;
      } 
      else {
        totalSum += num;
      }
      maxSum = Math.max(maxSum, totalSum);
    }
    return maxSum;      
};