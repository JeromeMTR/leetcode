/**
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruit = function(fruits) {
  // i = array of numbers 
  // o = the highest amount of fruit you can have in both baskets
  // c = try to find a working solution first and then optmize
  // e = fruit numbers are greater than or eql to zero
  
  // keep track of first part of array
  // keep track of how many types of fruit in obj
  // keep track of highest count
  let start = 0,
      highest = 0,
      fruitsObj = {};
  
  // loop through array 
  for (let i = 0; i < fruits.length; i++) {  
    // define each fruit in the obj
    !fruitsObj[fruits[i]] ? 
      fruitsObj[fruits[i]] = 1 :
      fruitsObj[fruits[i]]++;
    // while obj length is greater than 2 
    while(Object.keys(fruitsObj).length > 2) {     
      // decrement count of in obj of property start point
      fruitsObj[fruits[start]] -= 1;
      // if current that fruit in obj is 0, delete it
      if (fruitsObj[fruits[start]] === 0) {
        delete fruitsObj[fruits[start]];
      }
      // increment count of start point
      start++;
    }
    highest = Math.max(highest, i - start + 1);
  }

  // return highest count
  return highest;
};