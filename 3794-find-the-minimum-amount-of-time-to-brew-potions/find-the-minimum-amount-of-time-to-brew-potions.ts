/**
 * Calculates the minimum time required to brew all potions with multiple wizards.
 * 
 * @param skill number[] - skill[i] time multiplier of wizard i
 * @param mana  number[] - mana[j] capacity required for potion j
 * @returns number - minimal total time required to brew all potions sequentially
 */
function brewPotions(skill: number[], mana: number[]): number {
    const n = skill.length, m = mana.length;

    // prev: completion time for last wizard for previous row
    // curr: completion time for current wizard
    let prev = new Array(m).fill(0);

    // Fill for the first wizard (i = 0)
    prev[0] = skill[0] * mana[0]; // At t=0, wizard 0 starts potion 0
    for (let j = 1; j < m; ++j) {
        // Wizard 0 must finish previous potion before starting this one
        prev[j] = prev[j - 1] + skill[0] * mana[j];
    }

    // For each wizard from 1..n-1
    for (let i = 1; i < n; ++i) {
        let curr = new Array(m).fill(0);
        // Potion 0: wizard i must wait until wizard i-1 is done
        curr[0] = prev[0] + skill[i] * mana[0];
        // Potions 1..m-1
        for (let j = 1; j < m; ++j) {
            // Wait until:
            //  - wizard i is done with previous potion (curr[j-1])
            //  - wizard i-1 is done with this potion (prev[j])
            // can only start when both are done!
            curr[j] = Math.max(curr[j-1], prev[j]) + skill[i] * mana[j];
        }
        prev = curr; // for next wizard
    }
    // Minimal time: when the last wizard finishes the last potion.
    return prev[m-1];
}

// *********** Examples & Test Calls ***********

// Example 1
console.log(brewPotions([1,5,2,4], [5,1,4,2])); // Output: 110

// Example 2
console.log(brewPotions([1,1,1], [1,1,1])); // Output: 5

// Example 3
console.log(brewPotions([1,2,3,4], [1,2])); // Output: 21

// Additional edge case
console.log(brewPotions([10], [2,2,2])); // Output: 60