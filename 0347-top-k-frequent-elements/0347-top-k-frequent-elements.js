/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
  // i: num of array, int k
  // o: array of the most frequent elements returned in any order
  // c: try to solve the complexity better than O(n log n)
  // e: assume that nums will have at least 1 element, and k is in range
  // do we assume if the array is sorted?
  if (nums.length === 1 && k === 1) return nums;
  // declare res array
  let arr = [];
  
  // instantiate a freqMap
  let freqMap = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    freqMap.set(nums[i], (freqMap.get(nums[i]) || 0) + 1);
  }
  
  // create bucket with length of nums
  let bucket = [];
  for (let i = 0; i <= nums.length; i++) {
    bucket.push([]);
  }
  
  freqMap.forEach((val, key) => {
    bucket[val].push(key);
  })
  
  for (let i = bucket.length - 1; i >= 1; i--) {
    for (let j = 0; j < bucket[i].length; j++) {
      const cap = arr.length === k;
      if (cap) break;
      arr.push(bucket[i][j])
    }
  }
  return arr
};