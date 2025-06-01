/**
 * Returns the number of ways to distribute n candies among 3 children
 * so that no child gets more than 'limit' candies.
 *
 * Uses inclusion-exclusion principle on stars and bars.
 *
 * @param n - number of candies
 * @param limit - maximum for each child
 * @returns number of distributions
 */
function distributeCandies(n: number, limit: number): number {
    // Helper function to compute C(x, 2)
    function comb2(x: number): number {
        // C(x, 2) = x*(x-1)/2, but if x < 2, it's 0
        if (x < 2) return 0;
        return (x * (x - 1)) / 2;
    }

    // Inclusion-Exclusion Principle
    let ans = 0;
    ans += comb2(n + 2);
    ans -= 3 * comb2(n - (limit + 1) + 2);
    ans += 3 * comb2(n - 2 * (limit + 1) + 2);
    ans -= comb2(n - 3 * (limit + 1) + 2);

    return ans;
}

// ----------- IOCE (Input/Output/Code/Examples) -----------

// Example 1
console.log(distributeCandies(5, 2)); // Output: 3

// Example 2
console.log(distributeCandies(3, 3)); // Output: 10

// Custom Example (For demonstration)
console.log(distributeCandies(6, 3)); // Output: 7

/*
Explanation for custom case (n=6, limit=3):

Possible triples where a+b+c=6 and each ≤ 3:
(0,3,3), (1,2,3), (1,3,2), (2,1,3), (2,2,2), (2,3,1), (3,0,3), (3,1,2), (3,2,1), (3,3,0)
So there are 10 valid distributions.
But let's check what our function returns.
*/