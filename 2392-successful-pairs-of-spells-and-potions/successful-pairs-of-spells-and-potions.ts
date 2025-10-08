/**
 * Returns an array with the number of successful pairs for each spell
 * 
 * @param spells Array of spell strengths
 * @param potions Array of potion strengths
 * @param success Required product threshold
 * @returns Number of successful potions for each spell
 */
function successfulPairs(spells: number[], potions: number[], success: number): number[] {
    // First, sort the potions array ascending for binary search
    potions.sort((a, b) => a - b);

    // Helper: Returns the first index in potions where potion * spell >= success
    function binarySearch(threshold: number): number {
        let left = 0, right = potions.length;
        while (left < right) {
            const mid = (left + right) >> 1;
            if (potions[mid] < threshold) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }

    // For each spell, compute the minimum potion threshold & find index
    return spells.map(spell => {
        // Calculate minimum potion value using Math.ceil. Avoid floating point!
        // threshold = (success + spell - 1) // spell
        const threshold = Math.ceil(success / spell);
        const idx = binarySearch(threshold);
        return potions.length - idx;
    });
}

// ----- Example usage (for IOCE) -----
const spells1 = [5,1,3];
const potions1 = [1,2,3,4,5];
const success1 = 7;
console.log(successfulPairs(spells1, potions1, success1)); // [4,0,3]

const spells2 = [3,1,2];
const potions2 = [8,5,8];
const success2 = 16;
console.log(successfulPairs(spells2, potions2, success2)); // [2,0,2]