/**
 * Problem: Tree DP + 0/1 Knapsack with "activation" effect (discount if parent picked).
 * We process DP per subtree, for each subtree root, and for each possible budget,
 * we track the max profit, depending on whether parent was included or not.
 */

function maxProfit(
    n: number,
    present: number[],
    future: number[],
    hierarchy: number[][],
    budget: number
): number {
    // Build the tree adjacency list
    const tree: number[][] = Array.from({ length: n }, () => []);
    const parent: number[] = Array(n).fill(-1);
    for (const [u, v] of hierarchy) {
        tree[u - 1].push(v - 1);
        parent[v - 1] = u - 1;
    }

    /**
     * Subtree DP
     * dp[u][p][b]: for subtree rooted at u, p == 1 if parent buys, p==0 otherwise,
     * and using budget b, what's the max profit
     */
    function dfs(u: number): number[][] {
        // dp[0][b]: max profit if parent does not buy u's stock, with budget b
        // dp[1][b]: max profit if parent *does* buy u's stock, with budget b (so u gets discount)
        const dp: number[][] = [
            Array(budget + 1).fill(0),
            Array(budget + 1).fill(0),
        ];

        // First, prepare the two options for the current node:
        // Option 1: don't buy u's stock
        // (optionally combine children subproblems)
        let baseNoBuy = Array(budget + 1).fill(0);
        let baseBuy = Array(budget + 1).fill(0);

        // Option 2: buy u's stock, at full price if parent hasn't bought,
        // or discounted price if parent has bought.
        // Since we use Knapsack DP, we "merge" children's DP using typical 0/1 knapsack combining.

        // We'll initialize for both cases (parent does not buy, parent does buy)
        // Initial for "no children": no profit, budget as given (the value if don't buy)
        for (let b = 0; b <= budget; ++b) {
            baseNoBuy[b] = 0;
            baseBuy[b] = 0;
        }

        // For each child, recursively get its DP arrays and knapsack-merge
        for (const v of tree[u]) {
            const childDP = dfs(v);

            // For "not buy current node": We can mix the 0-parent row of child (since parent of child is not bought)
            // Merge baseNoBuy with childDP[0]
            const newBaseNoBuy = Array(budget + 1).fill(0);
            for (let b = 0; b <= budget; ++b) {
                for (let cb = 0; cb <= b; ++cb) {
                    newBaseNoBuy[b] = Math.max(
                        newBaseNoBuy[b],
                        baseNoBuy[b - cb] + childDP[0][cb]
                    );
                }
            }
            baseNoBuy = newBaseNoBuy;

            // For "do buy current node": now, each child (parent has bought), use childDP[1]
            const newBaseBuy = Array(budget + 1).fill(0);
            for (let b = 0; b <= budget; ++b) {
                for (let cb = 0; cb <= b; ++cb) {
                    newBaseBuy[b] = Math.max(
                        newBaseBuy[b],
                        baseBuy[b - cb] + childDP[1][cb]
                    );
                }
            }
            baseBuy = newBaseBuy;
        }

        // Now, at node u, fill dp[0][b] and dp[1][b]
        // Case 1: parent did NOT buy u's stock -> we can choose to:
        //    a) skip buying u: profit = baseNoBuy
        //    b) buy u at present[u]: profit = (future[u]-present[u]) + baseBuy (this is with parent bought = true for children)
        for (let b = 0; b <= budget; ++b) {
            // Option 1: don't buy current node
            dp[0][b] = baseNoBuy[b];
            // Option 2: buy current node (only if enough budget)
            if (present[u] <= b) {
                // The profit if buy u at full price, plus children's best with parent bought
                dp[0][b] = Math.max(
                    dp[0][b],
                    future[u] - present[u] + baseBuy[b - present[u]]
                );
            }
        }

        // Case 2: parent DID buy this node's boss -> discount
        for (let b = 0; b <= budget; ++b) {
            // Option 1: don't buy current node
            dp[1][b] = baseNoBuy[b];
            // Option 2: buy current node at discount
            const discountCost = Math.floor(present[u] / 2);
            if (discountCost <= b) {
                dp[1][b] = Math.max(
                    dp[1][b],
                    future[u] - discountCost + baseBuy[b - discountCost]
                );
            }
        }

        return dp;
    }

    // Employee 1 is root, and has no boss, so parent hasn't bought for root.
    const dpRoot = dfs(0);

    // We can choose any budget <= budget and best profit is dpRoot[0][b]
    let maxProfit = 0;
    for (let b = 0; b <= budget; ++b) {
        maxProfit = Math.max(maxProfit, dpRoot[0][b]);
    }
    return maxProfit;
}

/* IOCE (Input/Output/Corner/Example)
Example 1:
maxProfit(
    2, [1,2], [4,3], [[1,2]], 3
); // Output: 5

Example 2:
maxProfit(
    2, [3,4], [5,8], [[1,2]], 4
); // Output: 4

Example 3:
maxProfit(
    3, [4,6,8], [7,9,11], [[1,2],[1,3]], 10
); // Output: 10

Example 4:
maxProfit(
    3, [5,2,3], [8,5,6], [[1,2],[2,3]], 7
); // Output: 12
*/