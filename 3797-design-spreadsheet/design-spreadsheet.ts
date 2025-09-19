/**
 * A class representing a spreadsheet with 26 columns (A-Z) and a fixed number of rows.
 */
class Spreadsheet {
    // 2D array: rows x columns, initialized to 0.
    private grid: number[][];
    private rows: number;

    /**
     * Initializes a spreadsheet with 26 columns (A-Z) and the specified number of rows.
     * @param rows The number of rows in the spreadsheet.
     */
    constructor(rows: number) {
        this.rows = rows;
        this.grid = Array.from({ length: rows }, () => Array(26).fill(0));
    }

    /**
     * Sets the value of the cell specified by cellRef (e.g. "A1", "B10").
     * @param cellRef A string like "A1", "Z1000".
     * @param value The value to set (integer between 0 and 1e5).
     */
    setCell(cellRef: string, value: number): void {
        const [row, col] = this.cellToIndices(cellRef);
        this.grid[row][col] = value;
    }

    /**
     * Resets the specified cell to 0.
     * @param cellRef Cell reference like "B2".
     */
    resetCell(cellRef: string): void {
        const [row, col] = this.cellToIndices(cellRef);
        this.grid[row][col] = 0;
    }

    /**
     * Evaluates a formula of the form "=X+Y", where X and Y can be either
     * cell references or integer numbers, and returns the computed sum.
     * @param formula String formula like "=A1+B2" or "=5+A1"
     * @returns The computed sum as an integer.
     */
    getValue(formula: string): number {
        // Remove '=' and split on '+'
        const expr = formula.slice(1); // remove '='
        const [left, right] = expr.split('+');

        const leftVal = this.getOperandValue(left);
        const rightVal = this.getOperandValue(right);

        return leftVal + rightVal;
    }

    /**
     * Converts a cell reference (e.g. "B10") to zero-based [row, col] indices.
     * @param cellRef The cell reference as a string.
     * @returns A tuple [row, col] both zero-based.
     */
    private cellToIndices(cellRef: string): [number, number] {
        // Column is the first character (A-Z)
        const colChar = cellRef.charAt(0);
        const col = colChar.charCodeAt(0) - 65; // 'A'->0, 'B'->1, etc.

        // Row is the rest, 1-indexed in reference
        const rowStr = cellRef.slice(1);
        const row = parseInt(rowStr, 10) - 1; // 0-indexed for array

        return [row, col];
    }

    /**
     * Gets the value of an operand, which is either
     * - a cell reference (e.g. "A1") or
     * - a non-negative integer (e.g. "5")
     * @param operand The operand string.
     * @returns The corresponding value from the grid, or the number.
     */
    private getOperandValue(operand: string): number {
        // If operand is all digits, it's a number
        if (/^\d+$/.test(operand)) {
            return Number(operand);
        } else {
            const [row, col] = this.cellToIndices(operand);
            if (row < 0 || row >= this.rows || col < 0 || col >= 26) {
                // Should not happen as constraints guarantee validity
                return 0;
            }
            return this.grid[row][col];
        }
    }
}