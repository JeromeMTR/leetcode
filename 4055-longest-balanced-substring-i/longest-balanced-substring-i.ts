function longestBalancedSubstring(s: string): number {
    let maxLength = 0;

    // Check each possible start position
    for (let start = 0; start < s.length; start++) {
        const charCount = new Map<string, number>();

        // Check each possible end position
        for (let end = start; end < s.length; end++) {
            const char = s[end];
            charCount.set(char, (charCount.get(char) || 0) + 1);

            if (isBalanced(charCount)) {
                maxLength = Math.max(maxLength, end - start + 1);
            }
        }
    }

    return maxLength;
}

// Helper function to check if all characters in the map have the same frequency
function isBalanced(charCount: Map<string, number>): boolean {
    let count: number | undefined = undefined;

    for (let currentCount of charCount.values()) {
        if (count === undefined) {
            count = currentCount;
        } else if (count !== currentCount) {
            return false;
        }
    }

    return true;
}

// Test cases to verify the solution
console.log(longestBalancedSubstring("abbac")); // Output: 4
console.log(longestBalancedSubstring("zzabccy")); // Output: 4
console.log(longestBalancedSubstring("aba")); // Output: 2
console.log(longestBalancedSubstring("a")); // Output: 1
console.log(longestBalancedSubstring("abcd")); // Output: 1
console.log(longestBalancedSubstring("aabb")); // Output: 4