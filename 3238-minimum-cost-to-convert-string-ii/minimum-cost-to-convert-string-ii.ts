/**
 * Minimum Cost to Convert String (with disjoint-or-identical operations)
 *
/***********************
 * IOCE (Input/Output/Complexity/Edge cases)
 *
 * Input:
 * - source, target: length n (1..1000), lowercase
 * - original, changed, cost: arrays length m (1..100), rules original[i]->changed[i] with cost[i]
 *
 * Output:
 * - minimum total cost to convert source into target under disjoint-or-identical interval constraint, else -1.
 *
 * Complexity:
 * - Let M_L be number of distinct strings for a given length L (<= 2 * #rules of that length).
 * - Floyd-Warshall per L: O(M_L^3), with M_L <= 200, and total rules <= 100.
 * - DP: O(n * #distinctLengths), n<=1000, #distinctLengths<=100.
 *
 * Edge cases:
 * - source already equals target => answer 0 (DP handles).
 * - Needed substring conversions not present in rule-graph => -1.
 * - Duplicate rules for same (from,to) => keep minimum edge.
 * - Multi-step conversions within same interval length are allowed via APSP.
 ***********************/

type Rule = { from: string; to: string; c: number };

const INF = Number.POSITIVE_INFINITY;

function minimumCost(
  source: string,
  target: string,
  original: string[],
  changed: string[],
  cost: number[]
): number {
  const n = source.length;

  // Group rules by length
  const rulesByLength = new Map<number, Rule[]>();
  for (let i = 0; i < cost.length; i++) {
    const ruleLength = original[i].length;
    if (!rulesByLength.has(ruleLength)) rulesByLength.set(ruleLength, []);
    rulesByLength.get(ruleLength)!.push({ from: original[i], to: changed[i], c: cost[i] });
  }

  // For each length L, build APSP among strings involved in rules of that length.
  // Store as: len -> { idxMap, dist }
  const apspByLength = new Map<
    number,
    { idx: Map<string, number>; dist: number[][] }
  >();

  for (const [ruleLength, rules] of rulesByLength) {
    const uniqueStrings = new Set<string>();
    for (const rule of rules) {
      uniqueStrings.add(rule.from);
      uniqueStrings.add(rule.to);
    }
    const nodes = Array.from(uniqueStrings);
    const nodeCount = nodes.length;
    const nodeIndexMap = new Map<string, number>();
    for (let i = 0; i < nodeCount; i++) nodeIndexMap.set(nodes[i], i);

    const distanceMatrix: number[][] = Array.from({ length: nodeCount }, () =>
      Array.from({ length: nodeCount }, () => INF)
    );
    for (let i = 0; i < nodeCount; i++) distanceMatrix[i][i] = 0;

    for (const rule of rules) {
      const fromIndex = nodeIndexMap.get(rule.from)!;
      const toIndex = nodeIndexMap.get(rule.to)!;
      if (rule.c < distanceMatrix[fromIndex][toIndex]) {
        distanceMatrix[fromIndex][toIndex] = rule.c;
      }
    }

    for (let k = 0; k < nodeCount; k++) {
      for (let i = 0; i < nodeCount; i++) {
        const distanceIK = distanceMatrix[i][k];
        if (distanceIK === INF) continue;
        for (let j = 0; j < nodeCount; j++) {
          const distanceKJ = distanceMatrix[k][j];
          if (distanceKJ === INF) continue;
          const newDistance = distanceIK + distanceKJ;
          if (newDistance < distanceMatrix[i][j]) {
            distanceMatrix[i][j] = newDistance;
          }
        }
      }
    }

    apspByLength.set(ruleLength, { idx: nodeIndexMap, dist: distanceMatrix });
  }

  // Helper: shortest cost to convert s->t when |s|=L, or INF if impossible.
  function getConversionCost(sourceSubstring: string, targetSubstring: string): number {
    const substringLength = sourceSubstring.length;
    const graph = apspByLength.get(substringLength);
    if (!graph) return INF;
    const sourceIndex = graph.idx.get(sourceSubstring);
    const targetIndex = graph.idx.get(targetSubstring);
    if (sourceIndex === undefined || targetIndex === undefined) return INF;
    return graph.dist[sourceIndex][targetIndex];
  }

  // DP over positions
  const dp = Array(n + 1).fill(INF);
  dp[0] = 0;

  const ruleLengths = Array.from(rulesByLength.keys()).sort((a, b) => a - b);

  for (let i = 0; i < n; i++) {
    if (dp[i] === INF) continue;

    if (source[i] === target[i]) {
      if (dp[i] < dp[i + 1]) dp[i + 1] = dp[i];
    }

    for (const ruleLength of ruleLengths) {
      if (i + ruleLength > n) break;
      const sourceSubstring = source.slice(i, i + ruleLength);
      const targetSubstring = target.slice(i, i + ruleLength);
      const conversionCost = getConversionCost(sourceSubstring, targetSubstring);
      if (conversionCost !== INF) {
        const newCost = dp[i] + conversionCost;
        if (newCost < dp[i + ruleLength]) dp[i + ruleLength] = newCost;
      }
    }
  }

  return dp[n] === INF ? -1 : dp[n];
}

// Test 1
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

// Test 2
console.log(
  minimumCost(
    "abcdefgh",
    "acdeeghh",
    ["bcd", "fgh", "thh"],
    ["cde", "thh", "ghh"],
    [1, 3, 5]
  ),
  "expected:",
  9
);

// Test 3
console.log(
  minimumCost(
    "abcdefgh",
    "addddddd",
    ["bcd", "defgh"],
    ["ddd", "ddddd"],
    [100, 1578]
  ),
  "expected:",
  -1
);