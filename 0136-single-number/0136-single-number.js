/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
  // i: array of numbers
  // o: number that appears once in that array
  // c: find a working solution
  // e: if input is empty return -1
  
  if (nums.length === 0) return -1;
  
  let singleNum;
  
  let freqMap = new Map();
  
  for (num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }
  console.log(freqMap);
  freqMap.forEach((val, key) => {
    if (val === 1) singleNum = key;
  })
  
  return singleNum
};