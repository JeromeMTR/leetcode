/**
 * Simulates event processing for user mentions and returns the mention count per user.
 *
 * Event formats:
 * - MESSAGE: ["MESSAGE", timestamp, target]
 *   - target = "ALL" | "HERE" | space-separated explicit ids like "id0 id3 id7"
 * - OFFLINE: ["OFFLINE", timestamp, userIndexString]
 *
 * Ordering rules:
 * - Events are processed in ascending timestamp order.
 * - If timestamps tie, OFFLINE is processed before MESSAGE so the offline state applies at that same second.
 *
 * Offline window semantics:
 * - OFFLINE u at time t means user u is considered offline for [t, t+59].
 * - The user becomes online again at time (t + 60). We track this as nextOnlineTime[u] = t + 60.
 *
 * Mention rules:
 * - ALL: every user is counted once regardless of online status.
 * - HERE: only users with nextOnlineTime[u] <= currentTime (currently online) are counted.
 * - Explicit ids: each token like "id7" increments that user's count; duplicates in the same message are counted multiple times.
 *
 * @param numberOfUsers - Total number of users.
 * @param events - Array of events, each is [eventType, timestamp, data].
 * @returns Array mentions[], where mentions[i] is the count of mentions for user i.
 *
 * IOCE:
 * Input: numberOfUsers = 2, events = [["MESSAGE","10","id1 id0"],["OFFLINE","11","0"],["MESSAGE","71","HERE"]]
 * Output: [2,2]
 */
function countMentions(numberOfUsers: number, events: string[][]): number[] {
    // Sort by time ascending; for ties process OFFLINE before MESSAGE.
    events.sort((a: string[], b: string[]): number => {
        const timeA: number = parseInt(a[1]);
        const timeB: number = parseInt(b[1]);
        if (timeA !== timeB) {
            return timeA - timeB;
        }
        // Place OFFLINE (1) before MESSAGE (0) when times are equal
        return (b[0] === "MESSAGE" ? 0 : 1) - (a[0] === "MESSAGE" ? 0 : 1);
    });

    // count[i] holds the total mentions for user i
    const count: number[] = new Array(numberOfUsers).fill(0);
    // nextOnlineTime[i] = earliest timestamp when user i is considered online
    const nextOnlineTime: number[] = new Array(numberOfUsers).fill(0);

    for (const event of events) {
        const curTime: number = parseInt(event[1]);
        const type: string = event[0];

        if (type === "MESSAGE") {
            const target: string = event[2];
            if (target === "ALL") {
                // Everyone gets counted, regardless of online/offline
                for (let i = 0; i < numberOfUsers; i++) {
                    count[i]++;
                }
            } else if (target === "HERE") {
                // Only users currently online (nextOnlineTime <= curTime)
                for (let i = 0; i < numberOfUsers; i++) {
                    if (nextOnlineTime[i] <= curTime) {
                        count[i]++;
                    }
                }
            } else {
                // Explicit mentions: tokens like "id0 id2 id2"; duplicates count
                const users: string[] = target.split(" ");
                for (const user of users) {
                    // Assumes tokens start with "id" followed by the user index
                    const idx: number = parseInt(user.substring(2));
                    count[idx]++;
                }
            }
        } else {
            // OFFLINE event: mark user offline for 60 seconds starting now
            const idx: number = parseInt(event[2]);
            nextOnlineTime[idx] = curTime + 60;
        }
    }

    return count;
}

// EXAMPLES (IOCE)
// Example 1
// numberOfUsers = 2, events = [["MESSAGE","10","id1 id0"],["OFFLINE","11","0"],["MESSAGE","71","HERE"]]
// Output: [2,2]
// console.log(countMentions(2, [["MESSAGE","10","id1 id0"],["OFFLINE","11","0"],["MESSAGE","71","HERE"]]));

// Example 2
// numberOfUsers = 2, events = [["MESSAGE","10","id1 id0"],["OFFLINE","11","0"],["MESSAGE","12","ALL"]]
// Output: [2,2]
// console.log(countMentions(2, [["MESSAGE","10","id1 id0"],["OFFLINE","11","0"],["MESSAGE","12","ALL"]]));

// Example 3
// numberOfUsers = 2, events = [["OFFLINE","10","0"],["MESSAGE","12","HERE"]]
// Output: [0,1]
// console.log(countMentions(2, [["OFFLINE","10","0"],["MESSAGE","12","HERE"]]));