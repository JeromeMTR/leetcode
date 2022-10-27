/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} original
 * @param {TreeNode} cloned
 * @param {TreeNode} target
 * @return {TreeNode}
 */

var getTargetCopy = function(original, cloned, target) {
  // i: og and clone bst, target node in original tree
  // o: return same node val in cloned tree
  // c: find solution and then optmize
  // e: if original tree is empty return empty array
  if (!original.left & !original.right) return cloned;
  
  const queue = [cloned];
  
  while (queue.length > 0) {
    let curNode = queue.shift();
    
    if (curNode.val === target.val) return curNode;
    
    if (curNode.right) queue.push(curNode.right);
    if (curNode.left) queue.push(curNode.left);
    
  }
};