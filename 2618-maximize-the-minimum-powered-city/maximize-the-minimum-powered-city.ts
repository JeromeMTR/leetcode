// TypeScript Solution

/**
 * Function to determine the maximum possible minimum power
 * @param stations - number of stations in each city
 * @param r        - supply radius
 * @param k        - max new stations we can add
 * @returns max possible minimum power across all cities after optimal addition
 */

// IOCE: Input/Output Constraints and Examples
// Example1:
// Input: stations = [1,2,4,5,0], r = 1, k = 2
// Output: 5
// Example2:
// Input: stations = [4,4,4,4], r = 0, k = 3
// Output: 4

function maxPowerMin(
    stations: number[], 
    r: number, 
    k: number
): number {
    const n = stations.length;

    // Helper: is it possible for every city to have at least 'minRequired' power?
    function canReach(minRequired: number): boolean {
        let usedK = 0; // How many new stations used
        const add: number[] = Array(n).fill(0); // Additional stations added at each position
        let windowSum = 0;                      // Current window sum for city i

        // Initialize the first window [0, r*2] for city 0
        for (let i = 0; i < Math.min(n, r); ++i) {
            windowSum += stations[i];
        }

        for (let i = 0; i < n; ++i) {
            if (i + r < n) {
                windowSum += stations[i + r];
            }
            if (i - r - 1 >= 0) {
                windowSum -= stations[i - r - 1];
            }
            // Include the effect of what we've added at relevant positions
            if (i + r < n) {
                windowSum += add[i + r];
            }
            if (i - r - 1 >= 0) {
                windowSum -= add[i - r - 1];
            }

            // If underpowered, need to install more stations
            if (windowSum < minRequired) {
                // Where's the rightmost city covered by i? i+r
                let pos = Math.min(n - 1, i + r);
                let need = minRequired - windowSum;

                usedK += need;
                if (usedK > k) return false;
                add[pos] += need;
                windowSum += need;
            }
        }
        return true;
    }

    // Binary Search for the answer
    // The minimum possible is min(stations), max possible is sum(stations) + k
    let left = 0, right = stations.reduce((a, b) => a + b, 0) + k;

    while (left < right) {
        let mid = Math.floor((left + right + 1) / 2);
        if (canReach(mid)) {
            left = mid; // can do at least 'mid'
        } else {
            right = mid - 1;
        }
    }

    return left;
}

// --- Examples / Tests ---
console.log(maxPowerMin([1,2,4,5,0], 1, 2)) // 5
console.log(maxPowerMin([4,4,4,4], 0, 3))   // 4

// INPUT/OUTPUT
// Input: stations: number[], r: number, k: number
// Output: number (the maximum minimum power possible)