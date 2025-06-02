// IOCE

// Input:
// ratings: number[] - An array representing the ratings of n children.
//
// Output:
// number - The minimum total candies required.
//
// Constraints:
// - 1 <= n <= 2 * 10^4
// - 0 <= ratings[i] <= 2 * 10^4
//
// Examples:
// Example 1:
// Input: ratings = [1, 0, 2]
// Output: 5
// Explanation: [2,1,2]
//
// Example 2:
// Input: ratings = [1, 2, 2]
// Output: 4
// Explanation: [1,2,1]

// ---------- Solution Code Below ----------

/**
 * Calculates the minimum number of candies required to distribute
 * to children as per the ratings array.
 * 
 * @param ratings - The ratings of the children
 * @returns Minimum total candies required for valid distribution
 */
function candy(ratings: number[]): number {
    const n = ratings.length;
    // Each child gets at least 1 candy
    const candies: number[] = Array(n).fill(1);

    // Left to right: ensure right neighbor gets more
    for (let i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            candies[i] = candies[i - 1] + 1;
        }
    }

    // Right to left: ensure left neighbor gets more if needed
    for (let i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1] && candies[i] <= candies[i + 1]) {
            candies[i] = candies[i + 1] + 1;
        }
    }

    // Sum up all candies
    return candies.reduce((sum, c) => sum + c, 0);
}

// ---------- Test Cases ----------

console.log(candy([1, 0, 2])); // Output: 5
console.log(candy([1, 2, 2])); // Output: 4
console.log(candy([1, 3, 2, 2, 1])); // Output: 7
console.log(candy([1, 6, 10, 8, 7, 3, 2])); // Output: 18
console.log(candy([1])); // Output: 1

/*
    How does it work?
    - Initial pass ensures increasing sequences to the right get more candies.
    - Second pass ensures that decreasing sequences to the left get more candies if needed.
    - Both passes combined satisfy all constraints.
*/