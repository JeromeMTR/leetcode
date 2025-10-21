function maxFrequency(nums: number[], k: number, numOperations: number): number {
    nums.sort((a, b) => a - b);

    let maxFreq = 1;
    let l = 0;
    let usedOps = 0;

    // For each new element at r, track how many numbers you need to change in range [l, r]
    for (let r = 0; r < nums.length; r++) {
        // Number of required changes for l...r to become nums[r]
        // Each time window increases, potentially more numbers to change (and larger numbers)

        // if amount to change exceeds what `k` can allow, slide left
        while (l < r && (nums[r] - nums[l]) > k && r - l > numOperations) {
            l++; // can't change enough numbers within k and numOperations limit
        }

        // Now, count how many numbers in [l, r] could be equal to nums[r]
        // With at most numOperations changes, so max window is r - l + 1, but can't change more than numOperations numbers.
        // Only numbers that can be reached by adding/subtracting <=k

        // count: numbers in current window (r-l+1)
        // of these, the maximum number we can "change" to nums[r] is numOperations
        // So maximum frequency is current count if less than or equal to numOperations+originals

        // We'll now do the real version, which for a sorted window,
        // for each right index r, try to group as many numbers as possible to nums[r],
        // but can only use numOperations changes, with each number able to be changed by up to k.

        // To do this efficiently:
        // Try all windows where (nums[r] - nums[l]) <= k
        // And size of window - numOriginalEquals <= numOperations
        // But simpler, for the current window: how many numbers are not nums[r] (thus need operation),
        // If this number > numOperations, slide l forward.

        // Actually, we can just process a sliding window:
        // For each window [l, r], the condition is:
        // (number of numbers that aren't originally nums[r]) <= numOperations
        // ... AND their difference is <= k
        // But maybe better is:
        // For elements in [l, r], can I change at most numOperations numbers (by at most k) so all are nums[r]?
        // So, for all elements in [l, r]:
        //     Need |nums[i] - nums[r]| <= k (otherwise can't change it)
        //     Among these, at most numOperations can actually be changed

        // So let's get freq: number of elements in [l, r] that can be made into nums[r] within k, and <= numOperations elements changed.

        // Or, for each possible target value (nums[r]), count the window [l, r] with all nums[i] within [nums[r]-k, nums[r]+k], window size should not exceed numOperations+the number of nums[r] itself.

        // We'll use a map to count the frequency in the window.
        // But since nums is sorted, just process window [l, r] where nums[r] - nums[l] <= k*2 (since can move k each way), but with only numOperations allowed.

        // Actually, let's do an easier approach:
        // For each possible x in nums, count numbers in window [l, r] such that |nums[i] - nums[r]| <= k, and window length - freq(nums[r]) <= numOperations

        // Let's try brute force sliding window by all possible l.
        // For each r:
        //   - Move left as small as possible while max operations required > numOperations, i.e. while we cannot bring enough numbers to nums[r] given k.
        //   - For sorted nums, we only need: numbers between [nums[r]-k, nums[r]+k] in the window (which is window size: r-l+1), but only up to numOperations could have been changed by at most k.
        // Our effective window is all numbers such that nums[r] - nums[l] <= k*2.
        // Let's try a direct solution:

        while (l < r && (nums[r] - nums[l] > k)) {
            l++;
        }
        let size = r - l + 1;
        // How many of these numbers are NOT already nums[r]? That's size - count of nums[r] in [l, r]
        let original = 0;
        for (let i = l; i <= r; i++) {
            if (nums[i] === nums[r]) original++;
        }
        // If at most numOperations can be changed, and the others are already nums[r], feasible
        if (size - original <= numOperations) {
            maxFreq = Math.max(maxFreq, size);
        }
    }

    return maxFreq;
}

/*
IOCE (Input/Output/Constraints/Examples):

Input: nums = [1,4,5], k = 1, numOperations = 2
Output: 2

Input: nums = [5,11,20,20], k = 5, numOperations = 1
Output: 2

Constraints:
- 1 <= nums.length <= 1e5
- 1 <= nums[i] <= 1e5
- 0 <= k <= 1e5
- 0 <= numOperations <= nums.length
*/

// === Test cases ===

console.log(maxFrequency([1,4,5], 1, 2));        // Expected: 2
console.log(maxFrequency([5,11,20,20], 5, 1));   // Expected: 2
console.log(maxFrequency([1,2,3], 2, 2));        // Expected: 3
console.log(maxFrequency([1,10,100], 90, 1));    // Expected: 2
console.log(maxFrequency([1], 100, 0));          // Expected: 1
console.log(maxFrequency([1,100000], 99999, 1)); // Expected: 2