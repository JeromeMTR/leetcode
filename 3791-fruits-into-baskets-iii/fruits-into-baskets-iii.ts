/**
 * Returns the number of fruit types that remain unplaced after allocation.
 *
 * @param fruits - array representing quantity of each fruit type.
 * @param baskets - baskets' capacities.
 * @returns Number of unplaced fruit types.
 */
function unplacedFruits(fruits: number[], baskets: number[]): number {
    const n = fruits.length;
    // Track whether each basket is used
    const used = new Array(n).fill(false);

    // For each fruit, try to place in the leftmost available basket
    let unplaced = 0;
    let basketIdx = 0; // basket scanning pointer

    for (let i = 0; i < n; i++) {
        // Start from the beginning for each fruit
        let placed = false;
        for (let j = 0; j < n; j++) {
            if (!used[j] && baskets[j] >= fruits[i]) {
                // Place fruit i in basket j
                used[j] = true;
                placed = true;
                break; // Next fruit
            }
        }
        if (!placed) {
            unplaced++;
        }
    }
    return unplaced;
}