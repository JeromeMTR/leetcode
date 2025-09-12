function aliceWins(s: string): boolean {
    // Set of vowels for easy checking
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    let vowelCount = 0;
    for (let c of s) {
        if (vowels.has(c)) vowelCount++;
    }
    // If the number of vowels is odd, Alice can win by removing the whole string.
    // If the number is even (including zero), Bob will win (Alice can't start or Bob removes everything).
    return vowelCount % 2 === 1;
}

/*
IOCE

Example 1:
Input:  s = "leetcoder"
Count vowels: e, e, o, e => 4 vowels (even)
Output: false (Alice loses; but this contradicts the example!)

So let's analyze further: In "leetcoder", vowels indices: 1,2,5,7.

Consider all substrings - Alice can pick any odd-vowel substring.
But overall, game reduces to parity of total vowels:

    - If there are any vowels, Alice can always play (odd or even total), but whether she can force a win depends on who moves LAST.
    - After Alice's move, the string will have even number of vowels for Bob, and so on.

But the example clearly says Alice wins for "leetcoder" (which has 4 vowels).

So our initial deduction is flawed.

---

Let's simulate:

s="leetcoder", vowels at 1(e),2(e),5(o),7(e): total 4 vowels

1. Alice's turn: She can take "leetco" (indices 0-5). That has 'e','e','o' = 3 vowels (odd), allowed.
After removal, left with "der" (no vowels).

2. Bob's turn: must remove substring with even vowels. "d", "e", "er", "r" all have 0 or 1 vowels.
But ONLY substrings with even vowels: "d", "r", "der" (all zero vowels, so ok). So Bob removes "d". Left with "er".

3. Alice's turn: remove "er" (has 1 vowel, odd). String left empty.

4. Bob's turn: no move (empty). Alice wins.

So the 'odd/even = direct win' observation is not enough. The strategy must be: if there is ANY substring with an odd number of vowels, Alice can make a move. 

But if Alice is forced to leave the opponent a way to win after every optimal move, Bob wins.

But from problem, it's always possible for Alice to win as long as there is at least one vowel.

But for a string with no vowels, Alice can't move (as no substring will have odd vowels).

**Therefore, Alice wins iff s contains at least one vowel**

## Final Solution