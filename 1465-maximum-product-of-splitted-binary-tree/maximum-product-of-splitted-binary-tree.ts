/**
 * Maximum Product of Splitted Binary Tree (LeetCode 1339)
 *
 * IOCE:
 * Input: root (binary tree)
 * Output: maximum product of sums after removing exactly one edge, modulo 1e9+7
 * Constraints: up to 5e4 nodes, values up to 1e4
 *
 * Approach:
 * 1) Compute total sum of the whole tree.
 * 2) Compute every subtree sum; for each subtree sum s, consider cutting the edge above it:
 *      product = s * (totalSum - s)
 *    Track the maximum product BEFORE modulo.
 *
 * Important:
 * - Use BigInt for sums/products to avoid precision issues in JS number.
 * - Maximize before taking modulo.
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

function maxProduct(root: TreeNode | null): number {
  const MOD = 1000000007n;
  if (!root) return 0;

  // First DFS: compute total sum of the tree.
  const totalSum = dfsSum(root);

  // Second DFS: compute subtree sums and maximize product.
  let best = 0n;
  dfsSub(root);

  return Number(best % MOD);

  function dfsSum(node: TreeNode | null): bigint {
    if (!node) return 0n;
    return BigInt(node.val) + dfsSum(node.left) + dfsSum(node.right);
  }

  function dfsSub(node: TreeNode | null): bigint {
    if (!node) return 0n;

    const leftSum = dfsSub(node.left);
    const rightSum = dfsSub(node.right);
    const subSum = BigInt(node.val) + leftSum + rightSum;

    // Consider cutting the edge above this subtree (except the whole tree root,
    // but for root it yields product 0 so it won't affect best).
    const other = totalSum - subSum;
    const prod = subSum * other;
    if (prod > best) best = prod;

    return subSum;
  }
}