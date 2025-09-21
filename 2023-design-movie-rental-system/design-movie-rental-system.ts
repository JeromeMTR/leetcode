/**
 * MovieRentingSystem class, as per problem description.
 * Implements search, rent, drop, and report as described.
 */
class MovieRentingSystem {
    // Maps "movieId" => Map<shopId, price>
    private availableMovies: Map<number, Map<number, number>>;
    // Maps "shopId|movieId" => price, for quick lookup/removal
    private unrentedSet: Set<string>;
    // The set of currently rented movies: [shop, movie, price]
    private rentedMovies: Set<string>;
    // Maps "shopId|movieId" => price, for quick lookup
    private priceMap: Map<string, number>;
    
    constructor(n: number, entries: number[][]) {
        this.availableMovies = new Map();
        this.unrentedSet = new Set();
        this.rentedMovies = new Set();
        this.priceMap = new Map();

        // Populate data structures
        for (const [shop, movie, price] of entries) {
            // Fill price map
            const key = this.key(shop, movie);
            this.priceMap.set(key, price);
            // Available movies map
            if (!this.availableMovies.has(movie)) this.availableMovies.set(movie, new Map());
            this.availableMovies.get(movie)!.set(shop, price);
            // Unrented set
            this.unrentedSet.add(key);
        }
    }

    /** Helper to get a unique key for a (shop, movie) pair */
    private key(shop: number, movie: number): string {
        return `${shop}|${movie}`;
    }

    /**
     * search(movie)
     * Returns up to 5 shops with an unrented copy of the given movie,
     * sorted by price, then by shop id.
     */
    search(movie: number): number[] {
        const results: [number, number][] = [];

        if (this.availableMovies.has(movie)) {
            // For this movie, get shops that have it and are unrented
            for (const [shop, price] of this.availableMovies.get(movie)!.entries()) {
                const key = this.key(shop, movie);
                if (this.unrentedSet.has(key)) {
                    results.push([price, shop]);
                }
            }
        }
        // Sort by price, then shop
        results.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
        // Return just the shop ids, up to 5
        return results.slice(0, 5).map(pair => pair[1]);
    }

    /**
     * rent(shop, movie)
     * Rents the copy at this shop if available and not already rented.
     */
    rent(shop: number, movie: number): void {
        // Remove from unrented set
        const key = this.key(shop, movie);
        this.unrentedSet.delete(key);
        // Add to rented set
        this.rentedMovies.add(key);
    }

    /**
     * drop(shop, movie)
     * Returns a previously rented movie
     */
    drop(shop: number, movie: number): void {
        // Remove from rented set, add to unrented set
        const key = this.key(shop, movie);
        this.rentedMovies.delete(key);
        this.unrentedSet.add(key);
    }

    /**
     * report()
     * Returns up to 5 currently rented movies, sorted by price, then shop, then movie.
     * Output: [ [shop, movie], ... ]
     */
    report(): number[][] {
        const results: [number, number, number][] = [];

        for (const key of this.rentedMovies) {
            const [shopStr, movieStr] = key.split('|');
            const shop = parseInt(shopStr);
            const movie = parseInt(movieStr);
            const price = this.priceMap.get(key)!;
            results.push([price, shop, movie]);
        }
        // Sort by price, then by shop id, then by movie id
        results.sort((a, b) =>
            a[0] - b[0] ||
            a[1] - b[1] ||
            a[2] - b[2]
        );
        // Map to [shop, movie] and return up to 5
        return results.slice(0, 5).map(triplet => [triplet[1], triplet[2]]);
    }
}

/*************************************
 * IOCE: Input/Output Code Example
 *************************************/

function IOCE() {
    const movieRentingSystem = new MovieRentingSystem(3, [
        [0, 1, 5], [0, 2, 6], [0, 3, 7],
        [1, 1, 4], [1, 2, 7], [2, 1, 5]
    ]);
    // Output: [1,0,2]
    console.log(movieRentingSystem.search(1));
    // Rent movie 1 at shop 0
    movieRentingSystem.rent(0, 1);
    // Rent movie 2 at shop 1
    movieRentingSystem.rent(1, 2);
    // Output: [[0,1],[1,2]]
    console.log(movieRentingSystem.report());
    // Drop movie 2 at shop 1
    movieRentingSystem.drop(1, 2);
    // Output: [0,1]
    console.log(movieRentingSystem.search(2));
}

IOCE();

/*
Expected Output:
[ 1, 0, 2 ]
[ [ 0, 1 ], [ 1, 2 ] ]
[ 0, 1 ]
*/