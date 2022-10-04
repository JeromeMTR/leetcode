/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(array) {
  let highest = 0,
      windowStart = 0;
  //min = Number.MATH_VALUE infi
      
  // loop through the given array
  for (let windowEnd = 1; windowEnd < array.length; windowEnd++) {
   // compare if windowstart is great than the current element 
   if (array[windowStart] > array[windowEnd]) {
     //if (min > arra[windEnd])
      // increment the windowstart
      windowStart = windowEnd;
     // min = array[windowEnd];
      continue;
   }
      
   // find the profit between windowstart and windowend element
   const profit = array[windowEnd] - array[windowStart]; // min
   // reassign hihghest comparing profit with highest var
   highest = Math.max(highest, profit);
  }
  //return highest
  return highest;
};