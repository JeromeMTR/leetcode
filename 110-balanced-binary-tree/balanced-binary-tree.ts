/**
 * Height-Balanced Binary Tree (LeetCode 110)
 *
 * IOCE
 * Inputs:
 *  - root: TreeNode | null (binary tree root)
 *
 * Outputs:
 *  - boolean: true if the tree is height-balanced, else false
 *
 * Constraints:
 *  - Number of nodes: [0, 5000]
 *  - Node values: [-1e4, 1e4]
 *  - O(n), where n is number of nodes (each node visited once)
 *  - O(h) recursion stack, where h is tree height (worst O(n) for skewed tree)
 *
 * Edge Cases:
 *  - Empty tree => true
 *  - Single node => true
 *  - Skewed tree (linked-list-like) => likely false when height diff > 1
 *  - Large tree: ensure O(n) solution (avoid repeated height calculations)
 */

/**
 * Definition for a binary tree node.
 */
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val ?? 0;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

/**
 * Returns true if the tree is height-balanced.
 * Uses postorder DFS: compute heights bottom-up and propagate "unbalanced" using a sentinel.
 */
function isBalanced(root: TreeNode | null): boolean {
  // Returns height if balanced; returns -1 if unbalanced anywhere in this subtree.
  const heightOrFail = (node: TreeNode | null): number => {
    if (node === null) return 0;

    const leftH = heightOrFail(node.left);
    if (leftH === -1) return -1;

    const rightH = heightOrFail(node.right);
    if (rightH === -1) return -1;

    if (Math.abs(leftH - rightH) > 1) return -1;

    return Math.max(leftH, rightH) + 1;
  };

  return heightOrFail(root) !== -1;
}

/**
 * Helper: Build a binary tree from level-order array representation:
 * e.g. [3,9,20,null,null,15,7]
 */
function buildTreeLevelOrder(arr: Array<number | null>): TreeNode | null {
  if (arr.length === 0) return null;
  if (arr[0] === null) return null;

  const root = new TreeNode(arr[0]);
  const queue: TreeNode[] = [root];
  let i = 1;

  while (queue.length > 0 && i < arr.length) {
    const node = queue.shift()!;

    // Left child
    if (i < arr.length) {
      const leftVal = arr[i++];
      if (leftVal !== null && leftVal !== undefined) {
        node.left = new TreeNode(leftVal);
        queue.push(node.left);
      }
    }

    // Right child
    if (i < arr.length) {
      const rightVal = arr[i++];
      if (rightVal !== null && rightVal !== undefined) {
        node.right = new TreeNode(rightVal);
        queue.push(node.right);
      }
    }
  }

  return root;
}

/* ------------------- Console log tests ------------------- */
const root1 = buildTreeLevelOrder([3, 9, 20, null, null, 15, 7]);
console.log("Test 1 (expected true):", isBalanced(root1));
const root2 = buildTreeLevelOrder([1, 2, 2, 3, 3, null, null, 4, 4]);
console.log("Test 2 (expected false):", isBalanced(root2));
const root3 = buildTreeLevelOrder([]);
console.log("Test 3 (expected true):", isBalanced(root3));
const root4 = buildTreeLevelOrder([1]);
console.log("Test 4 (single node, expected true):", isBalanced(root4));
const root5 = buildTreeLevelOrder([1, 2, null, 3, null, 4]);
console.log("Test 5 (skewed, expected false):", isBalanced(root5));
