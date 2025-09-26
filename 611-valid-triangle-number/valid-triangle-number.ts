/**
 * Counts the number of valid triangle triplets in the array.
 * @param nums Array of positive integers (side lengths)
 * @returns Number of triplets that can form a triangle
 */
function triangleNumber(nums: number[]): number {
    // Sort the array to simplify the triangle condition check.
    nums.sort((a, b) => a - b);

    let n = nums.length;
    let count = 0;

    // Fix the largest side (c) at position k
    for (let k = n - 1; k >= 2; k--) {
        let i = 0, j = k - 1;

        // Use two-pointers for a, b
        while (i < j) {
            // If the sum of the two smaller sides is greater than nums[k], 
            // then all combinations from (i...j-1, j) are valid
            if (nums[i] + nums[j] > nums[k]) {
                count += (j - i);     // All pairs (i, j), (i+1, j)...(j-1, j) are valid
                j--;                  // Try next smaller b
            } else {
                i++;                  // Try next larger a
            }
        }
    }

    return count;
}

// --------- IOCE Example Usage & Testing ---------------

// Example 1:
console.log(triangleNumber([2,2,3,4])); // Output: 3

// Example 2:
console.log(triangleNumber([4,2,3,4])); // Output: 4

// More Tests:
console.log(triangleNumber([1,1,1,1])); // Output: 4 (four combinations)
console.log(triangleNumber([1,2,3]));   // Output: 0 (can't form any triangle)