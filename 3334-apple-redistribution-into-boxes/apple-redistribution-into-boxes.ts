/**
 * 3074. Apple Redistribution into Boxes
 *
 * IOCE
 * I: apple[], capacity[]
 * O: minimum number of boxes needed
 * C: n,m <= 50; sums fit easily; redistribution can split packs across boxes
 * E: Sort capacities descending; take largest boxes until total capacity >= total apples
 */

/**
 * Greedy is optimal because:
 * We only care about total apples sumA and total selected capacity sumC.
 * To minimize number of boxes, always pick the largest available capacities first.
 *
 * @param {number[]} apple - Array of apple counts in each pack
 * @param {number[]} capacity - Array of box capacities
 * @returns {number} Minimum number of boxes needed
 */
function minimumBoxes(apple: number[], capacity: number[]): number {
  // Total apples to store
  const totalApples = apple.reduce((acc, x) => acc + x, 0);

  // Sort capacities descending
  capacity.sort((a, b) => b - a);

  // Pick boxes until it can store all apples
  let sumCap = 0;
  for (let i = 0; i < capacity.length; i++) {
    sumCap += capacity[i];
    if (sumCap >= totalApples) return i + 1;
  }

  // Problem guarantees it's possible, so it should have returned already.
  return capacity.length;
}

// Example test cases
console.log(minimumBoxes([1,2,3], [3,3,3])); // Expected: 2
console.log(minimumBoxes([5,5,5], [10,1,1,1])); // Expected: 1
console.log(minimumBoxes([2,2,2,2], [1,1,1,10])); // Expected: 2
console.log(minimumBoxes([4,4,4,4], [5,5,5,5])); // Expected: 4
console.log(minimumBoxes([10], [1,2,3,4])); // Expected: 4