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
 * @return {number}
 */
var countNodes = function(root) {
  // i: root node of tree
  // o: count of nodes in tree
  // c: find solution and then run in less than o(n) time complexity
  // e: what if root node is empty or null
  if (!root) return 0;

  let count = 0;

  function traverse(node) {
    count++;
    if (node.right) traverse(node.right);
    if (node.left) traverse(node.left);
  }

  traverse(root);
  return count;
};