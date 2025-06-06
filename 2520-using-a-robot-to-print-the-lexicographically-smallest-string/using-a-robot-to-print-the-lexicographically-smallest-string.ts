// IOCE (Input Output Constraints Example)
// Example 1: 
// Input: s = "zza"         Output: "azz"
// Example 2: 
// Input: s = "bac"         Output: "abc"
// Example 3: 
// Input: s = "bdda"        Output: "addb"

function robotWithString(s: string): string {
    // Precompute minChar[i] = smallest char in s[i:]
    const n = s.length;
    const minChar: string[] = Array(n + 1).fill("");
    minChar[n] = '{'; // '{' = 'z' + 1 in ASCII (bigger than any letter)
    for(let i = n - 1; i >= 0; --i) {
        minChar[i] = s[i] < minChar[i + 1] ? s[i] : minChar[i + 1];
    }

    // t: using array as stack
    let t: string[] = [];
    let res: string[] = [];
    let i = 0;

    // Step through s
    while(i < n || t.length) {
        // If t not empty, and top of t <= minChar[i], write it
        while(t.length && t[t.length - 1] <= minChar[i]) {
            res.push(t.pop()!);
        }
        // Else, move next letter from s to t
        if(i < n) {
            t.push(s[i]);
            i++;
        }
    }
    // Return result as string
    return res.join('');
}

//-------------- Test Examples --------------


// Example 1
console.log(robotWithString("zza")); // Output: "azz"

// Example 2
console.log(robotWithString("bac")); // Output: "abc"

// Example 3
console.log(robotWithString("bdda")); // Output: "addb"