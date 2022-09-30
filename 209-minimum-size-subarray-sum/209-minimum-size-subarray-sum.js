/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
    let lengthSubArray = 0,
        totalSum = 0,
        windowStart = 0;
  
    
    for (let i = 0; i < nums.length; i++) {
      
      totalSum += nums[i];
      
      while (totalSum >= target) {
          lengthSubArray = lengthSubArray !== 0 ? 
            Math.min(lengthSubArray, (i - windowStart) + 1) :
            (i - windowStart) + 1
        
          totalSum -= nums[windowStart++];
      }
    }
    
    return lengthSubArray;
};