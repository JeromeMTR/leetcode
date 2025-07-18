// Import MinHeap/MaxHeap implementation
class MinHeap {
    arr: number[];
    constructor() { this.arr = []; }
    push(val: number) {
        this.arr.push(val);
        let i = this.arr.length - 1;
        while (i > 0) {
            let p = Math.floor((i - 1) / 2);
            if (this.arr[p] <= this.arr[i]) break;
            [this.arr[p], this.arr[i]] = [this.arr[i], this.arr[p]];
            i = p;
        }
    }
    pop(): number {
        if (this.arr.length === 1) return this.arr.pop()!;
        let ret = this.arr[0];
        this.arr[0] = this.arr.pop()!;
        let i = 0, n = this.arr.length;
        while (2 * i + 1 < n) {
            let j = 2 * i + 1;
            if (j + 1 < n && this.arr[j + 1] < this.arr[j]) ++j;
            if (this.arr[i] <= this.arr[j]) break;
            [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
            i = j;
        }
        return ret;
    }
    top(): number { return this.arr[0]; }
    size(): number { return this.arr.length; }
}

class MaxHeap {
    arr: number[];
    constructor() { this.arr = []; }
    push(val: number) {
        this.arr.push(val);
        let i = this.arr.length - 1;
        while (i > 0) {
            let p = Math.floor((i - 1) / 2);
            if (this.arr[p] >= this.arr[i]) break;
            [this.arr[p], this.arr[i]] = [this.arr[i], this.arr[p]];
            i = p;
        }
    }
    pop(): number {
        if (this.arr.length === 1) return this.arr.pop()!;
        let ret = this.arr[0];
        this.arr[0] = this.arr.pop()!;
        let i = 0, n = this.arr.length;
        while (2 * i + 1 < n) {
            let j = 2 * i + 1;
            if (j + 1 < n && this.arr[j + 1] > this.arr[j]) ++j;
            if (this.arr[i] >= this.arr[j]) break;
            [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
            i = j;
        }
        return ret;
    }
    top(): number { return this.arr[0]; }
    size(): number { return this.arr.length; }
}

/**
 * Returns the minimal possible difference after removing n elements subsequence
 * @param nums 3*n array of positive integers
 * @returns difference (can be negative)
 */
function minimumDifference(nums: number[]): number {
    const n = Math.floor(nums.length / 3);

    // Build leftSum: for i in [n-1 .. 2n-1], leftSum[i] means the minimum total sum 
    // of n numbers from nums[0..i] (using the n smallest among them)
    let leftSum: number[] = Array(nums.length).fill(0);
    let maxHeap = new MaxHeap();
    let leftTotal = 0;
    for (let i = 0; i < nums.length; i++) {
        maxHeap.push(nums[i]);
        leftTotal += nums[i];
        if (maxHeap.size() > n) {
            leftTotal -= maxHeap.pop();
        }
        if (i >= n - 1) {
            leftSum[i] = leftTotal;
        }
    }

    // Build rightSum: for i in [2n .. n], rightSum[i] = maximum total sum of n numbers 
    // from nums[i .. end] (using the n largest among them)
    let rightSum: number[] = Array(nums.length).fill(0);
    let minHeap = new MinHeap();
    let rightTotal = 0;
    for (let i = nums.length - 1; i >= 0; i--) {
        minHeap.push(nums[i]);
        rightTotal += nums[i];
        if (minHeap.size() > n) {
            rightTotal -= minHeap.pop();
        }
        // Note: fill from the end, indices from n to 2n inclusive
        if (i <= 2 * n) {
            rightSum[i] = rightTotal;
        }
    }

    // For each split k in [n-1, 2n-1], the answer is leftSum[k] - rightSum[k+1]
    let answer = Infinity;
    for (let k = n - 1; k < 2 * n; k++) {
        answer = Math.min(answer, leftSum[k] - rightSum[k + 1]);
    }
    return answer;
}

/*
---- IOCE ----
Input: nums = [3,1,2]
minimumDifference(nums)
Output: -1

Input: nums = [7,9,5,8,1,3]
minimumDifference(nums)
Output: 1
*/