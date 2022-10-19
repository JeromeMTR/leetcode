/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var averageOfLevels = function(root) {
  // i: root node of bst
  // o: average of values in each level 
  // c: find a working solution
  // e: if root is null return empty array
  if (!root) return [];
  let queue = [root],
      average = [];
  
  while (queue.length) {
    const levelSize = queue.length;
    let curAvg = 0;
    for (let i = 0; i < levelSize; i++) {
      node = queue.shift();
      
      curAvg += node.val;
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    average.push(curAvg/levelSize);
  }

  return average;
};