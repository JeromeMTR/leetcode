// Function to find all people who know the secret after all meetings
function findAllPeople(n: number, meetings: number[][], firstPerson: number): number[] {
    // Sort all meetings by time
    meetings.sort((a, b) => a[2] - b[2]);

    // A set to hold people with the secret
    const hasSecret = new Set<number>();
    hasSecret.add(0);
    hasSecret.add(firstPerson);

    let i = 0;
    const len = meetings.length;

    // Process meetings grouped by the same time
    while (i < len) {
        let time = meetings[i][2];
        // Gather all meetings at the current time
        let group: number[][] = [];
        while (i < len && meetings[i][2] === time) {
            group.push(meetings[i]);
            i++;
        }

        // Build a graph for this group of meetings
        const graph: Map<number, number[]> = new Map();
        const participants = new Set<number>();
        for (const [x, y, _] of group) {
            if (!graph.has(x)) graph.set(x, []);
            if (!graph.has(y)) graph.set(y, []);
            graph.get(x)!.push(y);
            graph.get(y)!.push(x);
            participants.add(x);
            participants.add(y);
        }

        // Find participants who know the secret at this time
        const queue: number[] = [];
        for (const p of participants) {
            if (hasSecret.has(p)) queue.push(p);
        }
        // Mark visited in this group - so we don't revisit
        const visited = new Set<number>(queue);

        // BFS to spread the secret instantly within this group
        while (queue.length) {
            const curr = queue.pop()!;
            for (const next of graph.get(curr)!) {
                if (!visited.has(next)) {
                    visited.add(next);
                    queue.push(next);
                }
            }
        }

        // After BFS, everyone visited received the secret at this time
        for (const p of visited) {
            hasSecret.add(p);
        }
    }
    return Array.from(hasSecret);
}

/*
IOCE (Input Output Commented Examples):

Example 1:
Input:
n = 6
meetings = [[1,2,5],[2,3,8],[1,5,10]]
firstPerson = 1
Output: [0,1,2,3,5]

Example 2:
Input:
n = 4
meetings = [[3,1,3],[1,2,2],[0,3,3]]
firstPerson = 3
Output: [0,1,3]

Example 3:
Input:
n = 5
meetings = [[3,4,2],[1,2,1],[2,3,1]]
firstPerson = 1
Output: [0,1,2,3,4]
*/