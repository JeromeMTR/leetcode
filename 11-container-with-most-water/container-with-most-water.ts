function maxArea(height: number[]): number {
    // Initialize two pointers: left at 0 and right at the last index
    let left = 0;
    let right = height.length - 1;
    let maxArea = 0;

    // Continue until the two pointers meet
    while (left < right) {
        // Area is limited by the shorter height and the width between the pointers
        const width = right - left;
        const minHeight = Math.min(height[left], height[right]);
        const area = width * minHeight;

        // Update maximum area if this area is larger
        maxArea = Math.max(maxArea, area);

        // Move the pointer pointing to the shorter line inward,
        // as moving the taller line cannot increase the area
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxArea;
}