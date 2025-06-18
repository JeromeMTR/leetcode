function divideArray(nums: number[], k: number): number[][] {
    // Step 1: Sort the array so the closest numbers are grouped
    nums.sort((a, b) => a - b);
    const result: number[][] = [];

    // Step 2: Take elements 3 by 3
    for (let i = 0; i < nums.length; i += 3) {
        // Extract the group
        const triplet = [nums[i], nums[i+1], nums[i+2]];
        // Validate if this group satisfies the condition
        if (triplet[2] - triplet[0] > k) { // Only need to check max-min, since sorted
            return [];
        }
        result.push(triplet);
    }
    return result;
}