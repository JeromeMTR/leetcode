/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
  // i = array of numbers
  // o = the max area of water a container can hold
  // c = find a working solution and then optimize
  // e = assume that there will at least be 2 elements in array
  
  // keep a refrence pointer to front index and back index
  // keep track of max water
  let front = 0,
      back = height.length - 1,
      maxWater = 0;
  
  // while front is less than back
  while (front < back) {
    // get area of water
    const min = Math.min(height[front], height[back]),
          length = back - front;
    const area = min * length;
    
    // check which element at index front or back is higher 
    height[front] >= height[back] ? back-- : front++;
      // if back side is higher increment front index
      // otherwise decrement back index
  
    // compare which one is higher and reassing max
    maxWater = Math.max(maxWater, area);
  }
  return maxWater;
};