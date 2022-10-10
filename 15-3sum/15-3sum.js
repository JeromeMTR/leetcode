/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  // i = array of nums
  // o = array of nums that equal to zero
  // c = try to find a solution and then optmize, length of array will be at least 3, includes neg and pos nums
  // e = return empty array if nothing adds to zero
  
  // sort array
  nums.sort((a, b) => a - b);
  // declare results array
  const result = [];
  // loop through the array
  for (let i = 0; i < nums.length; i++) { 
    // get current index
    const curVal = nums[i];

    // skip duplicates
    if (i > 0 && curVal === nums[i - 1]) continue;
    // pass  array index, and eleemnt to func
    twoSumTarget(nums, i + 1, -curVal,result);
  }
    
  return result;
};

//  create helper function to find pair that equals target number
const twoSumTarget = (array, front, target, result) => {
  // refrence pointers for front and back
  let back = array.length - 1;
  
  // loop through until front and back are same
  while (front < back) {
    // get total sum of front and back combined
    const totalSum = array[front] + array[back];
    // compare with target val
    if (target === totalSum) {
      result.push([-target, array[front], array[back]]);
      front++;
      while (front < back && array[front] === array[front - 1]) {
        front++;
      }
      while (front < back && array[back] === array[back + 1]) {
        back--;
      }
    } else if (totalSum < target) {
      front++;
    } else {
      back--;
    }
  }
}





