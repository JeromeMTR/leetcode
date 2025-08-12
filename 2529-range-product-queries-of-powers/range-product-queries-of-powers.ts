function productQueries(n: number, queries: number[][]): number[] {
    const mod: number = 1000000007;
    const bins: number[] = [];
    let rep = 1;
    while (n > 0) {
        if (n % 2 === 1) {
            bins.push(rep);
        }
        n = Math.floor(n / 2);
        rep *= 2;
    }

    const ans: number[] = [];
    for (const [start, end] of queries) {
        let cur = 1;
        for (let i = start; i <= end; i++) {
            cur = (cur * bins[i]) % mod;
        }
        ans.push(cur);
    }
    return ans;
}
