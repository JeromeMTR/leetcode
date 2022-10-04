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
var zigzagLevelOrder = function(root) {
//   i = root node
//   o = zigzag level order traversal of node vals  
//   c = most optimal solution possible
//   e = return empty array if root is null
  
  if (!root) return [];
  
  // keep track of results
  // keep track of current node
  // declare an array to make it function like a queue
  let node = root,
      results = [],
      queue = [root];
  
  // keep traversing while there is something inside the queue
  while (queue.length) {
    // keep track of current levels value
    // check length of results
    const levelVals = [],
          length = queue.length,
          isOdd = results.length % 2 === 1; 
      
    for (let i = 0; i < length; i++) {
      node = queue.shift();
      // push or unshift val into levelVals depending on odd
      isOdd ? levelVals.unshift(node.val) : levelVals.push(node.val);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    // push levelVals array into results
    results.push(levelVals)
  }
  // return results
  return results;
};