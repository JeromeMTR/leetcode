/**
 * Calculates the difference between the maximum and minimum number
 * formed by remapping all occurrences of exactly one digit in num
 * to any other digit (possibly itself).
 * 
 * @param num The input number.
 * @returns The maximum possible difference by such a remapping.
 */
function maxMinDifference(num: number): number {
    // Convert num to string for easy manipulation
    const numStr = num.toString();
    
    let maxVal = Number.NEGATIVE_INFINITY; // Start with very small number
    let minVal = Number.POSITIVE_INFINITY; // Start with very big number

    // Try remapping every digit d1 (0..9) to every digit d2 (0..9)
    for (let d1 = 0; d1 <= 9; d1++) {
        for (let d2 = 0; d2 <= 9; d2++) {
            // Skip remapping to self (it's allowed by the rules, but for max and min effect we can skip, will be covered)
            // Actually, don't skip: remapping digit to itself is valid and sometimes optimal (if all digits are already max or min)
            // But, if d1 is not in numStr, remapping is moot, as num doesn't change; still, need to consider.

            // Replace all occurrences of d1 with d2
            const remapped = numStr.split('').map(char =>
                char === d1.toString() ? d2.toString() : char
            ).join('');

            // Convert back to number
            const val = parseInt(remapped, 10);

            // Update max and min accordingly
            maxVal = Math.max(maxVal, val);
            minVal = Math.min(minVal, val);
        }
    }

    // Return the difference
    return maxVal - minVal;
}