/**
 * IOCE
 * Inputs:
 *  - moves: string of length n containing only 'L', 'R', '_'
 *
 * Outputs:
 *  - number: the maximum possible distance from origin after n moves
 *
 * Constraints:
 *  - 1 <= n <= 50
 *  - moves[i] in {'L','R','_'}
 *
 * Time Complexity:
 *  - O(n)
 *
 * Space Complexity:
 *  - O(1)
 *
 * Edge Cases:
 *  - All '_' -> can go all right or all left => answer = n
 *  - No '_' -> answer = |(#R - #L)|
 *  - Mixed -> choose '_' directions to maximize absolute final position
 */

function furthestDistanceFromOrigin(moves: string): number {
  let r = 0, l = 0, u = 0;

  for (const ch of moves) {
    if (ch === "R") r++;
    else if (ch === "L") l++;
    else u++;
  }

  const posRight = (r + u) - l; // choose all '_' as 'R'
  const posLeft = r - (l + u);  // choose all '_' as 'L'

  return Math.max(Math.abs(posRight), Math.abs(posLeft));
}

/* ----------------------- Console Log Tests ----------------------- */
console.log(furthestDistanceFromOrigin("L_RL__R"), 3); // expected 3
console.log(furthestDistanceFromOrigin("_R__LL_"), 5); // expected 5
console.log(furthestDistanceFromOrigin("_______"), 7);  // expected 7
console.log(furthestDistanceFromOrigin("LRLR"), 0);     // expected 0
console.log(furthestDistanceFromOrigin("RRR"), 3);      // expected 3
console.log(furthestDistanceFromOrigin("LLL__"), 5);    // expected 5 (go all left)
console.log(furthestDistanceFromOrigin("R_L_"), 4);     // expected 4 (choose all '_' as R => +4)
