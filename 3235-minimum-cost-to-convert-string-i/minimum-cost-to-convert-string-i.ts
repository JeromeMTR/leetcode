/**
 * Minimum Cost to Convert String I (LeetCode 2976)
 *
 * Approach:
 * - Model character transformations as a directed weighted graph on 26 lowercase letters.
 * - There may be multiple edges between same (u->v); keep the minimum edge cost.
 * - Compute all-pairs shortest paths on 26 nodes using Floyd–Warshall (26 is tiny).
 * - Then sum shortest costs for each position i: source[i] -> target[i].
 *   If any required conversion is unreachable, return -1.
 *
 * IOCE:
 * I (Input): source, target, original, changed, cost
 * O (Output): minimum total cost (number), or -1 if impossible
 * C (Constraints): n up to 1e5; rules up to 2000; costs up to 1e6
 * E (Edge cases):
 *   - source[i] === target[i] => cost 0 for that position
 *   - multiple rules same pair => take minimum
 *   - conversions requiring intermediate letters
 *   - impossible conversion for any position => -1
 */

function minimumCost(
  source: string,
  target: string,
  original: string[],
  changed: string[],
  cost: number[]
): number {
  const ALPHABET_SIZE = 26;
  const INFINITY = Number.POSITIVE_INFINITY;

  // dist[u][v] = min cost to convert letter u -> v
  const conversionCost: number[][] = Array.from({ length: ALPHABET_SIZE }, () =>
    Array(ALPHABET_SIZE).fill(INFINITY)
  );

  for (let i = 0; i < ALPHABET_SIZE; i++) conversionCost[i][i] = 0;

  const getCharIndex = (char: string) => char.charCodeAt(0) - 97;

  // Initialize edges with minimum cost among duplicates
  for (let i = 0; i < cost.length; i++) {
    const from = getCharIndex(original[i]);
    const to = getCharIndex(changed[i]);
    conversionCost[from][to] = Math.min(conversionCost[from][to], cost[i]);
  }

  // Fall-pairs shortest paths
  for (let intermediate = 0; intermediate < ALPHABET_SIZE; intermediate++) {
    for (let start = 0; start < ALPHABET_SIZE; start++) {
      const costToIntermediate = conversionCost[start][intermediate];
      if (costToIntermediate === INFINITY) continue;
      for (let end = 0; end < ALPHABET_SIZE; end++) {
        const costFromIntermediate = conversionCost[intermediate][end];
        if (costFromIntermediate === INFINITY) continue;
        const newCost = costToIntermediate + costFromIntermediate;
        if (newCost < conversionCost[start][end]) conversionCost[start][end] = newCost;
      }
    }
  }

  // Sum costs for each position
  let totalCost = 0;
  for (let i = 0; i < source.length; i++) {
    const sourceCharIndex = source.charCodeAt(i) - 97;
    const targetCharIndex = target.charCodeAt(i) - 97;
    const conversion = conversionCost[sourceCharIndex][targetCharIndex];
    if (conversion === INFINITY) return -1;
    totalCost += conversion;
  }

  return totalCost;
}

/***********************
 * Console log tests
 ***********************/

// Example 1
console.log(
  minimumCost(
    "abcd",
    "acbe",
    ["a", "b", "c", "c", "e", "d"],
    ["b", "c", "b", "e", "b", "e"],
    [2, 5, 5, 1, 2, 20]
  ),
  "expected:",
  28
);

// Example 2
console.log(
  minimumCost("aaaa", "bbbb", ["a", "c"], ["c", "b"], [1, 2]),
  "expected:",
  12
);

// Example 3
console.log(
  minimumCost("abcd", "abce", ["a"], ["e"], [10000]),
  "expected:",
  -1
);

// Example 4
console.log(
  minimumCost("a", "b", ["a", "a"], ["b", "b"], [10, 3]),
  "expected:",
  3
);

// Example 5
console.log(
  minimumCost("a", "d", ["a", "b", "c"], ["b", "c", "d"], [2, 2, 2]),
  "expected:",
  6
);

// Example 6
console.log(
  minimumCost("ab", "cd", ["a"], ["c"], [1]),
  "expected:",
  -1
);