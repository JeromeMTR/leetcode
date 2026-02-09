/**
 * IOCE
 * I (Input):
 *  - root: TreeNode | null  (root of a Binary Search Tree)
 *
 * O (Output):
 *  - TreeNode | null: a balanced BST containing the same node values
 *
 * C (Constraints):
 *  - Time: O(n)  (inorder traversal O(n) + build balanced tree O(n))
 *  - Space: O(n) (store inorder values; recursion stack O(h) <= O(n))
*
* E (Edge cases):
 *  - 1 <= number of nodes <= 1e4
 *  - 1 <= Node.val <= 1e5
 *  - Already balanced BST -> may return structurally similar tree
 *  - Skewed BST (like a linked list) -> must rebalance
 *  - Single node -> return same node
 *
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function balanceBST(root: TreeNode | null): TreeNode | null {
  // Inorder traversal of BST gives sorted node values
  const vals: number[] = [];

  const inorder = (node: TreeNode | null): void => {
    if (!node) return;
    inorder(node.left);
    vals.push(node.val);
    inorder(node.right);
  };

  inorder(root);

  // Build a balanced BST from sorted array (choose middle as root)
  const build = (lo: number, hi: number): TreeNode | null => {
    if (lo > hi) return null;
    const mid = (lo + hi) >> 1;
    const node = new TreeNode(vals[mid]);
    node.left = build(lo, mid - 1);
    node.right = build(mid + 1, hi);
    return node;
  };

  return build(0, vals.length - 1);
}

/* ----------------------- Helpers for testing ----------------------- */

/**
 * Build a binary tree from level-order array representation (LeetCode style).
 * null means missing node.
 */
function buildTreeLevelOrder(arr: Array<number | null>): TreeNode | null {
  if (!arr.length || arr[0] == null) return null;
  const root = new TreeNode(arr[0]);
  const q: TreeNode[] = [root];
  let i = 1;

  while (q.length && i < arr.length) {
    const cur = q.shift()!;
    const leftVal = arr[i++];
    if (leftVal !== undefined) {
      if (leftVal != null) {
        cur.left = new TreeNode(leftVal);
        q.push(cur.left);
      }
    }
    const rightVal = arr[i++];
    if (rightVal !== undefined) {
      if (rightVal != null) {
        cur.right = new TreeNode(rightVal);
        q.push(cur.right);
      }
    }
  }
  return root;
}
/**
 * Check if tree is height-balanced.
 */
function isBalanced(root: TreeNode | null): boolean {
  const dfs = (node: TreeNode | null): number => {
    if (!node) return 0;
    const lh = dfs(node.left);
    if (lh === -1) return -1;
    const rh = dfs(node.right);
    if (rh === -1) return -1;
    if (Math.abs(lh - rh) > 1) return -1;
    return Math.max(lh, rh) + 1;
  };
  return dfs(root) !== -1;
}

/* ----------------------- Console log tests ----------------------- */

// Example 1 (note: given level-order corresponds to a skewed tree)
const t1 = buildTreeLevelOrder([1, null, 2, null, 3, null, 4, null, null]);
const b1 = balanceBST(t1);
console.log("Test1 balanced?", isBalanced(b1));

// Example 2
const t2 = buildTreeLevelOrder([2, 1, 3]);
const b2 = balanceBST(t2);
console.log("Test2 balanced?", isBalanced(b2));

// Example 3 (single node edge case)
const t3 = buildTreeLevelOrder([10]);
const b3 = balanceBST(t3);
console.log("Test3 balanced?", isBalanced(b3));
