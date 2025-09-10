// IOCE (Input Output Code Examples) enabled

function minimumTeachings(
    n: number, 
    languages: number[][], 
    friendships: number[][]
): number {
    // Build: For fast language check, turn user languages into Sets
    const userLangSets: Set<number>[] = languages.map(langs => new Set(langs));

    // 1-based user ID to 0-based index
    // Find all problematic friendships (users can't communicate)
    const toTeach = new Set<number>();

    const cannotCommunicate: [number,number][] = [];
    for (const [u, v] of friendships) {
        const uLanguages = userLangSets[u - 1];
        const vLanguages = userLangSets[v - 1];
        let canCommunicate = false;
        for (let lang of uLanguages) {
            if (vLanguages.has(lang)) {
                canCommunicate = true;
                break;
            }
        }
        if (!canCommunicate) {
            cannotCommunicate.push([u, v]);
        }
    }

    if (cannotCommunicate.length === 0) {
        // All friends can communicate; teaching is unnecessary
        return 0;
    }

    // For each language from 1 to n, try teaching only this language
    let minTeach = Number.MAX_SAFE_INTEGER;
    for (let lang = 1; lang <= n; ++lang) {
        // Set of users who need to be taught "lang"
        const needToTeach = new Set<number>();
        for (const [u, v] of cannotCommunicate) {
            // if u or v already knows lang, skip them
            if (!userLangSets[u - 1].has(lang)) needToTeach.add(u);
            if (!userLangSets[v - 1].has(lang)) needToTeach.add(v);
        }
        minTeach = Math.min(minTeach, needToTeach.size);
    }

    return minTeach;
}

// --- IOCE Section (Input Output Code Examples) ---

// Example 1
console.log(
    minimumTeachings(
        2, 
        [[1], [2], [1,2]], 
        [[1,2],[1,3],[2,3]]
    )
); // Output: 1

// Example 2
console.log(
    minimumTeachings(
        3,
        [[2],[1,3],[1,2],[3]],
        [[1,4],[1,2],[3,4],[2,3]]
    )
); // Output: 2

// Edge Case: All friends already communicate
console.log(
    minimumTeachings(
        2, 
        [[1,2],[1],[2]], 
        [[1,2],[1,3]]
    )
); // Output: 0

// Custom: Single teaching
console.log(
    minimumTeachings(
        3, 
        [[1],[2],[3]], 
        [[1,2],[2,3]]
    )
); // Output: 1

// Custom: Large
// 500 users, 1 friendship, each one knows only their own language, so will require 1 teaching for any of the two
const big = 500;
const langs = Array(big).fill(0).map((_,i)=>[i+1]);
console.log(
    minimumTeachings(
        big,
        langs,
        [[1,2]]
    )
); // Output: 1