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
  
  // declare result array
  let hash = {}
    for (let i = 0 ; i < nums.length; i ++) {
        hash[nums[i]] = hash[nums[i]] + 1 || 1
    }
    let result = [];
    let keys = Object.keys(hash);
    keys.sort((a, b) => {
        return hash[a] - hash[b]
    })
    while (result.length < k) {
        result.push(keys.pop())
    }
    return result
};