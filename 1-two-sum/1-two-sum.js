/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  // i = array of nums, target num
  // o = index of elements that add up to target
  // c = try solving in 0(n^2) or lower
  // e = assume there will always be a solution, and cannnot use the same element twice
  /*
                  ASSUMING THAT THE ARRAY IS SORTED 
  */
//     // keep track of front and back
//     // back pointer is equal to length - 1 of array
//     // starting pointer is equal to start index of array
//     let frontIndex = 0,
//         backIndex = nums.length - 1;

//     // while starting pointer is less than or equal to back pointer and back pointer is greater than or equal to start pointer loop
//     while(frontIndex <= backIndex) {
//       // declare an added var
//       const added = nums[frontIndex] + nums[backIndex];
//       // compare if added val equals num
//       if (added === target) {
//         // return starting pointer and back pointer in array
//         return [frontIndex, backIndex];
//       }

//       // check if added val is larger than target sum
//         // decrement back pointer
//       if (added > target) {
//         backIndex--;
//       } else {
//         frontIndex++;
//       }
//     }
    
  // NOT SORTED
  
  // declare a obj var to keep track of numbers
  let obj = {},
      result = [],
      i = 0;
  // loop through array
//   for (let i = 0; i < nums.length; i++) {
//     // declare and assign num to equal current element
//     let currentNum = nums[i];
//     // check if target - nums[num] does not return false

//     if (target - currentNum in obj) {
//       // return target - current num in obj and index in array
//       return [obj[target - currentNum], i];
//     }
//     // assign a key in obj with current num and value of index
//     obj[currentNum] = i;
//   }
  
  while(result.length < 2) {
    let currentNum = nums[i];
    // check if target - nums[num] does not return false

    if (target - currentNum in obj) {
      // return target - current num in obj and index in array
      result.push(obj[target - currentNum], i);
    }
    // assign a key in obj with current num and value of index
    obj[currentNum] = i;
    i++;
  }
  return result;
    
};