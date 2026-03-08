/**
 * IOCE
 * I (Input):
 *   - nums: string[]
 *     - An array of n unique binary strings, each of length n.
 *
 * O (Output):
 *   - string: a binary string of length n that does NOT appear in nums.
 *
 * C (Constraints):
 *   - n == nums.length
 *   - 1 <= n <= 16
 *   - nums[i].length == n
 *   - nums[i] consists only of '0' and '1'
 *   - nums strings are unique
 *   - O(n): build answer by flipping one character per row (Cantor's diagonalization)
 *   - O(n): store the resulting string (or char array)
 *
 * E (Edge cases):
 *   - n = 1: e.g., ["0"] -> "1", ["1"] -> "0"
 *   - Any ordering of strings in nums
 *   - Ensure produced string is length n and differs from every nums[i]
 *
 */
function findDifferentBinaryString(nums: string[]): string {
  const n = nums.length;
  const res: string[] = new Array(n);

  for (let i = 0; i < n; i++) {
    // Flip the diagonal bit
    res[i] = nums[i][i] === "0" ? "1" : "0";
  }

  return res.join("");
}

/* ------------------------------ Tests (console logs) ------------------------------ */

function isValidAnswer(nums: string[], ans: string): boolean {
  const n = nums.length;
  if (ans.length !== n) return false;
  for (const ch of ans) if (ch !== "0" && ch !== "1") return false;
  const set = new Set(nums);
  return !set.has(ans);
}

// Example 1
const nums1 = ["01", "10"];
const ans1 = findDifferentBinaryString(nums1);
console.log("Test 1 ans:", ans1, "valid:", isValidAnswer(nums1, ans1));

// Example 2
const nums2 = ["00", "01"];
const ans2 = findDifferentBinaryString(nums2);
console.log("Test 2 ans:", ans2, "valid:", isValidAnswer(nums2, ans2));

// Example 3
const nums3 = ["111", "011", "001"];
const ans3 = findDifferentBinaryString(nums3);
console.log("Test 3 ans:", ans3, "valid:", isValidAnswer(nums3, ans3));

// Edge: n = 1
const nums4 = ["0"];
const ans4 = findDifferentBinaryString(nums4);
console.log("Test 4 ans:", ans4, "valid:", isValidAnswer(nums4, ans4));

const nums5 = ["1"];
const ans5 = findDifferentBinaryString(nums5);
console.log("Test 5 ans:", ans5, "valid:", isValidAnswer(nums5, ans5));