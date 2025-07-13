/**
 * Returns the maximum number of player-trainer matchings.
 * 
 * @param players - Abilities of the players
 * @param trainers - Capacities of the trainers
 * @returns Maximum possible matchings
 */
function matchPlayersAndTrainers(players: number[], trainers: number[]): number {
    // Sort both arrays: players (ascending), trainers (ascending)
    players.sort((a, b) => a - b);
    trainers.sort((a, b) => a - b);

    let i = 0; // pointer for players
    let j = 0; // pointer for trainers
    let matches = 0;

    // Try to match each player to a suitable trainer
    while (i < players.length && j < trainers.length) {
        if (players[i] <= trainers[j]) {
            // Found a match for player i with trainer j
            matches++;
            i++;
            j++;
        } else {
            // Trainer j is too weak, try next trainer
            j++;
        }
    }

    return matches;
}

// ----- Example Usage & Tests -----
console.log(matchPlayersAndTrainers([4,7,9], [8,2,5,8])); // Output: 2
console.log(matchPlayersAndTrainers([1,1,1], [10]));      // Output: 1
console.log(matchPlayersAndTrainers([3,5,6], [3,3,3]));   // Output: 1
console.log(matchPlayersAndTrainers([2,2,2], [1,1,1]));   // Output: 0