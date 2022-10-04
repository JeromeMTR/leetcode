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
 * @return {number[][]}
 */
var levelOrderBottom = function(root) {
  if (!root) return [];
  let queue = [root],
      result = [],
      node = root;

  while (queue.length > 0) {
    // keep track of the length of current level
    // declare var to keep track of values in array
    const levelLength = queue.length,
          levelVals = [];
    
    // loop through length of how many is in that level
    for (let i = 0; i < levelLength; i++) {
      // remove current first node form queue rassinging node
      node = queue.shift();
      // push nodes val into tracked values
      levelVals.push(node.val);
      
      // check if there is a right on node and left on node
      if (node.left !== null) { 
        // push node in queue
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }
    // unshift subarray into results
    result.unshift(levelVals);
  }

  return result;
};