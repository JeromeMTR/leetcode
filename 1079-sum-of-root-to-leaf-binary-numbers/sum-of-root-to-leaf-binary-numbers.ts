/**
 * IOCE
 * Inputs:
 *  - root: TreeNode | null
 * Outputs:
 *  - number: sum of all root-to-leaf binary numbers
 *
 * Constraints:
 *  - 1 <= number of nodes <= 1000
 *  - Node.val is 0 or 1
 *  - Answer fits in 32-bit signed integer
 *  - Time: O(n), visit each node once
 *  - Space: O(h) recursion stack, where h is tree height (worst O(n))
 *
 * Edge cases:
 *  - Single node tree (root is also a leaf)
 *  - Skewed tree (all left or all right)
 *  - Leading zeros along a path (valid binary numbers)
 */

/** Definition for a binary tree node. */
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function sumRootToLeaf(root: TreeNode | null): number {
  // DFS accumulating the binary value along the path:
  // newValue = (currentValue << 1) | node.val
  function dfs(node: TreeNode | null, current: number): number {
    if (!node) return 0;

    const next = (current << 1) | node.val;

    // If it's a leaf, this path contributes its binary value.
    if (!node.left && !node.right) return next;

    return dfs(node.left, next) + dfs(node.right, next);
  }

  return dfs(root, 0);
}

/**
 * Helper: Build a binary tree from LeetCode level-order array representation.
 * Example: [1,0,1,0,1,0,1]
 * null indicates missing nodes.
 */
function buildTreeLevelOrder(arr: Array<number | null>): TreeNode | null {
  if (arr.length === 0 || arr[0] === null) return null;

  const root = new TreeNode(arr[0]);
  const queue: TreeNode[] = [root];
  let i = 1;

  while (queue.length && i < arr.length) {
    const node = queue.shift()!;

    if (i < arr.length && arr[i] !== null) {
      node.left = new TreeNode(arr[i]!);
      queue.push(node.left);
    }
    i++;

    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i]!);
      queue.push(node.right);
    }
    i++;
  }

  return root;
}

/* -------------------- Console log tests -------------------- */

// Example 1
const root1 = buildTreeLevelOrder([1, 0, 1, 0, 1, 0, 1]);
console.log(sumRootToLeaf(root1), "expected:", 22);

// Example 2
const root2 = buildTreeLevelOrder([0]);
console.log(sumRootToLeaf(root2), "expected:", 0);

// Additional tests
// Single leaf: [1] => 1
const root3 = buildTreeLevelOrder([1]);
console.log(sumRootToLeaf(root3), "expected:", 1);

// Skewed left: 1 -> 0 -> 1 represents 101b = 5
const root4 = new TreeNode(1, new TreeNode(0, new TreeNode(1), null), null);
console.log(sumRootToLeaf(root4), "expected:", 5);

// Leading zeros: 0 -> 0 -> 1 => 001b = 1
const root5 = new TreeNode(0, new TreeNode(0, new TreeNode(1), null), null);
console.log(sumRootToLeaf(root5), "expected:", 1);
