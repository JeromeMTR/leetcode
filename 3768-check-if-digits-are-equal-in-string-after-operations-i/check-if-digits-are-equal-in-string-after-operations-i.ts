function isFinalDigitsEqual(s: string): boolean {
    // Repeat the operation until only 2 digits remain
    while (s.length > 2) {
        const arr: number[] = [];
        
        // For each pair of consecutive digits
        for (let i = 0; i < s.length - 1; i++) {
            // Parse each digit and compute their sum modulo 10
            const d1 = Number(s[i]);
            const d2 = Number(s[i+1]);
            arr.push((d1 + d2) % 10);
        }
        
        // Convert the array of digits back into a string
        s = arr.join('');
    }

    // Return true if both final digits are the same
    return s[0] === s[1];
}

/* 
Example 1:
Input: s = "3902"
Step 1: "3902" -> (3+9)%10 = 2, (9+0)%10 = 9, (0+2)%10 = 2 -> "292"
Step 2: "292" -> (2+9)%10 = 1, (9+2)%10 = 1 -> "11"
Output: true

Example 2:
Input: s = "34789"
"34789" -> (3+4)%10 = 7, (4+7)%10 = 1, (7+8)%10 = 5, (8+9)%10 = 7 -> "7157"
"7157" -> (7+1) = 8, (1+5) = 6, (5+7) = 12%10 = 2 -> "862"
"862" -> (8+6)=14%10=4, (6+2)=8 -> "48"
Output: false
*/

// Sample Test Cases
console.log(isFinalDigitsEqual("3902"));   // true
console.log(isFinalDigitsEqual("34789"));  // false