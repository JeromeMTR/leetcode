function rotateMatrix(mat: number[][]): number[][] {
    const n = mat.length;
    const rotated = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < n; ++j) {
            rotated[j][n - i - 1] = mat[i][j];
        }
    }
    return rotated;
}

function areMatricesEqual(mat1: number[][], mat2: number[][]): boolean {
    const n = mat1.length;
    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < n; ++j) {
            if (mat1[i][j] !== mat2[i][j]) {
                return false;
            }
        }
    }
    return true;
}

function canTransformToTarget(mat: number[][], target: number[][]): boolean {
    for (let i = 0; i < 4; ++i) {
        if (areMatricesEqual(mat, target)) {
            return true;
        }
        mat = rotateMatrix(mat);
    }
    return false;
}

// Test Cases
console.log(canTransformToTarget(
    [[0, 1], [1, 0]], 
    [[1, 0], [0, 1]]
));  // Output: true

console.log(canTransformToTarget(
    [[0, 1], [1, 1]], 
    [[1, 0], [0, 1]]
));  // Output: false

console.log(canTransformToTarget(
    [[0, 0, 0], [0, 1, 0], [1, 1, 1]], 
    [[1, 1, 1], [0, 1, 0], [0, 0, 0]]
));  // Output: true