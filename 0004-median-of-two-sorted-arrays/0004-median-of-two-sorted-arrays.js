/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    // i: 2 number arrays that are sorted
    // o: median of the 2 arrays when merged
    // c: find a solution and then optimize
    // e: what to do when arrays are not the same length
    // assume that both arrays are sorted
    // if arrays are emtpy what do we return
    if (nums1.length < 1 && nums2.length < 1) return 0
    let mergedArr = [];
    // merge both arrays
    let i = 0,
        j = 0;
    while (i < nums1.length && j < nums2.length ) {
        // get current element for both arrays
        let curVal1 = nums1[i],
            curVal2 = nums2[j];
        if (curVal1 < curVal2) {
            mergedArr.push(nums1[i])
            i++;
        } else {
            mergedArr.push(nums2[j]);
            j++;
        }
    }
    while (i < nums1.length) {
        mergedArr.push(nums1[i])
        i++;
    }
    while (j < nums2.length) {
        mergedArr.push(nums2[j])
        j++;
    }
    console.log(mergedArr)
    let half;
    if (mergedArr.length % 2 === 0) {
        half = mergedArr.length/2 - 1;
        let median = (mergedArr[half] + mergedArr[half + 1]) / 2;
        return median;
    } else {
        half = Math.floor(mergedArr.length/2);
        return mergedArr[half];
    }
};