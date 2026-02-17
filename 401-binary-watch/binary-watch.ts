/**
 * Binary Watch (LeetCode 401)
 *
 * IOCE
 * Inputs:
 *  - turnedOn: number  (0 <= turnedOn <= 10)
 *
 * Outputs:
 *  - string[]: all possible times "H:MM" where:
 *      - H is 0..11 with no leading zero (e.g., "1", "10", "0" allowed)
 *      - MM is 00..59 with exactly 2 digits (leading zero allowed)
 *
 * Constraints:
 *  - There are only 12 * 60 = 720 possible times.
 *
 * Edge cases:
 *  - turnedOn = 0 -> ["0:00"]
 *  - turnedOn > 8? still possible up to 10 LEDs total, but hours<=11 and minutes<=59
 *    can eliminate many combinations; turnedOn=9 or 10 often yields []
 *  - Ensure minute is always 2 digits, hour has no leading zeros.
 */

export function readBinaryWatch(turnedOn: number): string[] {
    const result: string[] = [];

    const countBits = (x: number): number => {
        let c = 0;
        while (x > 0) {
            c += x & 1;
            x >>= 1;
        }
        return c;
    };

    for (let h = 0; h < 12; ++h) {
        for (let m = 0; m < 60; ++m) {
            if (countBits(h) + countBits(m) === turnedOn) {
                result.push(`${h}:${m < 10 ? "0" : ""}${m}`);
            }
        }
    }
    return result;
}

// console.log test cases
type TestCase = { name: string; input: number; expected: string[] };

function assertEqualUnordered(actual: string[], expected: string[], label: string): void {
    const sortFn = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);
    const a = [...actual].sort(sortFn);
    const e = [...expected].sort(sortFn);
    const pass = a.length === e.length && a.every((v, i) => v === e[i]);
    if (pass) {
        console.log(`PASS - ${label}`);
    } else {
        console.log(`FAIL - ${label}`);
        console.log("Expected:", e);
        console.log("Actual:", a);
    }
}

const cases: TestCase[] = [
    {
        name: "turnedOn=1",
        input: 1,
        expected: [
            "0:01", "0:02", "0:04", "0:08", "0:16", "0:32",
            "1:00", "2:00", "4:00", "8:00",
        ],
    },
    { name: "turnedOn=9", input: 9, expected: [] },
    { name: "turnedOn=0", input: 0, expected: ["0:00"] },
    { name: "turnedOn=10", input: 10, expected: [] },
];

function runTests(): void {
    console.log("\nRunning Binary Watch tests...\n");
    for (const tc of cases) {
        const actual = readBinaryWatch(tc.input);
        assertEqualUnordered(actual, tc.expected, tc.name);
    }
}

runTests();