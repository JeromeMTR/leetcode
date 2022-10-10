/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    const triplets = [];
    
    nums.sort((a,b) => a - b);
    
    for (let i = 0; i < nums.length; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        
        let left = i + 1, right = nums.length - 1, target_sum = -nums[i];
        
        while (left < right) {
            const two_sum = nums[left] + nums[right];
            if (target_sum === two_sum ) {
                triplets.push([nums[i], nums[left], nums[right]]);
                left+=1;
                
                while (left < right && nums[left] === nums[left - 1]) {
                    left += 1;
                }
               
            } else if (target_sum > two_sum) {
                left += 1;
            } else {
                right -= 1
            }
        }
    }

    return triplets;
};




