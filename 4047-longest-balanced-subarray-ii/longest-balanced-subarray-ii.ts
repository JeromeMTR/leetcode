
/**
 * longetBalance Balanced Subarray II — IOCE
 *
 * Inputs:
 *  - nums: number[] — array of integers
 *
 * Outputs:
 *  - number — maximum length of a non-empty subarray where
 *    (#distinct even values) == (#distinct odd values)
 *
 * Constraints:
 *  - 1 <= nums.length <= 1e5
 *  - 1 <= nums[i] <= 1e5
 *
 * Edge Cases:
 *  - Single element → 0 (cannot be balanced non-empty)
 *  - All evens or all odds → 0
 *  - Duplicates change distinct sets, not frequencies
 *
 * Complexity Notes:
 *  - Optimal solution is non-trivial (likely persistent segment tree).
 *  - Current implementation is a simple approach suitable for small inputs.
 */

class Queue {
    private data: number[] = [];
    private head = 0;

    push(val: number): void {
        this.data.push(val);
    }

    pop(): number | undefined {
        if (this.isEmpty()) return undefined;
        const val = this.data[this.head];
        this.head++;
        // Memory optimization: reset array when head consumes half the space
        if (this.head > this.data.length >> 1) {
            this.data = this.data.slice(this.head);
            this.head = 0;
        }
        return val;
    }

    front(): number | undefined {
        return this.isEmpty() ? undefined : this.data[this.head];
    }

    size(): number {
        return this.data.length - this.head;
    }

    isEmpty(): boolean {
        return this.size() === 0;
    }
}
function longetBalance(nums: number[]): number {
    let maxLength = 0;
    let start = 0;

    // These sets will keep track of distinct numbers
    let evenSet = new Set<number>();
    let oddSet = new Set<number>();

    for (let end = 0; end < nums.length; end++) {
      const occurrences = new Map<number, Queue<number>>();
    const sgn = (x: number) => (x % 2 == 0 ? 1 : -1);

    let len = 0;
    const prefixSum: number[] = new Array(nums.length).fill(0);

    prefixSum[0] = sgn(nums[0]);
    if (!occurrences.has(nums[0])) occurrences.set(nums[0], new Queue());
    occurrences.get(nums[0])!.push(1);

    for (let i = 1; i < nums.length; i++) {
        prefixSum[i] = prefixSum[i - 1];
        if (!occurrences.has(nums[i])) occurrences.set(nums[i], new Queue());
        const occ = occurrences.get(nums[i])!;
        if (occ.size() === 0) {
            prefixSum[i] += sgn(nums[i]);
        }
        occ.push(i + 1);
    }

    const seg = new SegmentTree(prefixSum);

    for (let i = 0; i < nums.length; i++) {
        len = Math.max(len, seg.findLast(i + len, 0) - i);

        let nextPos = nums.length + 1;
        const occ = occurrences.get(nums[i])!;
        occ.pop();
        if (occ.size() > 0) {
            nextPos = occ.front();
        }

        seg.add(i + 1, nextPos - 1, -sgn(nums[i]));
        // Categorize the current number
        if (nums[end] % 2 === 0) {
            evenSet.add(nums[end]);
        } else {
            oddSet.add(nums[end]);
        }

        // Once we have a balanced setup, we calculate max length
        while (evenSet.size === oddSet.size) {
            maxLength = Math.max(maxLength, end - start + 1);

            // The next step is moving the start to check smaller windows
            // Remove the start element from the respective set
            if (nums[start] % 2 === 0) {
                evenSet.delete(nums[start]);
            } else {
                oddSet.delete(nums[start]);
            }
            // Move the starting point of the window
            start++;
        }
    }

    return maxLength;
}

// Test cases
console.log(longetBalance([2, 5, 4, 3])); // Output: 4
console.log(longetBalance([3, 2, 2, 5, 4])); // Output: 5
console.log(longetBalance([1, 2, 3, 2])); // Output: 3
console.log(longetBalance([1])); // Output: 0 (edge case, single element)
console.log(longetBalance([2, 2, 2, 2])); // Output: 0 (all even, unbalanced)
console.log(longetBalance([1, 1, 1, 1])); // Output: 0 (all odd, unbalanced)