/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target, lastInd=0) {
  // i: num array, num target
  // o: index of target
  // c: must be written in O(log n) 
  // e: assume that the nums array is sorted
  
//   if (nums.length < 1) return -1;
  
//   // one solution in constant but time complexity
//   // maybe we can recursivevly attemp solution
//   // get half point
//   let halfInd = Math.floor((nums.length - 1) / 2);
  
//   console.log(nums, halfInd, lastInd)
  
//   if (nums[halfInd] === target) {
//     return lastInd > 0 
//   }
  
//   if (nums[halfInd] < target) {
//     let slice = nums.slice(halfInd + 1, nums.length);
//     return search(slice, target, halfInd)
//   }
  
//   if (nums[halfInd] > target) {
//     return search(nums.slice(0, halfInd), target)
//   }
  
//   return -1;
  return binarySearch(nums, target, 0, nums.length - 1)
}

function binarySearch(nums, target, left, right) {
  if(left > right) return -1
  else {
    let mid = Math.floor((left + right) / 2);
    
    if(target === nums[mid]) return mid
    else if(target > nums[mid]) // Number is on the right array
      return binarySearch(nums, target, mid + 1, right) 
    else                       // Number is on the left array
      return binarySearch(nums, target, left, mid - 1)
  }
}