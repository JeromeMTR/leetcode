/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  // i: nums array and target interger
  // o: we want the indicis of 2 numbers that add up to target
  // c: try to find a O(n) algorithim
  // e: assume that there is only one valid answer
  
  let hash = new Map();
  let resultArr = [];
  
  // loop through array
  for (let i = 0; i < nums.length; i++) {
    // get cur val
    let curVal = nums[i];
    // check if the target minus cur val is in hash
    let curKey = target - curVal;
    
    if (hash.has(curKey)) {
      // push current index and the stored index at the hash key
      resultArr.push(hash.get(curKey), i);
    }    
    
    // add the cur val as a key in hash and the index as the value
    hash.set(curVal, i);
  }
  // return res arr
  return resultArr;
};