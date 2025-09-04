/**
 * Determines which person reaches the stationary person first on a number line.
 * @param x Person 1's position
 * @param y Person 2's position
 * @param z Person 3's position (stationary)
 * @returns 1 if Person 1 arrives first, 2 if Person 2 arrives first, 0 if tie.
 */
function whoArrivesFirst(x: number, y: number, z: number): number {
    // Calculate the absolute distance each person must travel to reach Person 3.
    const distance1 = Math.abs(x - z);
    const distance2 = Math.abs(y - z);

    // Compare the distances and determine the result.
    if (distance1 < distance2) {
        // Person 1 reaches first
        return 1;
    } else if (distance2 < distance1) {
        // Person 2 reaches first
        return 2;
    } else {
        // Both reach at the same time
        return 0;
    }
}