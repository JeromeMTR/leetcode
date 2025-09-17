// IOCE: Interface, Outline, Code, Example

// Define a Food object to store attributes for each food
interface Food {
    name: string;
    cuisine: string;
    rating: number;
}

class FoodRatings {
    // Map from food name to its Food object
    private foodMap: Map<string, Food>;
    // Map from cuisine to list of food names under it
    private cuisineFoods: Map<string, Set<string>>;

    constructor(
        foods: string[],
        cuisines: string[],
        ratings: number[]
    ) {
        this.foodMap = new Map();
        this.cuisineFoods = new Map();

        for (let i = 0; i < foods.length; ++i) {
            const food: Food = {
                name: foods[i],
                cuisine: cuisines[i],
                rating: ratings[i],
            };
            this.foodMap.set(food.name, food);
            if (!this.cuisineFoods.has(food.cuisine)) {
                this.cuisineFoods.set(food.cuisine, new Set());
            }
            this.cuisineFoods.get(food.cuisine)!.add(food.name);
        }
    }

    /**
     * Change the rating of a food.
     * @param food - The name of the food to update.
     * @param newRating - The new rating to assign.
     */
    changeRating(food: string, newRating: number): void {
        if (this.foodMap.has(food)) {
            this.foodMap.get(food)!.rating = newRating;
        }
    }

    /**
     * Get the food with the highest rating for a given cuisine.
     * If multiple have the same rating, return the lex smallest name.
     * @param cuisine - The cuisine to query.
     * @returns The food name.
     */
    highestRated(cuisine: string): string {
        let maxRating = -Infinity;
        let candidates: string[] = [];

        if (!this.cuisineFoods.has(cuisine)) return "";

        // Examine every food of this cuisine
        for (const foodName of this.cuisineFoods.get(cuisine)!) {
            const food = this.foodMap.get(foodName)!;
            if (food.rating > maxRating) {
                maxRating = food.rating;
                candidates = [food.name];
            } else if (food.rating === maxRating) {
                candidates.push(food.name);
            }
        }

        // Select lex smallest
        candidates.sort();
        return candidates[0];
    }
}

/* Example usage (from prompt)
const foodRatings = new FoodRatings(
    ["kimchi", "miso", "sushi", "moussaka", "ramen", "bulgogi"],
    ["korean", "japanese", "japanese", "greek", "japanese", "korean"],
    [9, 12, 8, 15, 14, 7]
);
console.log(foodRatings.highestRated("korean")); // "kimchi"
console.log(foodRatings.highestRated("japanese")); // "ramen"
foodRatings.changeRating("sushi", 16);
console.log(foodRatings.highestRated("japanese")); // "sushi"
foodRatings.changeRating("ramen", 16);
console.log(foodRatings.highestRated("japanese")); // "ramen"
*/