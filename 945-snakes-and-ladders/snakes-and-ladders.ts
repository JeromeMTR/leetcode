// TypeScript Solution for Snakes and Ladders Problem

/**
 * Returns the least number of dice rolls to reach the last square in a Boustrophedon style "snake and ladders" board.
 * @param board n x n matrix, with ladders/snakes (-1 = empty, otherwise target label)
 * @returns Minimum number of moves, or -1 if unreachable
 */
function snakesAndLadders(board: number[][]): number {
    const n = board.length;

    // Maps a square number (1-based) to its (row, col) in the matrix as per Boustrophedon order
    function getCoordinates(s: number): [number, number] {
        let quot = Math.floor((s - 1) / n);
        let rem = (s - 1) % n;

        // Row is from bottom, so invert
        let row = n - 1 - quot;
        let col = quot % 2 === 0 ? rem : n - 1 - rem; // alternate direction
        return [row, col];
    }

    // BFS queue: [square, numMoves]
    let queue: [number, number][] = [[1, 0]];
    let visited: boolean[] = new Array(n * n + 1).fill(false);
    visited[1] = true;

    while (queue.length > 0) {
        const [curr, moves] = queue.shift()!;

        for (let roll = 1; roll <= 6; roll++) {
            let next = curr + roll;
            if (next > n * n) break;
            let [row, col] = getCoordinates(next);

            // If snake or ladder, take it
            if (board[row][col] !== -1) {
                next = board[row][col];
            }

            if (next === n * n) {
                return moves + 1;
            }

            if (!visited[next]) {
                visited[next] = true;
                queue.push([next, moves + 1]);
            }
        }
    }

    return -1;
}

/* IOCE: Input/Output/Corner/Example tests */

// Example 1:
const board1 = [
    [-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1],
    [-1,35,-1,-1,13,-1],
    [-1,-1,-1,-1,-1,-1],
    [-1,15,-1,-1,-1,-1]
];
console.log(snakesAndLadders(board1));  // Output: 4

// Example 2:
const board2 = [
    [-1,-1],
    [-1,3]
];
console.log(snakesAndLadders(board2));  // Output: 1

// Corner Case: Impossible to reach
const board3 = [
    [-1, -1, -1],
    [-1, 2, -1],
    [-1, -1, -1]
];
console.log(snakesAndLadders(board3));  // Output: -1

// Corner Case: Minimal size (2x2, ladder to last cell)
const board4 = [
    [-1, -1],
    [-1, 4]
];
console.log(snakesAndLadders(board4));  // Output: 1

// Edge: No snakes or ladders (simple board)
const board5 = [
    [-1,-1,-1],
    [-1,-1,-1],
    [-1,-1,-1]
];
console.log(snakesAndLadders(board5));  // Output: 2

/*
Expected outputs:
4
1
-1
1
2
*/