// Function to get the maximum points by removing "ab" and "ba" substrings optimally
function maximumGain(s: string, x: number, y: number): number {
    // Helper function to remove pattern from string, return points and new string
    function removePattern(s: string, first: string, second: string, score: number): [number, string] {
        let stack: string[] = [];
        let points = 0;
        for (let c of s) {
            // If the previous character in stack + this one makes the required pattern, pop and add score
            if (stack.length > 0 && stack[stack.length - 1] === first && c === second) {
                stack.pop();
                points += score;
            } else {
                stack.push(c);
            }
        }
        return [points, stack.join('')];
    }

    let totalPoints = 0;

    // Prioritize higher scoring substring for removal
    if (x >= y) {
        // Remove all "ab" first, then "ba"
        let [pointsAb, rest] = removePattern(s, 'a', 'b', x);
        let [pointsBa, _] = removePattern(rest, 'b', 'a', y);
        totalPoints = pointsAb + pointsBa;
    } else {
        // Remove all "ba" first, then "ab"
        let [pointsBa, rest] = removePattern(s, 'b', 'a', y);
        let [pointsAb, _] = removePattern(rest, 'a', 'b', x);
        totalPoints = pointsBa + pointsAb;
    }

    return totalPoints;
}

/* IOCE: Input/Output/Corner/Examples */

// Example 1
console.log(maximumGain("cdbcbbaaabab", 4, 5)); // Output: 19

// Example 2
console.log(maximumGain("aabbaaxybbaabb", 5, 4)); // Output: 20

// Corner: All "ab" and no "ba"
console.log(maximumGain("abababab", 5, 1)); // Output: 20

// Corner: All "ba" and no "ab"
console.log(maximumGain("babababa", 2, 4)); // Output: 16

// Corner: String without "ab" or "ba"
console.log(maximumGain("cccccc", 10, 10)); // Output: 0

// Corner: x equals y
console.log(maximumGain("abba", 3, 3)); // Output: 6

/*
Explanation: 
- Approach processes first the higher value pattern greedily, accumulates points, 
then processes the remaining for the next pattern, maximizing total gain.
*/