function maxNonNegativePathProduct(grid: number[][]): number {
    const MOD = 10 ** 9 + 7;
    const m = grid.length;
    const n = grid[0].length;
  
    const maxProduct = Array.from({ length: m }, () => Array(n).fill(-Infinity));
    const minProduct = Array.from({ length: m }, () => Array(n).fill(Infinity));
  
    maxProduct[0][0] = grid[0][0];
    minProduct[0][0] = grid[0][0];
  
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) continue;
      
            if (i > 0) {
                const gridVal = grid[i][j];
                const candidates = [
                    maxProduct[i - 1][j] * gridVal,
                    minProduct[i - 1][j] * gridVal
                ];
                maxProduct[i][j] = Math.max(maxProduct[i][j], ...candidates);
                minProduct[i][j] = Math.min(minProduct[i][j], ...candidates);
            }
      
            if (j > 0) {
                const gridVal = grid[i][j];
                const candidates = [
                    maxProduct[i][j - 1] * gridVal,
                    minProduct[i][j - 1] * gridVal
                ];
                maxProduct[i][j] = Math.max(maxProduct[i][j], ...candidates);
                minProduct[i][j] = Math.min(minProduct[i][j], ...candidates);
            }
        }
    }
  
    const result = maxProduct[m - 1][n - 1];
    return result >= 0 ? result % MOD : -1;
}

// Console log tests
console.log(maxNonNegativePathProduct([[-1, -2, -3], [-2, -3, -3], [-3, -3, -2]])); // -1
console.log(maxNonNegativePathProduct([[1, -2, 1], [1, -2, 1], [3, -4, 1]])); // 8
console.log(maxNonNegativePathProduct([[1, 3], [0, -4]])); // 0
console.log(maxNonNegativePathProduct([[1]])); // 1
console.log(maxNonNegativePathProduct([[-4]])); // -1
console.log(maxNonNegativePathProduct([[0]])); // 0