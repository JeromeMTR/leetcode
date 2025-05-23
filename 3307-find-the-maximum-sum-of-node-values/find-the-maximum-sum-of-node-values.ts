/**
 * Finds the maximum possible sum for the given tree after performing any number of XOR k operations as described.
 * 
 * @param nums - An array where nums[i] is the value of the i-th node.
 * @param k - The integer value used for XOR.
 * @param edges - The edges of the tree. (Unused: tree connectivity doesn't affect the ultimate togglability)
 * @returns The maximum sum possible after performing any number of XOR k operations.
 */
function maximumValueSum(nums: number[], k: number, edges: number[][]): number {
    // Calculate potential gain by toggling each node
    const deltas: number[] = [];
    let originalSum = 0;
    for (let num of nums) {
        originalSum += num;
        deltas.push((num ^ k) - num);
    }
    
    // Sort deltas (not strictly necessary, but helps in next step)
    deltas.sort((a, b) => b - a); // Largest gain first

    // Select maximum possible sum by toggling nodes with positive delta, 
    // with the constraint to select even number of toggles (parity of toggles must be even)
    let sum = originalSum;
    let positiveDeltas: number[] = deltas.filter(g => g > 0);
    let totalPositive = positiveDeltas.length;
    let sumPositive = positiveDeltas.reduce((acc, v) => acc + v, 0);

    if (totalPositive % 2 == 0) {
        // If even number of positive deltas, just add them all
        sum += sumPositive;
    } else {
        // If odd, have to drop the smallest positive delta to make the number even
        // (since edge toggling must affect even set of nodes)
        // But maybe it's better to swap a negative delta in, let's check:
        // Find minimum lost by dropping either smallest positive or swapping with biggest negative
        let minPositive = Math.min(...positiveDeltas);
        let maxNegative = Math.max(...deltas.filter(g => g <= 0), -Infinity);

        // Drop the smallest positive
        sum += (sumPositive - minPositive);

        // See if swapping in biggest negative works better (only if it exists)
        if (maxNegative !== -Infinity) {
            // Try replacing the dropped positive with the biggest negative
            let tryAlt = sumPositive - minPositive + maxNegative;
            sum = Math.max(sum, originalSum + tryAlt);
        }
    }
    return sum;
}