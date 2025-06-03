/**
 * Find the maximum number of candies that can be collected based on rules given boxes and contents.
 * @param status - Array indicating if boxes are open (1) or closed (0).
 * @param candies - Array of candies in each box.
 * @param keys - keys[i] is array of box labels whose keys are in box i.
 * @param containedBoxes - containedBoxes[i] is array of box labels found inside box i.
 * @param initialBoxes - List of boxes you start with.
 * @returns Maximum candies collectable.
 */
function maxCandies(
    status: number[],
    candies: number[],
    keys: number[][],
    containedBoxes: number[][],
    initialBoxes: number[]
): number {
    // Number of boxes
    const n = status.length;
    
    // Track if we have a box (found it or it was given)
    const hasBox = Array(n).fill(false);
    // Track if we have a key for each box
    const hasKey = Array(n).fill(false);
    // Track if we've already used (opened) a box
    const used = Array(n).fill(false);

    // Queue for boxes we can attempt to open
    const queue: number[] = [];

    // Add initial boxes to our state
    for (const box of initialBoxes) {
        hasBox[box] = true;
        // If box is open, we can try to open it now
        if (status[box] === 1) {
            queue.push(box);
            used[box] = true; // Mark as used right away so we don't add duplicates
        }
    }

    let totalCandies = 0;

    // Try to open closed boxes as we acquire their keys
    do {
        let madeProgress = false; // To check if we can make further progress

        // Process all boxes in queue (can open them)
        while (queue.length > 0) {
            const box = queue.shift()!;

            // Collect candies
            totalCandies += candies[box];

            // Collect keys found inside this box
            for (const key of keys[box]) {
                if (!hasKey[key]) {
                    hasKey[key] = true;
                    // If we already have the box, but haven't used it yet, and it's closed, now we can open it!
                    if (hasBox[key] && !used[key] && status[key] === 0) {
                        queue.push(key);
                        used[key] = true;
                    }
                }
            }

            // Collect boxes found inside this box
            for (const contained of containedBoxes[box]) {
                if (!hasBox[contained]) {
                    hasBox[contained] = true;
                    // If the box is open (or we have a key for it), try to open it
                    if (status[contained] === 1 || hasKey[contained]) {
                        if (!used[contained]) {
                            queue.push(contained);
                            used[contained] = true;
                        }
                    }
                }
            }
        }

        // Now check all boxes: do we have any closed box, that we have a key for, that we own, but haven't used yet?
        for (let i = 0; i < n; ++i) {
            if (hasBox[i] && hasKey[i] && !used[i]) {
                queue.push(i);
                used[i] = true;
                madeProgress = true;
            }
        }
    } while (queue.length > 0);

    return totalCandies;
}


// Example usages:
(() => {
    // Example 1
    const status1 = [1,0,1,0],
        candies1 = [7,5,4,100],
        keys1 = [[],[],[1],[]],
        containedBoxes1 = [[1,2],[3],[],[]],
        initialBoxes1 = [0];
    console.log(maxCandies(status1, candies1, keys1, containedBoxes1, initialBoxes1)); // Output: 16

    // Example 2
    const status2 = [1,0,0,0,0,0],
        candies2 = [1,1,1,1,1,1],
        keys2 = [[1,2,3,4,5],[],[],[],[],[]],
        containedBoxes2 = [[1,2,3,4,5],[],[],[],[],[]],
        initialBoxes2 = [0];
    console.log(maxCandies(status2, candies2, keys2, containedBoxes2, initialBoxes2)); // Output: 6
})();