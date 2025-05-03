/**
 * Function to find the minimum number of rotations needed to make all values in tops or bottoms the same.
 * 
 * @param tops - Array of numbers representing the top half of each domino
 * @param bottoms - Array of numbers representing the bottom half of each domino
 * @returns Minimum number of rotations needed, or -1 if not possible
 */
function minDominoRotations(tops: number[], bottoms: number[]): number {
    // Define a helper function to calculate the minimum rotations for a target number
    function check(target: number): number {
        let rotationsA = 0;
        let rotationsB = 0;
        for (let i = 0; i < tops.length; i++) {
            if (tops[i] !== target && bottoms[i] !== target) {
                return -1; // If neither side can be made into the target, it's impossible
            } else if (tops[i] !== target) {
                rotationsA++; // tops[i] needs to be swapped
            } else if (bottoms[i] !== target) {
                rotationsB++; // bottoms[i] needs to be swapped
            }
        }
        return Math.min(rotationsA, rotationsB); // Choose the side with the minimum rotations
    }
    
    // Try to make all elements the same using the value of tops[0] or bottoms[0] as the target
    const rotations = check(tops[0]);
    if (rotations !== -1 || tops[0] === bottoms[0]) {
        return rotations;
    } else {
        return check(bottoms[0]);
    }
}

// IOCE

// Input: Tops and bottoms arrays representing domino halves
// Examples:
console.log(minDominoRotations([2,1,2,4,2,2], [5,2,6,2,3,2])); // Output: 2 - Rotate 2nd and 4th dominoes.
console.log(minDominoRotations([3,5,1,2,3], [3,6,3,3,4]));     // Output: -1 - Impossible to make rows uniform.
console.log(minDominoRotations([1,1,1,1], [1,2,3,4]));         // Output: 0 - Already uniform.
console.log(minDominoRotations([1,2,1,3], [2,1,2,4]));         // Output: 1 - Rotate 1st or 3rd.
console.log(minDominoRotations([1,1,1,1], [1,1,1,1]));         // Output: 0 - Already uniform.

// Constraints:
// - 2 <= tops.length <= 2 * 10^4
// - bottoms.length == tops.length
// - 1 <= tops[i], bottoms[i] <= 6