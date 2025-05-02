function pushDominoes(dominoes: string): string {
    const n = dominoes.length;
    const forces = new Array(n).fill(0);

    // Rightward pass
    let force = 0;
    for (let i = 0; i < n; i++) {
        if (dominoes[i] === 'R') {
            force = n;
        } else if (dominoes[i] === 'L') {
            force = 0;
        } else {
            force = Math.max(force - 1, 0);
        }
        forces[i] += force;
    }

    // Leftward pass
    force = 0;
    for (let i = n - 1; i >= 0; i--) {
        if (dominoes[i] === 'L') {
            force = n;
        } else if (dominoes[i] === 'R') {
            force = 0;
        } else {
            force = Math.max(force - 1, 0);
        }
        forces[i] -= force;
    }

    // Construct result based on net force
    let result = '';
    for (let f of forces) {
        if (f > 0) {
            result += 'R';
        } else if (f < 0) {
            result += 'L';
        } else {
            result += '.';
        }
    }

    return result;
}

// Example Usage
console.log(pushDominoes("RR.L")); // Output: "RR.L"
console.log(pushDominoes(".L.R...LR..L..")); // Output: "LL.RR.LLRRLL.."

// IOCE
// Input: dominoes = ".R...L..R."
// Output: ".RR.LL..RR"