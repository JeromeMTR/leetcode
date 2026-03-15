/**
 * IOCE (Input / Output / Constraints / Example)
 *
 * Input:
 *  - Sequence of operations on a Fancy sequence: append, addAll, multAll, getIndex
 *  - Values are integers (val, inc, m)
 *
 * Output:
 *  - Integer results returned by `getIndex(idx)`, or -1 if index is out of bounds
 *
 * Constraints:
 *  - 1 <= val, inc, m <= 10^9 (operations applied modulo 1_000_000_007)
 *  - Up to ~10^5 operations; implementation uses lazy factors for efficiency
 *
 */
const MOD = 1000000007n; // 10^9 + 7, prime modulus for modular arithmetic

/**
 * Fancy Sequence class implementing efficient operations with lazy transformation.
 *
 * Core Idea: Instead of applying addAll/multAll to every element immediately (O(n)),
 * we track global transformation parameters (a, b) representing: value = a * x + b.
 * When appending, we store the "normalized" value that would produce correct result
 * when current (a, b) is applied later during getIndex.
 *
 * Time Complexity:
 *   - append: O(log MOD) - due to modular inverse computation
 *   - addAll: O(1)
 *   - multAll: O(1)
 *   - getIndex: O(1)
 *
 * Space Complexity: O(n) where n is number of appended elements
 */
class Fancy {
    // Stores normalized values (original values adjusted for current transformation)
    private v: number[];

    // Global transformation parameters: actual_value = (a * stored_value + b) % MOD
    // Initially: a=1, b=0 (identity transformation: value = 1*x + 0 = x)
    private a: bigint;
    private b: bigint;

    constructor() {
        this.v = [];
        this.a = 1n;  // Multiplicative factor
        this.b = 0n;  // Additive offset
    }

    /**
     * Fast exponentiation (binary exponentiation) for computing x^y mod MOD.
     * Used to compute modular multiplicative inverse via Fermat's Little Theorem.
     *
     * Time Complexity: O(log y)
     *
     * @param x - Base value (number)
     * @param y - Exponent (bigint)
     * @returns (x^y) % MOD as number
     */
    private quickMul(x: number, y: bigint): number {
        let result = 1n;
        let current = BigInt(x) % MOD;
        let exponent = y;

        while (exponent !== 0n) {
            // If current bit is 1, multiply result by current value
            if ((exponent & 1n) !== 0n) {
                result = (result * current) % MOD;
            }
            // Square the current value for next bit
            current = (current * current) % MOD;
            // Shift exponent right by 1 bit
            exponent >>= 1n;
        }
        return Number(result);
    }

    /**
     * Computes modular multiplicative inverse of x under prime modulus MOD.
     * By Fermat's Little Theorem: x^(MOD-2) ≡ x^(-1) mod MOD when MOD is prime.
     *
     * Used to "undo" multiplication when normalizing appended values.
     *
     * Time Complexity: O(log MOD)
     *
     * @param x - Value to find inverse of (1 ≤ x < MOD)
     * @returns x^(-1) mod MOD
     */
    private inv(x: number): number {
        return this.quickMul(x, MOD - 2n);
    }

    /**
     * Appends a value to the sequence.
     *
     * Instead of storing val directly, we store the normalized value that,
     * when current transformation (a, b) is applied later, gives the correct result.
     *
     * We solve for normalized_val: a * normalized_val + b ≡ val (mod MOD)
     * => normalized_val ≡ (val - b) * a^(-1) (mod MOD)
     *
     * Time Complexity: O(log MOD) due to modular inverse
     *
     * @param val - Value to append (1 ≤ val ≤ 100)
     */
    append(val: number): void {
        // Normalize val: reverse current transformation to store "base" value
        // Formula: normalized = (val - b) / a ≡ (val - b) * a^(-1) mod MOD
        const adjustedVal =
            (((BigInt(val) - this.b + MOD) % MOD) *  // Subtract b, ensure positive
                BigInt(this.inv(Number(this.a)))) % MOD;  // Multiply by a^(-1)

        this.v.push(Number(adjustedVal));
    }

    /**
     * Adds inc to all existing values in the sequence.
     *
     * Updates global additive offset: new_value = a*x + (b + inc)
     *
     * Time Complexity: O(1)
     *
     * @param inc - Value to add to all elements (1 ≤ inc ≤ 100)
     */
    addAll(inc: number): void {
        this.b = (this.b + BigInt(inc)) % MOD;
    }

    /**
     * Multiplies all existing values by m.
     *
     * Updates both transformation parameters:
     * new_value = (a*x + b) * m = (a*m)*x + (b*m)
     *
     * Time Complexity: O(1)
     *
     * @param m - Multiplier (1 ≤ m ≤ 100)
     */
    multAll(m: number): void {
        const multiplier = BigInt(m);
        this.a = (this.a * multiplier) % MOD;
        this.b = (this.b * multiplier) % MOD;
    }

    /**
     * Returns the current value at index idx.
     *
     * Applies current global transformation to stored normalized value:
     * result = (a * v[idx] + b) % MOD
     *
     * Time Complexity: O(1)
     *
     * @param idx - Index to query (0-indexed)
     * @returns Current value at idx modulo MOD, or -1 if idx out of bounds
     */
    getIndex(idx: number): number {
        if (idx >= this.v.length) {
            return -1;
        }
        // Apply transformation: value = a * stored_value + b
        const result = (((this.a * BigInt(this.v[idx])) % MOD) + this.b) % MOD;
        return Number(result);
    }
}

// Console logs for testing
const fancy = new Fancy();
fancy.append(2);
fancy.addAll(3);
fancy.append(7);
fancy.multAll(2);
console.log(fancy.getIndex(0)); // Expected 10
fancy.addAll(3);
fancy.append(10);
fancy.multAll(2);
console.log(fancy.getIndex(0)); // Expected 26
console.log(fancy.getIndex(1)); // Expected 34
console.log(fancy.getIndex(2)); // Expected 20
