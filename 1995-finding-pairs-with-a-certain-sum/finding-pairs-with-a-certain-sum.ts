// IOCE ready FindSumPairs implementation in TypeScript

class FindSumPairs {
    private nums1: number[];
    private nums2: number[];
    private freq2: Map<number, number>; // Frequency map for nums2

    /**
     * Initializes the object with nums1 and nums2.
     * @param nums1 - The first array of integers.
     * @param nums2 - The second array of integers.
     */
    constructor(nums1: number[], nums2: number[]) {
        this.nums1 = nums1;
        this.nums2 = nums2;
        this.freq2 = new Map();

        // Build initial frequency map for nums2
        for (let num of nums2) {
            this.freq2.set(num, (this.freq2.get(num) || 0) + 1);
        }
    }

    /**
     * Add val to nums2[index] and update the frequency map.
     * @param index - The index in nums2 to update.
     * @param val - The value to add to nums2[index].
     */
    add(index: number, val: number): void {
        const oldValue = this.nums2[index];
        const newValue = oldValue + val;

        // Update freq map: decrement old value
        this.freq2.set(oldValue, this.freq2.get(oldValue)! - 1);
        if (this.freq2.get(oldValue) === 0) {
            this.freq2.delete(oldValue);
        }
        // Add/increment new value
        this.freq2.set(newValue, (this.freq2.get(newValue) || 0) + 1);

        // Update nums2 itself
        this.nums2[index] = newValue;
    }

    /**
     * Count pairs (i, j) such that nums1[i] + nums2[j] == tot
     * @param tot - The target sum to count pairs for.
     * @returns The number of valid pairs.
     */
    count(tot: number): number {
        let answer = 0;
        for (let num1 of this.nums1) {
            // Find number of nums2[j] that make num1 + nums2[j] = tot
            let need = tot - num1;
            answer += this.freq2.get(need) || 0;
        }
        return answer;
    }
}

/* 
Example usage:
const findSumPairs = new FindSumPairs([1,1,2,2,2,3], [1,4,5,2,5,4]);
console.log(findSumPairs.count(7));  // Output: 8
findSumPairs.add(3, 2);              // Now nums2 = [1,4,5,4,5,4]
console.log(findSumPairs.count(8));  // Output: 2
console.log(findSumPairs.count(4));  // Output: 1
findSumPairs.add(0, 1);              // Now nums2 = [2,4,5,4,5,4]
findSumPairs.add(1, 1);              // Now nums2 = [2,5,5,4,5,4]
console.log(findSumPairs.count(7));  // Output: 11
*/