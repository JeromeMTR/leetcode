// * @params: string, string[]
// Returns true if we can build the pyramid to a single block

/**
 * IOCE (Input/Output/Constraints/Edge cases)
 * Input:
 *  - bottom: string (length 2..6), characters in {'A'..'F'}
 *  - allowed: string[] of 3-char patterns "XYT" meaning X(left),Y(right) -> T(top)
 * Output:
 *  - boolean: can build pyramid to single block satisfying all local patterns
 * Constraints:
 *  - bottom.length <= 6, allowed.length <= 216 => brute force with memo/backtracking is fine
 * Edge cases:
 *  - allowed empty => only possible if bottom.length == 1 (not in constraints), so false
 *  - duplicates in allowed do not exist
 */

function pyramidTransition(bottom: string, allowed: string[]): boolean {
  // Map each pair "XY" -> bitmask of possible tops (A..F => 6 bits)
  const pairToMask = new Map<string, number>();

  const charToBit = (c: string): number => 1 << (c.charCodeAt(0) - 65); // 'A' => bit0
  const bitToChar = (b: number): string => String.fromCharCode(65 + b);

  for (const pat of allowed) {
    const key = pat[0] + pat[1];
    const bit = charToBit(pat[2]);
    pairToMask.set(key, (pairToMask.get(key) ?? 0) | bit);
  }

  // Memoization by row string: whether it can reach the top
  const memo = new Map<string, boolean>();

  // Generate all possible next rows given current row
  function buildNextRows(row: string): string[] {
    const n = row.length;
    const results: string[] = [];
    const cur: string[] = new Array(n - 1);

    function dfs(i: number): void {
      if (i === n - 1) {
        results.push(cur.join(""));
        return;
      }
      const key = row[i] + row[i + 1];
      const mask = pairToMask.get(key) ?? 0;
      if (mask === 0) return; // no possible top for this adjacent pair

      // Enumerate bits 0..5 (A..F)
      for (let b = 0; b < 6; b++) {
        if ((mask & (1 << b)) !== 0) {
          cur[i] = bitToChar(b);
          dfs(i + 1);
        }
      }
    }

    dfs(0);
    return results;
  }

  function canReachTop(row: string): boolean {
    if (row.length === 1) return true;
    const cached = memo.get(row);
    if (cached !== undefined) return cached;

    const nextRows = buildNextRows(row);
    for (const nxt of nextRows) {
      if (canReachTop(nxt)) {
        memo.set(row, true);
        return true;
      }
    }

    memo.set(row, false);
    return false;
  }

  return canReachTop(bottom);
}