function countInterestingSubarrays(nums: number[], modulo: number, k: number): number {
    // Edge cases
    if (nums.length === 0) return 0;

    // Hashmap to track the count of prefix sums having a particular remainder
    const remainderCountMap = new Map<number, number>();
    let currentRemainderSum = 0;
    let interestingCount = 0;

    // Initialize the map with a remainder of 0 to handle subarrays from the start
    remainderCountMap.set(0, 1);

    for (const num of nums) {
        // Check if the current number contributes to the count
        if (num % modulo === k) {
            currentRemainderSum += 1;
        }
        
        // Get remainder for the current prefix sum mod
        currentRemainderSum %= modulo;

        // Compute needed remainder
        const neededRemainder = (currentRemainderSum - k + modulo) % modulo;

        // Count how many times we have seen the needed remainder
        interestingCount += remainderCountMap.get(neededRemainder) || 0;

        // Update the map with the current remainder
        remainderCountMap.set(currentRemainderSum, (remainderCountMap.get(currentRemainderSum) || 0) + 1);
    }

    return interestingCount;
}

// Example Usage
console.log(countInterestingSubarrays([3, 2, 4], 2, 1)); // Output: 3
console.log(countInterestingSubarrays([3, 1, 9, 6], 3, 0)); // Output: 2