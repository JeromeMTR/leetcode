/**
 * Returns the earliest and latest rounds in which firstPlayer and secondPlayer meet in the tournament.
 * 
 * @param n Number of players
 * @param firstPlayer Player number of the first best player
 * @param secondPlayer Player number of the second best player
 * @returns [earliest round, latest round]
 */
function earliestAndLatest(n: number, firstPlayer: number, secondPlayer: number): number[] {
    // Ensure firstPlayer < secondPlayer for easier handling
    let a = Math.min(firstPlayer, secondPlayer);
    let b = Math.max(firstPlayer, secondPlayer);

    // Memoization to prevent redundant computation: key = players as string + round
    const memo = new Map<string, [number, number]>();

    /**
     * Recursively search all possible outcomes (min/max round) for the current set of players.
     * @param players Current round's players in their original order
     * @param round Current round number (1-based)
     * @returns [earliest, latest] in which a and b meet from this situation
     */
    function dfs(players: number[], round: number): [number, number] {
        // If already memoized, return that result
        let key = players.join(',') + ':' + round;
        if (memo.has(key)) return memo.get(key)!;

        let N = players.length;
        // Find their current positions in the row
        let idxA = players.indexOf(a);
        let idxB = players.indexOf(b);

        // If they are paired this round, return [round, round]
        // i-th vs (N-1-i)-th, i in [0, Math.floor(N/2))
        for (let i = 0; i < Math.floor(N / 2); ++i) {
            let j = N - 1 - i;
            if ([idxA, idxB].includes(i) && [idxA, idxB].includes(j)) {
                return [round, round];
            }
        }

        // Build all possible next rounds (by choosing who wins in each match except (a,b))
        // For each match, collect possible winner choices
        let nextStates: number[][] = [[]]; // array of possible next rounds

        for (let i = 0; i < Math.floor(N / 2); ++i) {
            let left = players[i], right = players[N - 1 - i];
            // If either is a or b, always they win
            if (left === a || left === b) {
                nextStates.forEach(arr => arr.push(left));
            } else if (right === a || right === b) {
                nextStates.forEach(arr => arr.push(right));
            } else {
                // Both are "random", can choose winner: double the states
                let newStates: number[][] = [];
                for (let arr of nextStates) {
                    newStates.push([...arr, left]);
                    newStates.push([...arr, right]);
                }
                nextStates = newStates;
            }
        }
        // Odd number of players: middle advances automatically
        if (N % 2 === 1) {
            let mid = players[Math.floor(N / 2)];
            nextStates.forEach(arr => arr.push(mid));
        }

        // After each, sort by original label to restore row
        let earliest = Infinity, latest = -Infinity;
        for (let state of nextStates) {
            state.sort((x, y) => x - y);
            let [e, l] = dfs(state, round + 1);
            earliest = Math.min(earliest, e);
            latest = Math.max(latest, l);
        }
        memo.set(key, [earliest, latest]);
        return [earliest, latest];
    }

    // Initial round starts at 1, all players in [1..n]
    return dfs([...Array(n).keys()].map(i => i + 1), 1);
}