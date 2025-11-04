/**
 * For each window of length k, compute the x-sum as specified.
 * @param nums Input array
 * @param k Window size
 * @param x Top x most frequent elements to consider
 * @returns Array of x-sums per window
 */
function getXSum(nums: number[], k: number, x: number): number[] {
    const n = nums.length;
    const answer: number[] = [];
    
    // Slide window of size k from 0 to n-k
    for (let i = 0; i <= n - k; i++) {
        const window = nums.slice(i, i + k);

        // Count frequencies
        const freq = new Map<number, number>();
        for (const num of window) {
            freq.set(num, (freq.get(num) ?? 0) + 1);
        }

        // Create [num, count] pairs, sort by count desc, num desc
        const freqArr = Array.from(freq.entries());
        freqArr.sort((a, b) => {
            if (b[1] !== a[1]) return b[1] - a[1]; // By freq desc
            return b[0] - a[0];                    // Then by value desc
        });

        // Get top x numbers (as a Set for quick lookup)
        const topNums = new Set<number>();
        for (let j = 0; j < freqArr.length && j < x; j++) {
            topNums.add(freqArr[j][0]);
        }

        // Now sum only elements in the window that are in topNums
        let sum = 0;
        for (const num of window) {
            if (topNums.has(num)) {
                sum += num;
            }
        }
        answer.push(sum);
    }
    return answer;
}

// IOCE: Input Output Constraints & Examples

// Example 1
console.log(getXSum([1,1,2,2,3,4,2,3], 6, 2)); // [6,10,12]
// Example 2
console.log(getXSum([3,8,7,8,7,5], 2, 2));     // [11,15,15,15,12]

// Edge: all same numbers
console.log(getXSum([5,5,5,5,5,5], 4, 3));     // [20,20,20]
// Edge: x == 1
console.log(getXSum([3,3,4,4,5,5], 3, 1));     // [9,11,13,15]
// Edge: k == n
console.log(getXSum([1,2,3,4,5], 5, 2));       // [9]

// Edge: Distinct and x==k
console.log(getXSum([1,2,3,4,5], 3, 3));       // [6,9,12]