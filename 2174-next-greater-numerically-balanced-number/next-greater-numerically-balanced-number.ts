// IOCE (Input, Output, Constraints, Edge-case Handling) listed above

function nextBeautifulNumber(n: number): number {
    // Helper to check if a number is numerically balanced
    function isNumericallyBalanced(x: number): boolean {
        const digits = x.toString().split("").map(Number);
        const freq = new Map<number, number>();

        // Count frequency of each digit
        for (const d of digits) {
            freq.set(d, (freq.get(d) ?? 0) + 1);
        }

        // For numerically balanced: for every digit d, freq must be d times
        for (const [digit, count] of freq.entries()) {
            if (digit === 0) return false; // 0 cannot appear > 0 times
            if (count !== digit) return false;
        }
        return true;
    }

    // Brute force, check each number after n
    let candidate = n + 1;
    // The largest possible answer is pretty small (~73311122), but for our constraints
    while (candidate < 10 ** 7) {
        if (isNumericallyBalanced(candidate)) {
            return candidate;
        }
        candidate++;
    }

    // Should never reach here because an answer always exists within reasonable bound
    throw new Error("Numerically balanced number not found within search space.");
}

// Example usage:
console.log(nextBeautifulNumber(1));      // Output: 22
console.log(nextBeautifulNumber(1000));   // Output: 1333
console.log(nextBeautifulNumber(3000));   // Output: 3133