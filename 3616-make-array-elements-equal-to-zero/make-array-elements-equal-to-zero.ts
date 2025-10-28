function countValidSelections(nums: number[]): number {
    // Directions: left (-1), right (+1)
    const dirs = [-1, 1];

    let n = nums.length;
    let validSelections = 0;

    // Try every starting position curr where nums[curr] == 0
    for (let curr = 0; curr < n; curr++) {
        if (nums[curr] !== 0) continue;
        for (let dir of dirs) {
            // Make a copy to simulate modifications
            let arr = nums.slice();
            // Start at curr position, with direction dir
            let pos = curr;
            let d = dir;

            while (pos >= 0 && pos < n) {
                if (arr[pos] === 0) {
                    // step forward in current direction
                    pos += d;
                } else {
                    // arr[pos] > 0: decrement, flip, step in new dir
                    arr[pos]--;
                    d = -d;
                    pos += d;
                }
            }
            // After finishing, check if all arr are 0
            if (arr.every(x => x === 0)) {
                validSelections++;
            }
        }
    }

    return validSelections;
}

/* IOCE - Examples */

// Example 1
console.log(countValidSelections([1,0,2,0,3])); // Expected: 2

// Example 2
console.log(countValidSelections([2,3,4,0,4,1,0])); // Expected: 0

// Edge test: all zeros, every start and both dirs are valid
console.log(countValidSelections([0,0,0])); // Expected: 6 (3 positions * 2 dirs)

// Edge test: only one zero, not possible
console.log(countValidSelections([1,2,0,2,1])); // Expected: 0

// Edge test: larger ex
console.log(countValidSelections([1,0,1])); // Expected: 2 (start at 1 left or right)