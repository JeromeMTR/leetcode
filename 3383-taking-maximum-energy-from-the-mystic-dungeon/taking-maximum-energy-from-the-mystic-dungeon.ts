// Function to compute the maximum possible energy you can gain
function maxEnergy(energy: number[], k: number): number {
    const n = energy.length;
    let ans = -Number.MAX_SAFE_INTEGER;

    for (let i = n - k; i < n; i++) {
        let sum = 0;
        for (let j = i; j >= 0; j -= k) {
            sum += energy[j];
            ans = Math.max(ans, sum);
        }
    }
    return ans;
}