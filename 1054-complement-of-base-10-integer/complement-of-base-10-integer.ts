function bitwiseComplement(n: number): number {
    // Edge case: If n is 0, its complement is 1
    if (n === 0) return 1;

    // Convert n to a binary string representation
    let binaryStr = n.toString(2);

    // Flip the bits
    let complementStr = '';
    for (let char of binaryStr) {
        complementStr += char === '0' ? '1' : '0';
    }

    // Convert the binary complement string back to a decimal integer
    return parseInt(complementStr, 2);
}

// Testing the function with given examples and some additional cases
console.log(bitwiseComplement(5));  // Expected output: 2
console.log(bitwiseComplement(7));  // Expected output: 0
console.log(bitwiseComplement(10)); // Expected output: 5
console.log(bitwiseComplement(0));  // Expected output: 1
console.log(bitwiseComplement(1));  // Expected output: 0
console.log(bitwiseComplement(8));  // Expected output: 7 (as 8 is 1000, complement is 0111)