function minEqualSum(nums1: number[], nums2: number[]): number {
    let sum1 = 0,
        sum2 = 0;
    let zero1 = 0,
        zero2 = 0;

    for (let i of nums1) {
        sum1 += i;
        if (i === 0) {
            sum1++;
            zero1++;
        }
    }

    for (let i of nums2) {
        sum2 += i;
        if (i === 0) {
            sum2++;
            zero2++;
        }
    }

    if ((zero1 === 0 && sum2 > sum1) || (zero2 === 0 && sum1 > sum2)) {
        return -1;
    }

    return Math.max(sum1, sum2);
}

// Example usage:
const nums1Example1 = [3, 2, 0, 1, 0];
const nums2Example1 = [6, 5, 0];
console.log(minEqualSum(nums1Example1, nums2Example1)); // Output: 12

const nums1Example2 = [2, 0, 2, 0];
const nums2Example2 = [1, 4];
console.log(minEqualSum(nums1Example2, nums2Example2)); // Output: -1