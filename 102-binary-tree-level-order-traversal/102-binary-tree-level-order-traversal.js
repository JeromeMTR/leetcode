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
var levelOrder = function(root) {
  // i = root node;
  // o = array of arrays containing each val in that current level
  // c = number of trees in range [0, 2000] and node.values are great than -1k and less than 1k
  // e = if root is empty or does not have val return empty array
  if (root === null) return [];
  
  let currentNode = root;
      result = [],
      queue = [currentNode];
  
  // traverse throught the tree while theres something in the queue
  while (queue.length > 0) {
    // declare a var to keep track of level values  
    const levelSize = queue.length;
    const currentLevel = [];
    
    // loop through level length
    for (i = 0; i < levelSize; i++) {
      currentNode = queue.shift(),
            { left, right } = currentNode || {};
      currentLevel.push(currentNode.val);
      if (left) {
      // push node to queue
      queue.push(left);
      // check if there is right of current node
      }
      if (right) { 
      // push node to queue
      queue.push(right);
      }
    }
    result.push(currentLevel);
  } 
  return result; 
};