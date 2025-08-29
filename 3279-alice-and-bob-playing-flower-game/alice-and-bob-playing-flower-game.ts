// IOCE
// Input: n, m (numbers)
// Output: number of winning pairs for Alice

// Returns the number of (x, y) pairs such that x+y is odd, x ∈ [1,n], y ∈ [1,m]
function countAliceWinningPairs(n: number, m: number): number {
    // Count the number of odds and evens in [1, n] and [1, m]
    const oddN = Math.floor((n + 1)/2);   // 1,3,5,...
    const evenN = Math.floor(n / 2);      // 2,4,6,...
    const oddM = Math.floor((m + 1)/2);
    const evenM = Math.floor(m / 2);

    // Alice wins if (x,y) is (odd, even) or (even, odd)
    return oddN * evenM + evenN * oddM;
}

// Example usage:
console.log(countAliceWinningPairs(3, 2)); // Output: 3
console.log(countAliceWinningPairs(1, 1)); // Output: 0
console.log(countAliceWinningPairs(4, 5)); // Output: 10

/*
Explanation:
n = 3, m = 2:
x: 1 2 3
y: 1 2

Pairs:
(1,1)=2 even lose
(1,2)=3 odd win
(2,1)=3 odd win
(2,2)=4 even lose
(3,1)=4 even lose
(3,2)=5 odd win
Total = 3
*/