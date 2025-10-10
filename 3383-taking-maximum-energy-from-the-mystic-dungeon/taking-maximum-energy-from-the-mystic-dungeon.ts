// Function to compute the maximum possible energy you can gain
function maxEnergy(energy: number[], k: number): number {
    const n = energy.length;
    let maxEnergy = -Infinity; // Will hold the maximum sum across all starts

    // Try each possible starting index (0 .. k-1)
    for (let start = 0; start < Math.min(k, n); ++start) {
        let sum = 0;
        // Jump from start, adding energy at each position
        for (let j = start; j < n; j += k) {
            sum += energy[j];
        }
        // Update maximum if this path is better
        if (sum > maxEnergy) {
            maxEnergy = sum;
        }
    }

    return maxEnergy;
}