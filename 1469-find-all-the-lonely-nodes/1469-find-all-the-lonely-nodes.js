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
var getLonelyNodes = function(root) {
  // i: root node
  // o: array of lonely nodes
  // c: order does not matter, find a solution and then optimize
  // e: if root does not have any children return root in array, if root is null return empty array
  
  if (!root) return [];
  if (!root.left && !root.right) return [];
  
  // initalize queue with root node
  let queue = [root];
  
  // declare lonely array
  let lonely = [];
  // iterate through tree while something in queue
  while (queue.length > 0) {
    // get cur node
    let curNode = queue.shift();
    
    if (!curNode.left && curNode.right) lonely.push(curNode.right.val);
    if (curNode.left && !curNode.right) lonely.push(curNode.left.val);
    
    if (curNode.right) queue.push(curNode.right);
    if (curNode.left) queue.push(curNode.left);
    
  }
  return lonely;
};