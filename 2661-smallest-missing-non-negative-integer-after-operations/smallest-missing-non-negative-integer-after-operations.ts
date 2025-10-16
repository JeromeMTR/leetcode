/**
 * Given an array nums and a value, returns the maximal achievable MEX after allowed operations.
 * @param nums Integer array (possibly negative/positive/de Dupes in range +/-1e9, length up to 1e5)
 * @param value The adjustment value (1 ≤ value ≤ 1e5)
 * @returns The maximal achievable MEX
 */
function findSmallestInteger(nums: number[], value: number): number {
    // freq[r]: number of elements in nums congruent to r mod value (0 ≤ r < value)
    const freq = new Array<number>(value).fill(0);

    // Count residue classes
    for (const num of nums) {
        // Normalize modulo to always get 0 <= r < value
        const r = ((num % value) + value) % value;
        freq[r]++;
    }

    // At mex = k, r = k % value; pointers = how many times each residue has been used.
    // We'll try to use up each residue in round-robin fashion according to mex=k.
    // The maximum MEX is when, for residue r=k%value, freq[r] is already used up.

    // pointers[r]: how many times residue r has been used
    const pointers = new Array<number>(value).fill(0);

    let mex = 0;
    while (true) {
        const r = mex % value;
        if (pointers[r] < freq[r]) {
            // We can cover this mex, use one more of residue r
            pointers[r]++;
            mex++;
        } else {
            // We've used all of this residue, cannot make this mex
            break;
        }
    }
    return mex;
}