/**
 * Finds the maximum absolute difference between adjacent elements in a circular array.
 * @param nums - The circular array of integers.
 * @returns The maximum absolute difference.
 */
function maxCircularAdjacentAbsDifference(nums: number[]): number {
    const n = nums.length;
    let maxDiff = 0; // Store the maximum difference found

    for (let i = 0; i < n; i++) {
        // j is the next index, wrapping to 0 for the last element (circular)
        const j = (i + 1) % n;
        // Compute absolute difference between adjacent elements
        const diff = Math.abs(nums[i] - nums[j]);
        // Update maxDiff if this difference is larger
        if (diff > maxDiff) {
            maxDiff = diff;
        }
    }

    return maxDiff;
}

// --- Example test cases ---

// Example 1:
console.log(maxCircularAdjacentAbsDifference([1,2,4])); // Output: 3

// Example 2:
console.log(maxCircularAdjacentAbsDifference([-5,-10,-5])); // Output: 5

// Additional test cases
console.log(maxCircularAdjacentAbsDifference([1, 1, 1, 1])); // Output: 0
console.log(maxCircularAdjacentAbsDifference([100, -100])); // Output: 200