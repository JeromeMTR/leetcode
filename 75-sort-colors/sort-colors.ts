/**
 * Sorts the array nums in-place so that all 0's come first, then all 1's, then all 2's.
 * Uses the Dutch National Flag algorithm (one-pass, constant space).
 * @param nums number[] - The array of colors represented by 0,1,2
 * @returns void (modifies nums in-place)
 */
function sortColors(nums: number[]): void {
    // Initialize pointers
    let low = 0;               // Left boundary for 0's
    let mid = 0;               // Current element
    let high = nums.length - 1; // Right boundary for 2's

    // Traverse the array
    while (mid <= high) {
        if (nums[mid] === 0) {
            // Swap nums[low] and nums[mid] and move both forward
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++;
            mid++;
        } else if (nums[mid] === 1) {
            // 1's are in the correct place
            mid++;
        } else {
            // nums[mid] === 2
            // Swap nums[mid] and nums[high] and decrease high
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
            // Note: do NOT increment mid here, as the new nums[mid] needs to be checked
        }
    }
}