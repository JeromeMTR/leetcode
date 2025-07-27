/**
 * Counts the number of hills and valleys in the array.
 * @param nums - input array of numbers
 * @returns number of hills and valleys
 */
function countHillValley(nums: number[]): number {
    // To group indices with equal adjacent values into one hill/valley,
    // first filter out consecutive duplicates
    const filtered: number[] = [];
    for (let i = 0; i < nums.length; ++i) {
        if (i === 0 || nums[i] !== nums[i - 1]) {
            filtered.push(nums[i]);
        }
    }

    let count = 0;
    // Iterate through filtered array, skipping first and last
    for (let i = 1; i < filtered.length - 1; ++i) {
        const prev = filtered[i - 1];
        const curr = filtered[i];
        const next = filtered[i + 1];
        // Check if current is a hill
        if (curr > prev && curr > next) {
            count++;
        }
        // Check if current is a valley
        else if (curr < prev && curr < next) {
            count++;
        }
        // else: not a hill/valley
    }

    return count;
}

// ========== Examples for Testing ==========

console.log(countHillValley([2,4,1,1,6,5])); // Output: 3
console.log(countHillValley([6,6,5,5,4,1])); // Output: 0
console.log(countHillValley([1,2,2,3,2,1,2,2,2,1])); // Output: 3

/* 
Explanation for [2,4,1,1,6,5]:
filtered = [2,4,1,6,5]
Check indices 1,2,3:
- i=1: 4>2&&4>1 => hill
- i=2: 1<4&&1<6 => valley
- i=3: 6>1&&6>5 => hill
Total: 3
*/