function longestAlternatingSubsequence(words: string[], groups: number[]): string[] {
    // Initialize an array to store the result subsequence
    const subsequence: string[] = [];
    
    // We start by assuming that the first word is part of the subsequence
    subsequence.push(words[0]);
    let currentGroup = groups[0];

    // Iterate through the words starting from the second one
    for (let i = 1; i < words.length; i++) {
        // Check if the current group is different from the last added group's
        if (groups[i] !== currentGroup) {
            // Add the current word to the subsequence
            subsequence.push(words[i]);
            // Update the current group to the new value
            currentGroup = groups[i];
        }
    }

    // Return the constructed longest alternating subsequence
    return subsequence;
}

// Example usage:

// Example 1:
const words1 = ["e", "a", "b"];
const groups1 = [0, 0, 1];
console.log(longestAlternatingSubsequence(words1, groups1)); // Output: ["e", "b"] or ["a", "b"]

// Example 2:
const words2 = ["a", "b", "c", "d"];
const groups2 = [1, 0, 1, 1];
console.log(longestAlternatingSubsequence(words2, groups2)); // Output: ["a", "b", "c"] or ["a", "b", "d"]