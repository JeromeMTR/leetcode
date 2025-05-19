/**
 * Determine the type of triangle based on its side lengths.
 * 
 * @param nums - An array of 3 integers representing the sides of a triangle
 * @returns {"equilateral" | "isosceles" | "scalene" | "none"} Type of triangle
 */
function triangleType(nums: number[]): "equilateral" | "isosceles" | "scalene" | "none" {
    // Extract the three sides for clarity
    const [a, b, c] = nums;
    
    // Check triangle inequality:
    // Sum of any two sides must be greater than the third side
    if (
        a + b <= c ||
        a + c <= b ||
        b + c <= a
    ) {
        return "none";
    }
    
    // All three sides are equal
    if (a === b && b === c) {
        return "equilateral";
    }
    
    // Exactly two sides are equal
    if (a === b || b === c || a === c) {
        return "isosceles";
    }
    
    // All sides are different
    return "scalene";
}

// ----- Test Cases (Examples) -----
console.log(triangleType([3, 3, 3])); // "equilateral"
console.log(triangleType([3, 4, 5])); // "scalene"
console.log(triangleType([5, 5, 3])); // "isosceles"
console.log(triangleType([2, 2, 5])); // "none"
console.log(triangleType([1, 2, 3])); // "none"