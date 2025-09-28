/**
 * Function to find the largest perimeter of a valid triangle
 * @param nums Array of integers representing side lengths
 * @returns Largest possible perimeter, or 0 if not possible
 */
function largestPerimeter(nums: number[]): number {
    // Sort the array in descending order (largest to smallest)
    nums.sort((a, b) => b - a);

    // Loop over each possible triplet
    for (let i = 0; i < nums.length - 2; i++) {
        // Check if three consecutive sides can form a triangle
        if (nums[i] < nums[i + 1] + nums[i + 2]) {
            // Return their sum (perimeter)
            return nums[i] + nums[i + 1] + nums[i + 2];
        }
    }
    // No valid triangle found
    return 0;
}