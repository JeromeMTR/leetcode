function partitionArray(nums: number[], k: number): number {
    // Sort the input array, as we want to group close numbers together
    nums.sort((a, b) => a - b);
    
    let groups = 0; // To count min number of groups
    let i = 0;
    const n = nums.length;

    while (i < n) {
        groups++; // Start a new group
        // The minimum in this group is nums[i]
        // Try to include as many as possible in this group
        let groupMin = nums[i];
        // Move j forward while numbers are within groupMin+k
        while (i < n && nums[i] - groupMin <= k) {
            i++;
        }
        // When loop finishes, i is at first element NOT in this group
    }
    return groups;
}