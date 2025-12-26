/**
 * Minimum Penalty for a Shop (LeetCode 2483)
 * TypeScript solution with IOCE (Input/Output/Constraints/Edge-cases) and comments.
 *
 * IOCE:
 * Input:  a single string `customers` consisting of 'Y' and 'N'
 * Output: earliest hour j (0..n) to close to minimize penalty
 * Constraints: 1 <= n <= 1e5
 * Edge-cases:
 *  - all 'N' => answer 0
 *  - all 'Y' => answer n
 *  - ties => return earliest j
 */

// Core function
function bestClosingTime(customers: string): number {
  const n = customers.length;

  // If we close at hour 0, shop is closed for all hours: penalty = number of 'Y' in whole string
  let penalty = 0;
  for (let i = 0; i < n; i++) {
    if (customers[i] === 'Y') penalty++;
  }

  // Track best (minimum) penalty and earliest hour achieving it
  let bestPenalty = penalty;
  let bestHour = 0;

  // Sweep closing hour from j=1..n:
  // When we move closing time from j to j+1, we "open" one more hour (hour j).
  // If hour j is 'N': it becomes an open-with-no-customers hour => penalty +1
  // If hour j is 'Y': it is no longer a closed-with-customers hour => penalty -1
  for (let j = 0; j < n; j++) {
    if (customers[j] === 'N') penalty += 1;
    else penalty -= 1;

    const closingHour = j + 1; // after processing hour j, the shop closes at hour j+1

    // Keep earliest hour in case of ties
    if (penalty < bestPenalty) {
      bestPenalty = penalty;
      bestHour = closingHour;
    }
  }

  return bestHour;
}

// --------- Console.log test cases ---------
// To run these examples locally without interfering with judge IO
const testcases: Array<{ input: string; expected: number }> = [
  { input: "YYNY", expected: 2 },   // close at 2 -> penalty=1
  { input: "NNNN", expected: 0 },   // all N -> close at 0
  { input: "YYYY", expected: 4 },   // all Y -> close at n
  { input: "Y", expected: 1 },
  { input: "N", expected: 0 },
];

for (const { input, expected } of testcases) {
  const got = bestClosingTime(input);
  console.log(`customers="${input}" expected=${expected} got=${got}`);
}
