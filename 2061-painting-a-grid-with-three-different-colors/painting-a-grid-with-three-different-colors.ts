// IOCE (Input Output Commented Example) included

function colorTheGrid(m: number, n: number): number {
    const MOD = 1_000_000_007;
    const COLORS = 3; // 0: red, 1: green, 2: blue

    // Helper: Generate all valid colorings of a column
    function genPatterns(pos: number, prevColor: number[], patterns: number[][]) {
        if (pos === m) {
            patterns.push([...prevColor]);
            return;
        }
        for (let c = 0; c < COLORS; c++) {
            if (pos > 0 && prevColor[pos-1] === c) continue; // adjacent cells can't be same
            prevColor[pos] = c;
            genPatterns(pos + 1, prevColor, patterns);
        }
    }

    // Generate all patterns
    let patterns: number[][] = [];
    genPatterns(0, Array(m).fill(-1), patterns);

    // Map pattern => id, and id => pattern
    const patternToId = new Map<string, number>();
    patterns.forEach((pat, i) => {
        patternToId.set(pat.join(''), i);
    });

    // Precompute compatibility: which patterns can follow which
    const compat: number[][] = Array(patterns.length).fill(0).map(() => []);
    for (let i = 0; i < patterns.length; ++i) {
        for (let j = 0; j < patterns.length; ++j) {
            let ok = true;
            for (let k = 0; k < m; ++k) {
                if (patterns[i][k] === patterns[j][k]) {
                    ok = false; break; // same color in the same row (adjacent columns)
                }
            }
            if (ok) compat[i].push(j); // pattern i is compatible with pattern j
        }
    }

    // DP: dp[col][patternID]
    let dp: number[] = Array(patterns.length).fill(1); // Base case: first col
    for (let col = 1; col < n; ++col) {
        let newDP = Array(patterns.length).fill(0);
        for (let to = 0; to < patterns.length; ++to) {
            for (const from of compat[to]) {
                newDP[to] = (newDP[to] + dp[from]) % MOD;
            }
        }
        dp = newDP;
    }

    // Sum up all end patterns
    let res = 0;
    for (const cnt of dp) {
        res = (res + cnt) % MOD;
    }
    return res;
}

// IOCE - Input Output Commented Example

// Example 1:
// Input: m = 1, n = 1
console.log(colorTheGrid(1, 1)); // Output: 3

// Example 2:
// Input: m = 1, n = 2
console.log(colorTheGrid(1, 2)); // Output: 6

// Example 3:
// Input: m = 5, n = 5
console.log(colorTheGrid(5, 5)); // Output: 580986

/* 
Explanation:
- All valid "column" colorings are precomputed (state compression), and for each column we only need to keep track of ways for each column pattern.
- We traverse columns one by one (up to n), updating ways for each pattern using compatible previous patterns.
- At the end, sum for all possible final column patterns gives the answer.
*/