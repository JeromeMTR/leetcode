/**
 * Function to calculate the minimum time needed to make the rope colorful.
 * @param colors - string of balloon colors.
 * @param neededTime - array of removal times for each balloon.
 * @returns Minimum total time to make the rope colorful.
 */
function minCost(colors: string, neededTime: number[]): number {
    let totalTime = 0;
    // Start from the second balloon and compare with previous
    for (let i = 1; i < colors.length; i++) {
        // If current and previous balloons are the same color
        if (colors[i] === colors[i - 1]) {
            // Remove the one with smaller neededTime
            if (neededTime[i] < neededTime[i - 1]) {
                // Remove current, add its time
                totalTime += neededTime[i];
                // no update needed for neededTime[i-1] since it is larger, keep it
            } else {
                // Remove previous, add its time
                totalTime += neededTime[i - 1];
                // Update neededTime[i] for comparison with next balloon
                neededTime[i] = neededTime[i];
            }
            // Always neededTime[i] = max(neededTime[i], neededTime[i-1]) for next iteration
            neededTime[i] = Math.max(neededTime[i], neededTime[i - 1]);
        }
    }
    return totalTime;
}

/* IOCE (Input, Output, Constraints, Example):

Input:
    colors: string, neededTime: number[]
    - Both arrays of same length (n)
    - 1 <= n <= 10^5
    - 1 <= neededTime[i] <= 10^4

Output:
    number: minimum time to remove balloons so no two consecutive same color

Constraints:
    - At most n=10^5 size, so linear O(n) solution needed

Example Usage (provided in problem):
*/

const testCases = [
    {
        colors: "abaac",
        neededTime: [1, 2, 3, 4, 5],
        expected: 3
    },
    {
        colors: "abc",
        neededTime: [1, 2, 3],
        expected: 0
    },
    {
        colors: "aabaa",
        neededTime: [1, 2, 3, 4, 1],
        expected: 2
    }
];

for (const { colors, neededTime, expected } of testCases) {
    const result = minCost(colors, neededTime.slice());
    console.log(`colors: ${colors}, neededTime: ${neededTime}`);
    console.log(`Expected: ${expected}, Got: ${result}`);
    console.log('---');
}