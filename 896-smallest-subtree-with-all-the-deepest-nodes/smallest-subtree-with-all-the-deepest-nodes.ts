// Definition for a binary tree node.
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val);
        this.left = (left===undefined ? null : left);
        this.right = (right===undefined ? null : right);
    }
}

function subtreeWithAllDeepest(root: TreeNode | null): TreeNode | null {
    // Helper function to perform DFS and find the deepest depth and corresponding LCA
    function dfs(node: TreeNode | null, depth: number): [TreeNode | null, number] {
        if (node === null) return [null, depth];
        
        // Recursively get deepest node in left and right subtrees
        const [leftLCA, leftDepth] = dfs(node.left, depth + 1);
        const [rightLCA, rightDepth] = dfs(node.right, depth + 1);
        
        // If both sides have the same maximum depth, then this node is their LCA
        if (leftDepth === rightDepth) {
            return [node, leftDepth];
        }
        
        // Return the one which has greater depth
        return leftDepth > rightDepth ? [leftLCA, leftDepth] : [rightLCA, rightDepth];
    }
    
    return dfs(root, 0)[0];
}

// Test cases
const testCases: Array<{ input: TreeNode | null, output: number }> = [
    { 
        input: new TreeNode(3, 
                 new TreeNode(5, new TreeNode(6), new TreeNode(2, new TreeNode(7), new TreeNode(4))),
                 new TreeNode(1, new TreeNode(0), new TreeNode(8))),
        output: 2
    },
    {
        input: new TreeNode(1),
        output: 1
    },
    {
        input: new TreeNode(0, 
                 new TreeNode(1, null, new TreeNode(2)),
                 new TreeNode(3)),
        output: 2
    }
];

// Running test cases
testCases.forEach((test, index) => {
    const result = subtreeWithAllDeepest(test.input);
    console.log(`Test Case ${index + 1}: `, result?.val === test.output ? 'Passed' : 'Failed');
    if (result?.val !== test.output) {
        console.log(`    Expected ${test.output} but got ${result?.val}`);
    }
});