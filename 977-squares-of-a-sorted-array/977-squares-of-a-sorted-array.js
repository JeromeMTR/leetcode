/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(arr) {
  // i = array of nums (neg or pos int)
  // o = sorted array of squared elements in input array
  // c = find a working solution and then optimize
  // e = assume that there is a sorted array
  if (arr.length === 1) return [arr ** 2];
  
  const n = arr.length;
  squares = Array(n).fill(0);
  let highestSquareIdx = n - 1;
  let left = 0,
    right = n - 1;
  while (left <= right) {
    let leftSquare = arr[left] * arr[left],
      rightSquare = arr[right] * arr[right];
    if (leftSquare > rightSquare) {
      squares[highestSquareIdx] = leftSquare;
      left += 1;
    } else {
      squares[highestSquareIdx] = rightSquare;
      right -= 1;
    }
    highestSquareIdx -= 1;
  }

  return squares;
};